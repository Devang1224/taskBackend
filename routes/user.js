const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// register
router.post("/register", async (req, res) => {
  const name = req.body.username.trim();
  const newUser = new Task({
    username: name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json({ id: savedUser._id });
  } catch (err) {
    res.status(400).json(err.message);
  }
});


// login

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await Task.findOne({ email });

    if (!userData) {
      res.status(400).json("User not found");
    } else if (userData?.password == req.body.password) {
      res.status(200).json({ id: userData.id });
    } else {
      res.status(401).json("Incorrect password");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
