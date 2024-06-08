const { exec } = require('child_process');
const path = require('path');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { repoUrl, docUrl, selectedFileTypes } = req.body;
    const scriptPath = path.join(process.cwd(), 'RepoToText.py');
    
    const command = `python ${scriptPath} --repo_url ${repoUrl} --doc_url ${docUrl} --file_types ${selectedFileTypes.join(',')}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).json({ error: 'Failed to execute script' });
        return;
      }
      res.status(200).json({ response: stdout });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
