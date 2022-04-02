const Product = require("../models/product");
const Category = require("../models/category");

/** ============== add product ================ */
exports.addProduct = async (req, res, next) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Category selected not found",
    });
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

/** ============== get product list ================ */
exports.getProducts = async (req, res, next) => {
    const products = await Product.find()

    if(!products){
        return res.status(404).json({
            success: false,
            message:"no products found"
        })
    }

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}