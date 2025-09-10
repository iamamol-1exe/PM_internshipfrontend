const mysql = require("mysql2/promise");
module.exports.connectToDb = async () => {
  try {
    const host = process.env.HOST || "localhost";
    const user = process.env.USER || "root";
    const password = "root";
    const db = process.env.DATABASE || "Sih";

    let connection = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
    });

    const [rows] = await connection.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [db]
    );

    if (Array.isArray(rows) && rows.length === 0) {
      console.log(`Database '${db}' does not exist. Creating it...`);
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${db}`);
      console.log(`Database '${db}' created successfully.`);
    }

    // Close initial connection
    await connection.end();

    // Reconnect with the database specified
    connection = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: db,
    });

    console.log(`Connected to database '${db}'`);
    return connection;
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
};
