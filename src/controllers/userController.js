const userService = require("../services/userService");
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers(req, res);
    if (users.length) {
      return res
        .status(200)
        .send({ users, message: "users fetched successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const getTasksByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await userService.getTasksByUserId(userId);
    res.status(201).json({
      message: "Tasks Fetched successfully",
      tasks: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getTasksByUserId };
