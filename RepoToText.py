import os
from datetime import datetime
import re
from github import Github, RateLimitExceededException, GithubException
from bs4 import BeautifulSoup
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from requests.exceptions import RequestException
from retry import retry
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

class GithubRepoScraper:
    """Scrape GitHub repositories."""
    def __init__(self, repo_name, doc_link=None, selected_file_types=None):
        if selected_file_types is None:
            selected_file_types = []
        self.github_api_key = os.getenv("GITHUB_API_KEY")
        self.repo_name = repo_name
        self.doc_link = doc_link
        self.selected_file_types = selected_file_types

    @retry(RateLimitExceededException, tries=5, delay=2, backoff=2)
    def fetch_all_files(self):
        """Fetch all files from the GitHub repository."""
        def recursive_fetch_files(repo, contents):
            files_data = []
            for content_file in contents:
                if content_file.type == "dir":
                    files_data += recursive_fetch_files(repo, repo.get_contents(content_file.path))
                else:
                    # Check if file type is in selected file types
                    if any(content_file.name.endswith(file_type) for file_type in self.selected_file_types):
                        file_content = ""
                        file_content += f"\n'''--- {content_file.path} ---\n"

                        if content_file.encoding == "base64":
                            try:
                                file_content += content_file.decoded_content.decode("utf-8")
                            except UnicodeDecodeError: # catch decoding errors
                                file_content += "[Content not decodable]"
                        elif content_file.encoding == "none":
                            # Handle files with encoding "none" here
                            print(f"Warning: Skipping {content_file.path} due to unsupported encoding 'none'.")
                            continue
                        else:
                            # Handle other unexpected encodings here
                            print(f"Warning: Skipping {content_file.path} due to unexpected encoding '{content_file.encoding}'.")
                            continue

                        file_content += "\n'''"
                        files_data.append(file_content)
            return files_data

        github_instance = Github(self.github_api_key)
        repo = github_instance.get_repo(self.repo_name)
        contents = repo.get_contents("")
        files_data = recursive_fetch_files(repo, contents)
        return files_data

    def scrape_doc(self):
        """Scrape webpage."""
        if not self.doc_link:
            return ""
        try:
            page = requests.get(self.doc_link, timeout=10)
            soup = BeautifulSoup(page.content, 'html.parser')
            return soup.get_text(separator="\n")
        except RequestException as e:
            print(f"Error fetching documentation: {e}")
            return ""

    def write_to_file(self, files_data):
        """Built .txt file with all of the repo's files"""
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        filename = f"./data/{self.repo_name.replace('/', '_')}_{timestamp}.txt"
        with open(filename, "w", encoding='utf-8') as f:
            doc_text = self.scrape_doc()
            if doc_text:
                f.write(f"Documentation Link: {self.doc_link}\n\n")
                f.write(f"{doc_text}\n\n")
            f.write(f"*GitHub Repository \"{self.repo_name}\"*\n")
            for file_data in files_data:
                f.write(file_data)
        return filename

    def clean_up_text(self, filename):
        """Remove line breaks after 2."""
        with open(filename, 'r', encoding='utf-8') as f:
            text = f.read()
        cleaned_text = re.sub('\n{3,}', '\n\n', text)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(cleaned_text)

    def run(self):
        """Run RepoToText."""
        print(f"Fetching repository: {self.repo_name}")
        try:
            files_data = self.fetch_all_files()
        except GithubException as e:
            print(f"GitHub exception: {e.data}")
            return None

        print("Writing to file...")
        filename = self.write_to_file(files_data)

        print("Cleaning up file...")
        self.clean_up_text(filename)

        print("Done.")
        return filename

@app.route('/scrape', methods=['POST'])
def scrape():
    """Scrape GitHub repositories."""
    data = request.get_json()

    repo_url = data.get('repoUrl')
    doc_url = data.get('docUrl')
    selected_file_types = data.get('selectedFileTypes', [])

    if not repo_url:
        return jsonify({"error": "Repo URL not provided."}), 400

    repo_name = repo_url.split('github.com/')[-1].replace('.git', '')  # Extract repo name from URL

    scraper = GithubRepoScraper(repo_name, doc_url, selected_file_types)
    filename = scraper.run()

    if filename is None:
        return jsonify({"error": "Failed to fetch repository data."}), 500

    with open(filename, 'r', encoding='utf-8') as file:
        file_content = file.read()

    return jsonify({"response": file_content})

if __name__ == "__main__":
    app.run(port=5000)

