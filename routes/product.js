const express = require("express");
const router = express.Router();
const {authRoutes, authRoles} = require('../middlewares/authRoutes')

const productRouter = require("../controllers/product");

/** ============== add product ================ */
router.route("/product").post(authRoutes, authRoles('admin', 'seller'), productRouter.addProduct);

/** ============== get products list ================ */
router.route('/product').get(productRouter.getProductsList)

/** ============== get single product ================ */
router.route('/product/:id').get(productRouter.getProduct)

/** ============== get featured products ================ */
router.route('/product/featured/:count').get(productRouter.getFeaturedProducts)

/** ============== update product details ================ */
router.route('/product/:id').patch(authRoutes, authRoles('admin', 'seller'), productRouter.updateProduct)

/** ============== delete product details ================ */
router.route('/product/:id').delete(authRoutes, authRoles('admin', 'seller'), productRouter.deleteProduct)

module.exports = router;
