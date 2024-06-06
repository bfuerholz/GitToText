
# RepoToText

![Build Status](https://github.com/bfuerholz/GitToText/actions/workflows/build.yml/badge.svg)
![License](https://img.shields.io/github/license/bfuerholz/GitToText)

**RepoToText** is a versatile web application that converts a GitHub repository into a single, well-organized text file. By entering the URL of a GitHub repository and optionally a documentation URL, all files and directories of the repository, including the documentation, are compiled into a text file. This text file is ideal for use with language models such as GPT-4, Claude Opus, and others. The generated .txt file is saved in the `/data` directory, organized with timestamps and user information for easy access.

## Demo

See how RepoToText transforms a GitHub repository.

**Example:** Create a React front end that integrates with this backend.

## Running the Application

Follow these steps to run the application locally:

1. **Clone the repository** and create a `.env` file in the root directory.
2. **Set the environment variable** `GITHUB_API_KEY` in the `.env` file.
3. **Install dependencies** with:
   ```bash
   npm install
   ```
4. **Start the application** with:
   ```bash
   npm start
   ```
5. **Access the application** at [http://localhost:3000](http://localhost:3000). Enter the GitHub repository URL and documentation URL (if available).
6. **Select file types**: Choose "All files" or specific file types.
7. **Submit**: Click the "Submit" button to scrape and compile the repository content. The result will be displayed in the output area and saved in the `/data` directory.
8. **Copy the text**: Use the "Copy Text" button to copy the compiled text to the clipboard.

## Environment Configuration

Set your GitHub API Key in the `.env` file:

```
GITHUB_API_KEY='YOUR GITHUB API KEY HERE'
```

## FolderToText

**FolderToText.py** allows you to convert local folders or files into a .txt file, similar to RepoToText.py. Use the browse function to select files, specify the file types you want to include (e.g., `.py, .js, .md, .ts`), and choose an output filename and path. The file will be created with the specified name and a timestamp.

## Features

- **Organized Output**: Files are separated by `'''---` and include headers with the file paths.
- **Documentation Integration**: Add a URL to a documentation page, and the content will be appended to the top of the .txt file.
- **Saved Output**: The .txt file is saved in the `/data` directory for easy retrieval.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Python Flask
- **Containerization**: Docker
- **GitHub API**: PyGithub library
- **Additional Libraries**: beautifulsoup4, requests, flask_cors, retry
