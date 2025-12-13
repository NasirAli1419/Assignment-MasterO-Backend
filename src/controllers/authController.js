const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/dbconnection");

const register = async (req, res) => {
  try {
    const { name, email, password, role = "employee" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const [existing] = await pool.query("SELECT id from users WHERE email=?", [
      email,
    ]);
    if (existing.length)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT into users (name,email,password,role) VALUES (?,?,?,?)",
      [name, email, hashedPassword, role]
    );
    console.log(result);
    res
      .status(201)
      .json({ result, role, message: "user registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!rows.length)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ role, user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
