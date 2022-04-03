const User = require('../models/user')


/** ============== Register User ================ */
exports.registerUser = async (req, res, next) => {
    const user = await User.create(req.body)

    res.status(201).json({
        success: true,
        user
    })

}