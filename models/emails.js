const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    password: {
        type:String,
        required: true,
        select: false
    },
    emailVerifificationExpire: String,
    accountVerified: Boolean
})


userSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

userSchema.pre('save', function(next){
     if(this.isModified('password')){
        this.password = bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.comparePass = async function(ePass){
    return await bcrypt.compare(ePass, this.password)
}

module.exports = mongoose.model('UserEmail', userSchema)