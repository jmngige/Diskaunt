const express = require('express')
const router = express.Router()
const {authRoutes} = require("../middlewares/authRoutes");

const authRouter = require('../controllers/auth')

/** ============== register user ================ */
router.route('/auth/register').post(authRouter.registerUser)

/** ============== login user ================ */
router.route('/auth/login').post(authRouter.loginUser)

/** ============== logout user ================ */
router.route('/auth/logout').post(authRoutes, authRouter.logoutUser)

module.exports = router