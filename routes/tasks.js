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
  (req, res) => {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user: req.user.id
    });

    newTask.save().then(task => res.json(task));
  }
);

// @route GET api/tasks
// @desc Get all tasks
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Task.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(tasks => res.json(tasks))
      .catch(err => res.status(404).json({ notasksfound: 'No tasks found' }));
  }
);

// @route DELETE api/tasks/:id
// @desc Delete a task
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.params.id
    );
    Task.findById(req.params.id)
      .then(task => {
        // console.log(task._id.toString() !=req.params.id);
        if (task._id.toString() != req.params.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }
        task.deleteOne().then(() => res.json({ success: true }));
      })
      .catch((err)=>{
        console.log(err);
        res.status(404).json({ notaskfound: 'No task found' });

      });
       
  }
);

// @route PUT api/tasks/:id
// @desc Update a task
// @access Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        console.log(task);
        if (task.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        console.log("Updated--->",task);

        task.save().then(task => res.json(task));
      })
      .catch(err => res.status(404).json({ tasknotfound: 'No task found' }));
  }
);

module.exports = router;
