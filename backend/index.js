const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const config = require("./utils/config");
const Task = require("./models/task");
const middleWare = require("./utils/middleware");

mongoose
  .connect(config.MONGODB_URL)
  .then((result) => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error, "Error on Database Connection");
  });

  app.use(middleWare.requestLogger);

app.get("/api/task", async (req, res, next) => {
  try {
    const task = await Task.find({});
    return res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
});

app.post("/api/task", async (req, res, next) => {
  try {
    const { task, status } = req.body;

    if (!task === undefined) {
      return res.status(400).json({
        message: "Missing required fields: Task",
      });
    }

    const newTask = new Task({
      task,
      status: status || "todo",
    });

    const result = await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully", Task: result });
  } catch (error) {
    next(error);
  }
});


app.use(middleWare.errorhandler);
app.use(middleWare.unknownEndpoint);


app.listen(config.PORT, () => {
  console.log(`Server is running on Port ${config.PORT}`);
});
