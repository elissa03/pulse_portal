const mysql = require('mysql2/promise');
const config = require("./config");

var connection;

const connect = async () => {
  try {
    connection = await mysql.createConnection(config.db);
    console.log(`Successfully connected to ${process.env.DB}`);
  } catch (error) {
    console.log(`Failed to connect to ${process.env.DB}`);
    process.exit();
  }
};

const query = async (sql, params) => {
  if (!connection) {
    await connect();
  }
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error(`Query Error ${sql}`, error.message);
    throw error;
  }
};

module.exports = {
  query,
};
