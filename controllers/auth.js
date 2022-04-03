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

    const { email, password } = req.body

    if(!email || !password){
        return res.status(404).json({
            success: false,
            messsage: "Please enter email and password to proceed"
        })
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        return res.status(404).json({
            success: false,
            messsage: "Entered email or password is invalid"
        })
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(404).json({
            success: false,
            messsage: "Entered email or password is invalid"
        })
    }


    const token = user.generateJWT()

    res.status(200).json({
        success: true,
        user,
        token
    })



}

exports.logout = async (req, res, next) => {
    
}

exports.forgotPassword = async (req, res, next) => {

}

exports.resetPassword = async (req, res, next) => {

}

exports.deleteUser = async (req, res, next) => {

}