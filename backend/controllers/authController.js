// const User = require("../models/User");

// // Login using a simple input key
// exports.loginUser = async (req, res) => {
//   const { key } = req.body;

//   try {
//     // Find the user based on the key
//     const user = await User.findOne({ key });
//     if (!user) {
//       return res.status(404).json({ message: "Invalid key" });
//     }

//     // Return the user's role
//     res.json({ role: user.role });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };