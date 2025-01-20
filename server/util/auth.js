const jwt = require("jsonwebtoken");
require('dotenv').config();


const verifyToken = (req, res, next) => {
  const token = req.cookies.token; 
  console.log(req.cookies);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  });
};


const roleAuthorization = (roles) => {
    return (req, res, next) => {
      const { role } = req.user;
      console.log(role); 
      if (!roles.includes(role)) {
        return res.status(403).json({ message: "Access denied: Insufficient permissions" });
      }
      next();
    };
  };
  
  

module.exports = {
    verifyToken,
    roleAuthorization
    };
