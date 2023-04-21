const Task = require('../models/taskModel');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.render('tasks/index', { tasks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getCreateTask = (req, res) => {
  res.render('tasks/create');
};

exports.postCreateTask = async (req, res) => {
  try {
    const { name, description } = req.body;
    const task = new Task({
      name,
      description,
      user: req.user._id,
    });
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEditTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.render('tasks/edit', { task });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.putEditTask = async (req, res) => {
  try {
    const { name, description, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, description, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
