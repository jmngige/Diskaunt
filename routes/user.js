const express = require('express')
const router = express.Router()
const authRoutes = require('../middlewares/authRoutes')

const usersRouter = require('../controllers/user')

/** ============== get users ================ */
router.route('/user').get(authRoutes, usersRouter.getUsers)

/** ============== get user profile ================ */
router.route('/user/:id').get(usersRouter.getUserProfile) 

/** ============== get user profile ================ */
router.route('/user/:id').patch(usersRouter.updateUserProfile) 

/** ============== delete user profile ================ */
router.route('/user/:id').delete(usersRouter.deleteUserProfile) 

module.exports = router