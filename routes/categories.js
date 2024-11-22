const router = require("express").Router();
const {
  getCategories,
  getCategory, 
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const {
  createCategoryValidator,
} = require("../validations/categoriesValidation");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategoryValidator(), createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
module.exports = router;
