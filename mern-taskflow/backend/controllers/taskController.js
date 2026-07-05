const Task = require('../models/Task');

// @desc   Get all tasks for logged-in user (supports search, category, status filters)
// @route  GET /api/tasks
const getTasks = async (req, res, next) => {
  try {
    const { status, category, search } = req.query;
    const query = { user: req.user._id };

    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// @desc   Get task statistics for dashboard
// @route  GET /api/tasks/stats
const getStats = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    const stats = {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === 'To Do').length,
      inProgress: tasks.filter((t) => t.status === 'In Progress').length,
      done: tasks.filter((t) => t.status === 'Done').length,
    };
    stats.completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

// @desc   Create a task
// @route  POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, category, priority, status, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      category,
      priority,
      status,
      dueDate,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// @desc   Update a task
// @route  PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// @desc   Delete a task
// @route  DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, getStats, createTask, updateTask, deleteTask };
