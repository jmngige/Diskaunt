const User = require("../models/user");

/** ============== Register User ================ */
exports.registerUser = async (req, res, next) => {
  const user_exist = await User.findOne({ email: req.body.email });

  if (user_exist) {
    res.status(401).json({
      success: false,
      message: "user with that email already exists",
    });
  }

  const user = await User.create(req.body);

  const token = user.generateJWT();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(201).cookie("access_token", token, options).json({
    success: true,
    message: "Registration successful",
    token,
  });

  saveToken(user, token, res);
};

/** ============== login User ================ */

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      success: false,
      messsage: "Please enter email and password to proceed",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      messsage: "Entered email or password is invalid",
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      messsage: "Entered email or password is invalid",
    });
  }

  const token = user.generateJWT();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
  });
};

exports.logoutUser = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly: true
})

res.status(200).json({
    success: true,
    message: "Logged out successfully"
})
};

exports.forgotPassword = async (req, res, next) => {};

exports.resetPassword = async (req, res, next) => {};

exports.deleteUser = async (req, res, next) => {};
