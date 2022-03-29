const express = require('express')
const router = express.Router()


const categoryRouter = require('../controllers/category')

//create category
router.route('/category').post(categoryRouter.createCategory)

//update category
router.route('/category/:id').patch(categoryRouter.updateCategory)

//delete category
router.route('/category/:id').delete(categoryRouter.deleteCategory)

module.exports = router