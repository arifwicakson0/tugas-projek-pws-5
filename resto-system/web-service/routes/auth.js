const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;
  db.query(
    "INSERT INTO users VALUES (NULL,?,?,?,?)",
    [name, email, password, role],
    () => res.json({ message: "Account created" })
  );
});

module.exports = router;
