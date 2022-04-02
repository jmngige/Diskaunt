const express = require("express");
const router = express.Router();

const productRouter = require("../controllers/product");

/** ============== add product ================ */
router.route("/product").post(productRouter.addProduct);

/** ============== get products list ================ */
router.route('/product').get(productRouter.getProductsList)

/** ============== get single product ================ */
router.route('/product/:id').get(productRouter.getProduct)

/** ============== update product details ================ */
router.route('/product/:id').patch(productRouter.updateProduct)

/** ============== update product details ================ */
router.route('/product/:id').delete(productRouter.deleteProduct)

module.exports = router;
