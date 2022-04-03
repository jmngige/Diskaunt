const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      unique: [true, "Entered email associated with another account"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid email address");
        }
      },
      trim: true,
      maxlength: [50, "Please enter an email with less than 50 characters"],
      required: [true, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password too short. Minimum 6 characters"],
      select: false,
    },
    phone: {
      type: Number,
      required: [true, "Please enter a valid phone number"],
      minlength: [10, "phone number entered too short"],
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zipcode: {
      type: Number,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

/** hash password before saving */
userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

/** Generate jsonwebtoken */
userSchema.methods.generateJWT = function(){
   jwt.sign({id: _id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

module.exports = mongoose.model("User", userSchema);
