// filepath: backend/middleware/auth.js
module.exports = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ message: "API key is missing" });
  }

  if (apiKey === process.env.FACULTY_KEY) {
    req.user = { role: "faculty" }; // Set user role
    next();
  } else if (apiKey === process.env.ADMIN_KEY) {
    req.user = { role: "admin" }; // Set user role
    next();
  } else {
    return res.status(401).json({ message: "Invalid API key" });
  }
};