const express = require('express')
const router = express.Router()

const authRouter = require('../controllers/auth')

/** ============== register user ================ */
router.route('/auth/register').post(authRouter.registerUser)

module.exports = router