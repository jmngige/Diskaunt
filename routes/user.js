const express = require("express");
const router = express.Router();
const { authRoutes, authRoles} = require("../middlewares/authRoutes");

const usersRouter = require("../controllers/user");

/** ============== get users ================ */
router.route("/user").get(authRoutes, authRoles('admin'),usersRouter.getUsers);

/** ============== get user profile ================ */
router.route("/user/profile").get(authRoutes, usersRouter.getUserProfile);

/** ============== update user profile ================ */
router.route("/user/profile").patch(authRoutes, usersRouter.updateUserProfile);

/** ============== delete user profile ================ */
router.route("/user/profile").delete(authRoutes, usersRouter.deleteUserProfile);

module.exports = router;
