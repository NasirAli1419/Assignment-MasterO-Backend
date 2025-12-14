const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/dbconnection");

const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "employee" } = req.body;

    if (!name || !email || !password) {
      const err = new Error("Name, email and password are required");
      err.statusCode = 400;
      return next(err);
    }

    const [existing] = await pool.query("SELECT id from users WHERE email=?", [
      email,
    ]);
    if (existing.length) {
      const err = new Error("User already exists");
      err.statusCode = 400;
      return next(err);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT into users (name,email,password,role) VALUES (?,?,?,?)",
      [name, email, hashedPassword, role]
    );
    res
      .status(201)
      .json({ result, role, message: "user registered successfully" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!rows.length) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ role: user.role, user, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
