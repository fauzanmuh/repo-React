require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_express",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL Database!");
  }
});

// Ambil semua data users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Tambah user baru
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User added successfully!", id: result.insertId });
  });
});

// Update user
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    db.query(sql, [name, email, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User updated successfully" });
    });
});

// Hapus user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted successfully!" });
  });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
