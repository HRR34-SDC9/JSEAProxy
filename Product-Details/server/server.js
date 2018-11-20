const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const PORT = process.env.db_port || 3002;
const knex = require('../knex/knex.js');

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`, { maxAge: "365d" }));

app.get("/product/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get("/data/:id", (req, res) => {
  const id = req.params.id;
  Products.findById(id).exec((err, result) => {
    if (err) {
      res.status(500).send("Could not receive GET request");
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});