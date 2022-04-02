const express = require("express");
const router = express.Router();

const productRouter = require("../controllers/product");

/** ============== add product ================ */
router.route("/product").post(productRouter.addProduct);

/** ============== get products list ================ */
router.route('/product').get(productRouter.getProducts)

module.exports = router;
