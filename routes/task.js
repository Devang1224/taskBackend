const express = require("express");
const router = express.Router();
const Task = require("../models/task.js");

router.post("/getTasks", async (req, res) => {
  try {

    const { id } = req.body;
    const data = await Task.findById(id);
    const sortedTasks = data.tasks.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(sortedTasks);
  } catch (err) {

    res.status(400).json(err.message);
  }
});

// CREATE TASK
router.post("/addnewtask", async (req, res) => {
  try {
    const { userId } = req.body;
    const tasks = {
      title: req.body.title,
      description: req.body.description,
    };

    const user = await Task.findById(userId); // checking whether user already exists or not



    // if not
    if (user.length == 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      user.tasks.push(tasks); // using the instance of task
      const savedTask = await user.save();
      res.status(200).json(savedTask.tasks[savedTask.tasks.length - 1]);
    }
  } catch (err) {

    res.status(400).json(err.message);
  }
});

// DELETE

router.post("/deletetask", async (req, res) => {
  try {
    const { userId, taskId } = req.body;
    const updatedUser = await Task.findByIdAndUpdate(
      userId,
      {
        $pull: { tasks: { _id: taskId } },
      },
      { new: true }
    );

    res.status(200).json({ message: "Task deleted", updatedUser });
  } catch (err) {

    res.status(400).json(err.message);
  }
});

//UPDATE

router.post("/updatetask", async (req, res) => {
  try {
    const { userId, taskId, title, description } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: userId, "tasks._id": taskId },
      { $set: { "tasks.$.title": title, "tasks.$.description": description } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Task title and description updated", updatedTask });
  } catch (err) {

    res.status(400).json(err.message);
  }
});

//COMPLETED

router.post("/updateTasksStatus", async (req, res) => {
  try {
    const { userId, taskId, isCompleted } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: userId, "tasks._id": taskId },
      { $set: { "tasks.$.isCompleted": !isCompleted } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "status updated", updatedTask: updatedTask.tasks });
  } catch (err) {

    res.status(400).json(err.message);
  }
});

module.exports = router;
