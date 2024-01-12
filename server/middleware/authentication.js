const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const authentication = (req, res, next) => {
  // Check for the existence of the Authorization header
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }
  // Extract the token from the header
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ error: "Access denied!" });
  } else {
    try {
      // Verify token and attach user to request object
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Token is not valid" });
    }
  }
};

module.exports = authentication;
