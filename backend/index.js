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
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

app.use(middleWare.requestLogger);

app.get("/api/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

app.post("/api/tasks", async (req, res, next) => {
  try {
    const { task, status } = req.body;

    if (!task) {
      return res.status(400).json({
        message: "Task is required",
      });
    }

    const newTask = new Task({
      task,
      status: status || "todo",
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/tasks/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

app.put("/api/tasks/:id", async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});

app.use(middleWare.unknownEndpoint);
app.use(middleWare.errorhandler);

app.listen(config.PORT, () => {
  console.log(`Server is running on Port ${config.PORT}`);
});
