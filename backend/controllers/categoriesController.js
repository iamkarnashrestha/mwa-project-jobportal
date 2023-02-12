const categoryModel = require("../models/categoriesModel");

module.exports.getAllCategory = async (req, res, next) => {
  try {
    const results = await categoryModel.find();
    res.json({ success: true, results });
  } catch (error) {}
};

module.exports.getCategoryById = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const results = await categoryModel.findOne({ _id: category_id });
    res.json({ success: true, results });
  } catch (error) {}
};

module.exports.addNewCategory = async (req, res, next) => {
  try {
    const newCategory = req.body;
    console.log(newCategory);
    const results = await categoryModel.create(newCategory);
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCategoryById = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const results = await categoryModel.deleteOne({ _id: category_id });
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports.updateCategoryById = async (req, res, next) => {
  try {
    console.log(req.body);
    const { category_id } = req.params;
    const { title, description } = req.body;
    const results = await categoryModel.updateOne(
      { _id: category_id },
      {
        $set: {
          title,
          description,
        },
      }
    );
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};
