const userService = require("../services/userService");
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers(req, res);
    if (users.length) {
      return res
        .status(200)
        .send({ users, message: "users fetched successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers };
