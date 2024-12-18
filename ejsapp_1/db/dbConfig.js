import mysql from "mysql2";

const pool = mysql.createPool({
    user: "root",
    password: "1234",
    database: "ejsappdb",
    host: "localhost"
});

export default pool;