const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('client'));

app.listen(PORT, function () {
  console.log(`listening on port: ${PORT}!`);
});
