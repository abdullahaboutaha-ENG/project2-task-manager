const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// connect to database
const db = new sqlite3.Database("tasks.db");
// create table if not exists
db.run(`
CREATE TABLE IF NOT EXISTS Tasks (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   title TEXT,
   priority INTEGER,
   completed INTEGER
)
`);
// TEST ROUTE
app.get("/api", (req, res) => {
   res.json({ message: "API is working" });
});
// start server
app.listen(3000, () => {
   console.log("Server running on http://localhost:3000");
});