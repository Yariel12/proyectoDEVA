import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No autorizado, no hay token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const adminOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso solo para administradores" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};
