const pool = require("../db/dbconnection");

const getUsers = async (req, res) => {
  const [users] = await pool.query("SELECT * from users");
  return users;
};

module.exports = { getUsers };
