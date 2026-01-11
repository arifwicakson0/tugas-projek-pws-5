const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require("crypto");

router.post("/create", (req, res) => {
  const { user_id } = req.body;
  const apiKey = crypto.randomBytes(20).toString("hex");

  db.query(
    "INSERT INTO api_keys VALUES (NULL,?,?)",
    [user_id, apiKey],
    () => res.json({ apiKey })
  );
});

module.exports = router;
