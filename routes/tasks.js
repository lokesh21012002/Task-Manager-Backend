const express = require('express');
const passport = require('passport');

const router = express.Router();

// Load Task model
const Task = require('../models/Task');

// @route POST api/tasks
// @desc Create a task
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        user: req.user.id
      });

      const task = await newTask.save();
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// @route GET api/tasks
// @desc Get all tasks
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const tasks = await Task.find({user:req.user.id}).sort({ date: -1 });
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(404).json({ notasksfound: 'No tasks found' });
    }
  }
);

// @route DELETE api/tasks/:id
// @desc Delete a task
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ notaskfound: 'No task found' });
      }

      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }

      await task.deleteOne();
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// @route PUT api/tasks/:id
// @desc Update a task
// @access Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ tasknotfound: 'No task found' });
      }

      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }

      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
