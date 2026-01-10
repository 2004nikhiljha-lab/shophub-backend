const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  console.log("Authorization header:", req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token extracted:", token);
      
      // Check if JWT_SECRET exists
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in .env file!");
        return res.status(500).json({ message: "Server configuration error" });
      }
      
      console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");
      console.log("User found:", req.user ? "Yes" : "No");
      
      if (req.user) {
        console.log("User details:", {
          id: req.user._id,
          email: req.user.email,
          isAdmin: req.user.isAdmin
        });
      }

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Auth error details:", {
        name: error.name,
        message: error.message
      });
      
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired, please login again" });
      }
      
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("No authorization header found");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };