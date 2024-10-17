const jwt = require("jsonwebtoken");

const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Acesso negado" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token inválido" });
    }
  };
};

module.exports = {
  verifyRole,
};

