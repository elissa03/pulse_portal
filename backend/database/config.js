require("dotenv").config();

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: process.env.DB_PORT,
    connectionLimit: 10,
  },
};

module.exports = config;