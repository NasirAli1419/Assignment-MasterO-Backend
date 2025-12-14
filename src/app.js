const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const pool = require("./db/dbconnection");
const authMiddleware = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // needed for cookies / auth
  })
);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/tasks", authMiddleware, taskRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
