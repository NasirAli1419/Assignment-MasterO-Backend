const fs = require("fs");
const mysql = require("mysql2/promise");

async function initDB() {
  try {
    // Read SQL file
    const schema = fs.readFileSync("./src/db/schema.sql", "utf8");

    // Connect without selecting DB (because DB may not exist yet)
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Nasir@1419",
      multipleStatements: true,
    });

    await connection.query("CREATE DATABASE IF NOT EXISTS mastero");

    // 3️⃣ Switch to the database
    await connection.query("USE mastero");

    // Execute schema
    await connection.query(schema);

    await connection.end();
  } catch (err) {
    throw err;
  }
}

initDB();
