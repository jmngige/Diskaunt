const User = require('../models/user')


/** ============== Register User ================ */
exports.registerUser = async (req, res, next) => {
    const user = await User.create(req.body)

    res.status(201).json({
        success: true,
        user
    })
}

exports.loginUser = async (req, res, next) => {

    

}

exports.logout = async (req, res, next) => {
    
}

exports.forgotPassword = async (req, res, next) => {

}

exports.resetPassword = async (req, res, next) => {

}

exports.deleteUser = async (req, res, next) => {

}