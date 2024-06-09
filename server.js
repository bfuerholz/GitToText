const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

app.post("/api/scrape", (req, res) => {
  const { repoUrl, docUrl } = req.body;

  exec(
    `python3 RepoToText.py ${repoUrl} ${docUrl}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send(error.message);
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).send(stderr);
      }

      res.send({ response: stdout });
    },
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
