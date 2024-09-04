const express = require('express');
const path = require('path');
const app = express();
const port = 5501; // Port for the server

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});