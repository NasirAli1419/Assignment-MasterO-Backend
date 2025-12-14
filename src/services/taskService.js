const pool = require("../db/dbconnection");

const createTask = async (data) => {
  const { title, description, assigned_to, due_date } = data;

  const [result] = await pool.query(
    "INSERT INTO tasks (title, description, assigned_to, due_date) VALUES (?, ?, ?, ?)",
    [title, description, assigned_to || null, due_date || null] // handle nulls
  );
  return result;
};

const getTasks = async () => {
  const [result] = await pool.query(
    " SELECT t.id AS task_id,t.status AS task_status,t.description as description,t.due_date AS due_date,t.title AS task_title,t.assigned_to as assigned_user_id,u.name AS assigned_user FROM tasks t LEFT JOIN users u ON t.assigned_to = u.id"
  );
  return result;
};

const getTaskDetails = async (id) => {
  const [result] = await pool.query("SELECT * from tasks WHERE id = ?", [id]);
  return result;
};

const updateTask = async (req) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  const fields = [];
  const values = [];

  if (title !== undefined) {
    fields.push("title = ?");
    values.push(title);
  }

  if (description !== undefined) {
    fields.push("description = ?");
    values.push(description);
  }

  if (status !== undefined) {
    fields.push("status = ?");
    values.push(status);
  }
  values.push(id);

  const [result] = await pool.query(
    `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
  return result;
};

module.exports = { createTask, getTasks, getTaskDetails, updateTask };
