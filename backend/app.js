const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


const config = require("./utils/config");
const middleWare = require("./utils/middleware");
const taskRouter = require("./routes/tasks");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

app.use(middleWare.requestLogger);

app.use("/api/tasks", taskRouter);


app.use(middleWare.unknownEndpoint);
app.use(middleWare.errorhandler);

module.exports = app;
