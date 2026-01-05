const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const config = require("./utils/config");

mongoose
  .connect(config.MONGODB_URL)
  .then((result) => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error, "Error on Database Connection");
  });
  

app.listen(config.PORT, () => {
  console.log(`Server is running on Port ${config.PORT}`);
});
