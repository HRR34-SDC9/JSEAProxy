require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const httpProxy = require('http-proxy');

const app = express();
const port = 3000;
const hostPort = 3001


app.use(cors());

app.use(express.static(path.join(__dirname, './public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/product/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

const proxy = httpProxy.createProxyServer();

app.get("/data/:id", (req, res) =>
  proxy.web(req, res, {
    target: `http://localhost:${hostPort}`
  })
);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});