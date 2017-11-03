const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
