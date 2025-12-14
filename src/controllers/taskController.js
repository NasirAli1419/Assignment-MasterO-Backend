const taskService = require("../services/taskService");

const createTask = async (req, res, next) => {
  try {
    const result = await taskService.createTask(req.body);

    res.status(201).json({
      message: "Task created successfully",
      taskId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks();
    res.status(201).json({
      message: "Task fetched successfully",
      Tasks: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskDetails = async (req, res, next) => {
  try {
    const result = await taskService.getTaskDetails(req.params.id);
    res.status(201).json({
      message: "Task fetched successfully",
      task: result[0],
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const result = await taskService.updateTask(req);
    res.status(201).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, getTaskDetails, updateTask };
