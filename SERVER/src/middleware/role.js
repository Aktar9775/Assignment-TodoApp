export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== requiredRole) return res.status(403).json({ message: "Forbidden: insufficient role" });
    next();
  };
};

// generic check for multiple roles
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden: insufficient role" });
    next();
  };
};
