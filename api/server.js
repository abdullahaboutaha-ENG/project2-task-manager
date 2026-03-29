const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));
 
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
app.get("/api/:id", (req, res) => {
   const id = req.params.id;
   db.get("SELECT * FROM Tasks WHERE id = ?", [id], (err, row) => {
       if (err) {
           res.status(500).json({ error: err.message });
           return;
       }
       if (!row) {
           res.status(404).json({ error: "Record not found" });
           return;
       }
       res.json(row);
   });
});
app.delete("/api/:id", (req, res) => {
   const id = req.params.id;
   db.run("DELETE FROM Tasks WHERE id = ?", [id], function(err) {
       if (err) {
           res.status(500).json({ error: err.message });
           return;
       }
       if (this.changes === 0) {
           res.status(404).json({ error: "Record not found" });
           return;
       }
       res.json({ message: "Task deleted successfully" });
   });
});
app.delete("/api", (req, res) => {
   db.run("DELETE FROM Tasks", [], function(err) {
       if (err) {
           res.status(500).json({ error: err.message });
           return;
       }
       res.json({ status: "Collection deleted" });
   });
});
app.put("/api/:id", (req, res) => {
    const id = req.params.id;
    const { title, priority, completed } = req.body;
    db.run(
        "UPDATE Tasks SET title = ?, priority = ?, completed = ? WHERE id = ?",
        [title, priority, completed, id],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ error: "Record not found" });
                return;
            }
            res.json({ message: "Task updated successfully" });
        }
    );
});
app.put("/api/:id", (req, res) => {
    const id = req.params.id;
    const { title, priority, completed } = req.body;
    db.run(
        "UPDATE Tasks SET title = ?, priority = ?, completed = ? WHERE id = ?",
        [title, priority, completed, id],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ error: "Record not found" });
                return;
            }
            res.json({ message: "Task updated successfully" });
        }
    );
});
// start server
app.listen(3000, () => {
   console.log("Server running on http://localhost:3000");
});