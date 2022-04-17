const express = require('express')
const router = express.Router()
const {authRoutes, authRoles} = require('../middlewares/authRoutes')


const categoryRouter = require('../controllers/category')

//create category
router.route('/category').post(authRoutes, authRoles('admin'), categoryRouter.createCategory)

//fetch all categories
router.route('/category').get(categoryRouter.fetchAllCategories)

//fetch single category
router.route('/category/:id').get(categoryRouter.getSingleCategory)

//update category
router.route('/category/:id').patch(authRoutes, authRoles('admin'), categoryRouter.updateCategory)

//delete category
router.route('/category/:id').delete(authRoutes, authRoles('admin'), categoryRouter.deleteCategory)

module.exports = router