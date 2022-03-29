const express = require('express')
const router = express.Router()


const categoryRouter = require('../controllers/category')

//create category
router.route('/category').post(categoryRouter.createCategory)

//fetch all categories
router.route('/category').get(categoryRouter.fetchAllCategories)

//fetch single category
router.route('/category/:id').get(categoryRouter.getSingleCategory)

//update category
router.route('/category/:id').patch(categoryRouter.updateCategory)

//delete category
router.route('/category/:id').delete(categoryRouter.deleteCategory)

module.exports = router