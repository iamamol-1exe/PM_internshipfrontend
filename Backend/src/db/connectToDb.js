const mysql = require("mysql2/promise");

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: "root",
  database: process.env.DATABASE || "Sih",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize database function - to be called once when app starts
module.exports.initDb = async () => {
  try {
    const host = process.env.HOST || "localhost";
    const user = process.env.USER || "root";
    const password = "root";
    const db = process.env.DATABASE || "Sih";

    // Create a temporary connection to check if the database exists
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

    console.log(`Connected to database '${db}' pool`);
    return true;
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  }
};

// Get a connection from the pool
module.exports.getConnection = async () => {
  try {
    return await pool.getConnection();
  } catch (err) {
    console.error("Error getting connection from pool:", err);
    throw err;
  }
};

// Execute a query using the pool directly
module.exports.query = async (sql, params) => {
  try {
    const [results] = await pool.query(sql, params);
    return results;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
};
