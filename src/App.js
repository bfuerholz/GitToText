import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [response, setResponse] = useState('');
  const [selectedFileTypes, setSelectedFileTypes] = useState([]);
  const [fileSelection, setFileSelection] = useState('all');
  const [customFileType, setCustomFileType] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const FILE_TYPES = [
    '.txt',
    '.py',
    '.js',
    '.sql',
    '.env',
    '.json',
    '.html',
    '.css',
    '.md',
    '.java',
    '.cpp',
    '.c',
    '.cs',
    '.php',
    '.rb',
    '.xml',
    '.yml',
    '.sh',
    '.swift',
    '.h',
    '.pyw',
    '.asm',
    '.bat',
    '.cmd',
    '.cls',
    '.coffee',
    '.erb',
    '.go',
    '.groovy',
    '.htaccess',
    '.jsp',
    '.lua',
    '.make',
    '.matlab',
    '.pas',
    '.perl',
    '.pl',
    '.ps1',
    '.r',
    '.scala',
    '.scm',
    '.sln',
    '.svg',
    '.vb',
    '.vbs',
    '.xhtml',
    '.xsl',
  ];

  console.log('App loaded');
  console.log('Initial state', {
    repoUrl,
    docUrl,
    response,
    selectedFileTypes,
    fileSelection,
    customFileType,
    isDarkMode,
  });

  const handleRepoChange = (e) => {
    setRepoUrl(e.target.value);
    console.log('Repo URL changed');
  };

  const handleDocChange = (e) => {
    setDocUrl(e.target.value);
    console.log('Doc URL changed');
  };

  const handleFileTypeChange = (e) => {
    if (e.target.checked) {
      setSelectedFileTypes([...selectedFileTypes, e.target.value]);
      console.log('File type selected');
    } else {
      setSelectedFileTypes(
        selectedFileTypes.filter((fileType) => fileType !== e.target.value)
      );
      console.log('File type deselected');
    }
  };

  const handleFileSelectionChange = (e) => {
    setFileSelection(e.target.value);
    console.log('File selection changed');
  };

  const handleAddFileType = () => {
    if (customFileType && !FILE_TYPES.includes(customFileType)) {
      FILE_TYPES.push(customFileType);
      console.log('Custom file type added');
    }
    setCustomFileType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fileTypesToSend = selectedFileTypes;
    if (fileSelection === 'all') {
      fileTypesToSend = FILE_TYPES;
    }
    console.log('Submitting form with data', {
      repoUrl,
      docUrl,
      fileTypesToSend,
    });
    try {
      const result = await axios.post('/api/scrape', {
        repoUrl,
        docUrl,
        selectedFileTypes: fileTypesToSend,
      });
      setResponse(result.data.response);
      console.log('Response received');
    } catch (error) {
      console.error('Error during submission', error);
    }
  };

  const handleCopyText = () => {
    const outputArea = document.querySelector('.outputArea');
    outputArea.select();
    document.execCommand('copy');
    console.log('Text copied to clipboard');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    console.log('Theme toggled');
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="inputContainer">
        <input
          value={repoUrl}
          onChange={handleRepoChange}
          placeholder="Enter Github repo URL"
          className="inputArea"
        />
        <input
          value={docUrl}
          onChange={handleDocChange}
          placeholder="Enter documentation URL (optional)"
          className="inputArea"
        />
        <div className="fileSelectionContainer">
          <div>
            <input
              type="radio"
              value="all"
              checked={fileSelection === 'all'}
              onChange={handleFileSelectionChange}
            />
            <label>All Files</label>
          </div>
          <div>
            <input
              type="radio"
              value="select"
              checked={fileSelection === 'select'}
              onChange={handleFileSelectionChange}
            />
            <label>Select File Types</label>
          </div>
        </div>
        {fileSelection === 'select' && (
          <div className="fileTypesContainer">
            {FILE_TYPES.map((fileType, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  value={fileType}
                  onChange={handleFileTypeChange}
                />
                <label>{fileType}</label>
              </div>
            ))}
            <div>
              <input
                value={customFileType}
                onChange={(e) => setCustomFileType(e.target.value)}
                placeholder="Enter new file type"
                className="smallInputArea"
              />
              <button onClick={handleAddFileType} className="addButton">
                Add
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="buttonContainer">
        <button onClick={handleSubmit} className="transformButton">
          Submit
        </button>
        <button onClick={handleCopyText} className="copyButton">
          Copy Text
        </button>
        <button onClick={toggleTheme} className="toggleThemeButton">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="outputContainer">
        <textarea value={response} readOnly className="outputArea" />
      </div>
    </div>
  );
}

export default App;
