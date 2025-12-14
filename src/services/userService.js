const pool = require("../db/dbconnection");

const getUsers = async (req, res) => {
  const [users] = await pool.query("SELECT * from users");
  return users;
};

const getTasksByUserId = async (id) => {
  const [result] = await pool.query(
    " SELECT t.id AS task_id,t.status AS task_status,t.description as description,t.due_date AS due_date,t.title AS task_title,t.assigned_to as assigned_user_id,u.name AS assigned_user FROM tasks t LEFT JOIN users u ON t.assigned_to = u.id WHERE assigned_to=?",
    [id]
  );

  return result;
};

module.exports = { getUsers, getTasksByUserId };
