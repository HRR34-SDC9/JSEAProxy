require('dotenv').config();
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
app.use(express.static(`${__dirname}/../client/dist`));

app.get("/product/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get("/data/:id", (req, res) => {
  knex('products').where('_id', req.params.id).select()
  .then(products => {
    if (products.length) {
      products[0].images = JSON.parse(products[0].images);
      res.status(200).send(products[0]);
    } else {
      res.status(404).send({error: `Could not find product with id ${req.params.id}`});
    }
  })
  .catch(error => {
    res.status(500).send({error});
  });
});



app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}...`);
});