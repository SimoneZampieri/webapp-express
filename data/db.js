const mysql = require("mysql2");
const env = require("../env");

const connection = mysql.createConnection({
  host: env.HOST,
  user: env.USER,
  password: env.PASSWORD,
  database: env.DB,
});

connection.connect((err) => {
  if (err) throw error;
  console.log("Database connesso");
});

module.exports = connection;
