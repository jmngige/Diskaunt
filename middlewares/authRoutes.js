const jwt = require("jsonwebtoken");
const User = require("../models/user");

/** authorize routes */
exports.authRoutes = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please register or login first.",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Error ocurred please retry again",
      });
    }
    req.user = user;
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Please register or login first.",
    });
  }

  next();
};

/** authorisations and permissions */
exports.authRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: `${req.user.role} is not allowed to perform this operation`,
      });
    }
    next();
  };
};
