const Product = require("../models/product");
const Category = require("../models/category");
const ApiFilters = require('../utils/apiFiters')

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
exports.getProductsList = async (req, res, next) => {

    const api =new  ApiFilters(Product.find(), req.query)
                .filter()
                .sort()
                .select()
                .pagination()


    const products = await api.query.populate('category')

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

/** ============== get single product ================ */
exports.getProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('category')

    if(!product){
        return res.status(404).json({
            success: false,
            message:"product not found"
        })
    }

    res.status(200).json({
        success: true,
        product
    })
}

/** ============== get featured products ================ */
exports.getFeaturedProducts = async (req, res, next) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({featured: true}).limit(+count)

    if(!products){
        return res.status(404).json({
            success: false,
            message:"product not found"
        })
    }

    res.status(200).json({
        success: true,
        products
    })
}

/** ============== update product details ================ */
exports.updateProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            succcess: false,
            message:"Product not found"
        })
    }

    const update = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        update
    })
}

/** ============== delete product ================ */
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            success: false,
            message: "product not found"
        })
    }

    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
}