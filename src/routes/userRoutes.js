const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");
const { getUsers } = userController;
router.get("", authMiddleware, roleMiddleware(["admin"]), getUsers);

module.exports = router;
