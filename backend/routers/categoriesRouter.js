const express = require("express");
const {
  getAllCategory,
  addNewCategory,
  deleteCategoryById,
  updateCategoryById,
  getCategoryById,
} = require("../controllers/categoriesController");
const router = express.Router();

router.get("/", getAllCategory);
router.get("/:category_id", getCategoryById);
router.post("/", addNewCategory);
router.delete("/:category_id", deleteCategoryById);
router.put("/:category_id", updateCategoryById);

module.exports = router;
