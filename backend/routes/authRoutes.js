const express = require("express");
const router = express.Router();
require("dotenv").config();

const FACULTY_KEY = process.env.FACULTY_KEY || "facultyKey";
const ADMIN_KEY = process.env.ADMIN_KEY || "adminKey";

router.post("/validate-key", (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ message: "Key is required" });
  }

  if (key === FACULTY_KEY) {
    return res.status(200).json({ role: "faculty", message: "Faculty access granted" });
  } else if (key === ADMIN_KEY) {
    return res.status(200).json({ role: "admin", message: "Admin access granted" });
  } else {
    return res.status(403).json({ message: "Invalid key" });
  }
});

module.exports = router;
