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

app.get("/api", (req, res) => {
   db.all("SELECT * FROM Tasks", [], (err, rows) => {
       if (err) {
           res.status(500).json({ error: err.message });
           return;
       }
       res.json(rows);
   });
});
app.post("/api", (req, res) => {
   const { title, priority } = req.body;
   db.run(
       "INSERT INTO Tasks (title, priority, completed) VALUES (?, ?, 0)",
       [title, priority],
       function(err) {
           if (err) {
               res.status(500).json({ error: err.message });
               return;
           }
           res.json({ status: `New record created with id=${this.lastID}` });
       }
   );
});
// start server
app.listen(3000, () => {
   console.log("Server running on http://localhost:3000");
});