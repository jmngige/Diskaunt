const express = require('express')
const router = express.Router()

const authRouter = require('../controllers/auth')

/** ============== register user ================ */
router.route('/auth/register').post(authRouter.registerUser)

/** ============== login user ================ */
router.route('/auth/login').post(authRouter.loginUser)

/** ============== logout user ================ */
router.route('/auth/logout').post(authRouter.logoutUser)

module.exports = router