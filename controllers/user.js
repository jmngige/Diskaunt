const User = require("../models/user");

/** ============== get users list ================ */
exports.getUsers = async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return res.status(404).json({
      success: false,
      message: "Users not found",
    });
  }

  res.status(200).json({
    success: true,
    count: `${users.length} users found`,
    users,
  });
};

/** ============== get user profile ================ */
exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
};

/** ============== update user profile ================ */
exports.updateUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const update = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    update,
  });
};

/** ============== delete user profile ================ */
exports.deleteUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "user account deleted successfully",
  });
};
