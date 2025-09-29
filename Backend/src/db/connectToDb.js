const mysql = require("mysql2/promise");

// Declare 'pool' globally but do NOT initialize it here.
// Initialization will happen in initDb() to ensure environment variables are loaded.
let pool;

// Initialize database function - to be called once when app starts
module.exports.initDb = async () => {
  try {
    const host = process.env.HOST || "localhost";
    const user = process.env.USER || "root";
    const password = process.env.PASSWORD;
    const db = process.env.DATABASE || "Sih";

    // Create a temporary connection to check if the database exists (This part still works)
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

    // ESSENTIAL CHANGE: Initialize the global pool here, AFTER we are sure the password is set
    pool = mysql.createPool({
      host: host,
      user: user,
      password: password, 
      database: db,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

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
    // This now relies on pool being initialized by initDb()
    return await pool.getConnection();
  } catch (err) {
    console.error("Error getting connection from pool:", err);
    throw err;
  }
};

// Execute a query using the pool directly
module.exports.query = async (sql, params) => {
  try {
    // This now relies on pool being initialized by initDb()
    // ESSENTIAL FIX: Use regex to replace all whitespace (including newlines) with a single space and then trim.
    const cleanedSql = sql.replace(/\s+/g, ' ').trim();
    const [results] = await pool.query(cleanedSql, params);
    return results;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
};