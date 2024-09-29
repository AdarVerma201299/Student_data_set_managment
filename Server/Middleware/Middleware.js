const jwt = require("jsonwebtoken"); // Import the JWT library
require("dotenv").config({ path: "./config.env" });
const jwtSecret = process.env.KEY;

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).send("Token is required");

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized or token expired");
    req.userId = decoded.userId;
    next();
  });
}

module.exports = {
  verifyToken,
};
