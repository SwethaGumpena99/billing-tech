"use strict";
const express = require("express");
const cors = require("cors");
const { router } = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("", router);

app.listen(8080, () => {
  console.log("Server listening at http://localhost:8080");
});
