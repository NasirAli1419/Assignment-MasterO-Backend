const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const { createTask, getTasks, getTaskDetails, updateTask } = taskController;
router.post("", roleMiddleware(["admin"]), createTask); // create a new task admin only
router.get("", roleMiddleware(["admin"]), getTasks); // I think only admin could use it
router.get("/:id", getTaskDetails); // get task details
router.put("/:id", updateTask); //(title description status)

module.exports = router;
