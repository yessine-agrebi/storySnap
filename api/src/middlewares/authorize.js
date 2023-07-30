// middleware/authorize.js
export const authorize = (roles) => (req, res, next) => {
    console.log(req.user);
    const { role } = req.user;
  
    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Forbidden - You don't have permission to access this resource." });
    }
  
    next();
  };
  