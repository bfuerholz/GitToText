# Git to Text App

## Overview

The **Git to text APP** is a web application that allows users to input a GitHub repository URL and optionally a documentation URL to generate a text file with the repository's content. This application consists of a Python backend built with Flask and a frontend built with React. It is designed to be deployed on Vercel.

## Features

- Fetch and display the content of a specified GitHub repository.
- Optional inclusion of additional documentation.
- Select specific file types to include in the output.
- Generate a text file with the repository's content.

## Demo

A live demo of the application can be found [here](https://your-vercel-deployment-link).

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Python 3.8+](https://www.python.org/)
- [Vercel CLI](https://vercel.com/download)

## Installation

### Backend

1. **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2. **Create and activate a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install the dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Flask server**:
    ```bash
    python RepoToText.py
    ```

### Frontend

1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2. **Install the dependencies**:
    ```bash
    npm install
    ```

3. **Start the React app**:
    ```bash
    npm start
    ```

## Deployment

### Vercel

1. **Install the Vercel CLI** (if not already installed):
    ```bash
    npm install -g vercel
    ```

2. **Deploy the project to Vercel**:
    ```bash
    vercel
    ```

    Follow the prompts to link or create a new Vercel project and deploy your application.

## Project Structure

```plaintext
repo-to-text-app/
├── backend/
│   ├── RepoToText.py
│   ├── requirements.txt
│   ├── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   ├── package.json
│   ├── Dockerfile
├── vercel.json
├── .gitignore
└── README.md
