const path = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();

const PORT = 8000;
const WWW_PATH = path.join(__dirname, 'www');
const INDEX = path.join(WWW_PATH, 'index.html');

app.use(
  cors({
    origin: '*',
  })
);

app.use(compression());
app.use(express.static(WWW_PATH));

app.get('*', function (req, res) {
  res.sendFile(INDEX);
});

app.listen(PORT, () => {
  // console.log(`Server is listening on port ${PORT}`);
  console.log(`Server is listening on http://localhost:${PORT}`);
});
