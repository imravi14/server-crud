import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud2",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    return res.json(data);
  });
});

// Create
app.post("/create", (req, res) => {
  const sql =
    "INSERT INTO book (fname, lname, email, phone, address) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.phone,
    req.body.address,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Error inserting data" });
    }
    return res.json({ message: "Data inserted successfully" });
  });
});

// Update
app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE book SET fname = ?, lname = ?, email = ?, phone = ?, address = ? WHERE id = ?";
  const values = [
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.phone,
    req.body.address,
  ];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).json({ error: "Error updating data" });
    }
    res.json({ message: "Data updated successfully" });
  });
});

// Delete
app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM book WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ error: "Error deleting data" });
    }
    res.json({ message: "Data deleted successfully" });
  });
});

// Get Record
app.get("/getrecord/:id", (req, res) => {
  const sql = "SELECT * FROM book WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    return res.json(data);
  });
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
