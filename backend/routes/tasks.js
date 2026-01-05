const express = require("express");
const router = express.Router();
require("dotenv").config();

const Task = require("../models/task");

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
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

router.put("/:id", async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});

module.exports = router;