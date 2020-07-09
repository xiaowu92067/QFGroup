const mysql = require("mysql");
const pool = mysql.createPool({
  host: "127.0.0.1",
  sort: "8080",
  user: "root",
  password: "",
  database: "qinfagroup",
  connectionLimit: "20"
});

module.exports=pool;