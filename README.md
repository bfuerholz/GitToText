# RepoToText

![Build Status](https://github.com/bfuerholz/GitToText/actions/workflows/build.yml/badge.svg)
![License](https://img.shields.io/github/license/bfuerholz/GitToText)

**RepoToText** is a web application that transforms a GitHub repository into a single, well-organized text file. By providing the URL of a GitHub repository and optionally a documentation URL, the app compiles all files and directories of the repository, including the documentation, into one cohesive text file. This text file is perfect for use with language models such as GPT-4, Claude Opus, and others. The generated .txt file is saved in the `/data` directory with timestamps and user information for easy access.

## Features

- **Organized Output**: Files are separated by `'''---` and include headers with the file paths.
- **Documentation Integration**: Optionally add a URL to a documentation page, and the content will be appended to the top of the .txt file.
- **Saved Output**: The .txt file is saved in the `/data` directory for easy retrieval.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Python Flask
- **Containerization**: Docker
- **GitHub API**: PyGithub library
- **Additional Libraries**: beautifulsoup4, requests, flask_cors, retry

## FolderToText

**FolderToText.py** allows you to convert local folders or files into a .txt file, similar to RepoToText.py. You can use the browse function to select files, specify the file types you want to include (e.g., `.py, .js, .md, .ts`), and choose an output filename and path. The resulting file will be created with the specified name and a timestamp.

## How It Works

1. **Input**: Enter the URL of a GitHub repository and optionally a documentation URL.
2. **Processing**: The application scrapes the repository, compiles all files and directories, and fetches the documentation from the provided URL.
3. **Output**: The compiled content is saved as a .txt file in the `/data` directory, organized with headers and file paths for easy navigation.

## Usage

This application is designed to facilitate the interaction with GitHub repositories through text files, making it easier to analyze and work with the entire content of a repository using advanced language models.

## Contact

For any questions or issues, please reach out to the project maintainers.

---

Dieser Text bietet eine klare und prägnante Beschreibung des Projekts ohne überflüssige Anleitungen. Sie können diesen Inhalt direkt in Ihre README.md-Datei einfügen.
