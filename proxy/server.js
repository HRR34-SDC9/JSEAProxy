const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/product/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});