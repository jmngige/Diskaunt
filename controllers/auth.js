const User = require("../models/user");
const sendEmail = require("../utils/sendEmails")

/** ============== Register User ================ */
exports.registerUser = async (req, res, next) => {
  const user_exist = await User.findOne({ email: req.body.email });

  if (user_exist) {
    res.status(401).json({
      success: false,
      message:
        "user with that email already exists. Login to access your account",
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

  res.status(201).cookie("token", token, options).json({
    success: true,
    message: "Registration successful",
    token,
  });
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
  res.cookie("token", "none", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

exports.forgotPassword = async (req, res, next) => {

  const email = req.body.email

  if(!email){
    return res.status(404).json({
      success: false,
      message: "Please provide a valid email address"
    })
  }

  const user = await User.findOne({email: req.body.email})

  if(!user){
    return res.status(404).json({
      success: false,
      message: "Email provided does not have an account registered"
    })
  }

  const resetPasswordToken = user.generateResetPasswordToken()
 
  await user.save({ validateBeforeSave: false})

  /** reset email url */
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/password/forgot/${resetPasswordToken}`
  const message = `Password reset token is \n\n ${resetUrl} \n\n ignore if you didn't request it.`

  /** set a try catch error incase theres a problem sending the reset email*/
  try{

    await sendEmail({
    email: user.email,
    subject: "Reset Your Password",
    message
  })

  res.status(200).json({
    success: true,
    message: `Reset email sent successfully to ${user.email}`
  })

  }catch(error){
    
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined

    await user.save({ validateBeforeSave: false})
    return res.status(200).json({
      success: false,
      message: `Something went wrong. Please wait and try again later`
    })
  }
  

};

exports.resetPassword = async (req, res, next) => {};

exports.deleteUser = async (req, res, next) => {};
