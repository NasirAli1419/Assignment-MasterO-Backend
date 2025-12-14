const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");
const { getUsers, getTasksByUserId } = userController;
router.get("", authMiddleware, roleMiddleware(["admin"]), getUsers);
router.get("/:id/tasks", authMiddleware, getTasksByUserId);
module.exports = router;
