const Category = require("../models/category");

//create categories
exports.createCategory = async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
};

//update categories
exports.updateCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      error: "category not found",
    });
  }

  const update = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    update,
  });
};

//delete category
exports.deleteCategory = async (req, res, next)=>{
    const category = await Category.findById(req.params.id)

    if(!category){
        return res.status(404).json({
            success: false,
            error: "category not found",
          });
        }
    //else

       await Category.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "category delete successfully"
        })
}
