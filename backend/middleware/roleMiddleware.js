// filepath: backend/middleware/roleMiddleware.js
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const apiKey = req.header("x-api-key");

    if (requiredRole === "faculty" && apiKey === process.env.FACULTY_KEY) {
      next();
    } else if (requiredRole === "admin" && apiKey === process.env.ADMIN_KEY) {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  };
};

module.exports = roleMiddleware;