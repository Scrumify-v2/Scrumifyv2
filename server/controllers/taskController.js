//need to add tasks from Models
const { Task } = require('../models/models');

const taskController = {};
/* 
const taskSchema = new Schema({
  user: {type: String, required: true},
  taskName: {type: String, required: true},
  content: {type: String, required: true},
  progress: {type: String, required: true}
});
 */
taskController.getAllTasks = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userTasks = await Task.find({ user: username });
    res.locals.userTasks = userTasks;
    return next();
  } catch (error) {
    return next({
      method: 'taskController.getAllTasks',
      type: 'Middleware error',
      error: error,
    });
  }
};

taskController.createNewTask = async (req, res, next) => {
  try {
    const { user, taskName, content, progress } = req.body;
    const newTask = await Task.create({
      user: user,
      taskName: taskName,
      content: content,
      progress: progress,
    });
    res.locals.newTask = newTask;
    return next();
  } catch (error) {
    return next({
      method: 'taskController.createNewTask',
      type: 'Middleware error',
      error: error,
    });
  }
};

taskController.moveTask = async (req, res, next) => {
  try {
    const { taskId, progress } = req.body;
    const movedTask = await Task.findByIdAndUpdate(taskId, {
      progress: progress,
    }, {new: true});
    res.locals.movedTask = movedTask;
    return next();
  } catch (error) {
    return next({
      method: 'taskController.moveTask',
      type: 'Middleware error',
      error: error,
    });
  }
};

taskController.updateContent = async (req, res, next) => {
  try {
    const { taskId, content } = req.body;
    const updatedContentTask = await Task.findByIdAndUpdate(taskId, {
      content: content,
    }, {new: true});
    res.locals.updatedTask = updatedContentTask;
    return next();
  } catch (error) {
    return next({
      method: 'taskController.updateContent',
      type: 'Middleware error',
      error: error,
    });
  }
};

taskController.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.body;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.locals.deletedTask = deletedTask;
    return next();
  } catch (error) {
    return next({
      method: 'taskController.deleteTask',
      type: 'Middleware error',
      error: error,
    });
  }
};

module.exports = taskController;
