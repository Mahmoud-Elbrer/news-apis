const router = require("express").Router();
const {
  getTypeCategory,
  getTypeCategories, 
  createTypeCategory,
  updateTypeCategory,
  deleteTypeCategory,
} = require("../controllers/typeCategories");
const {
  createTypeCategoryValidator,
} = require("../validations/typeCategoriesValidation");

router.get("/", getTypeCategories);
router.get("/:id", getTypeCategory);
router.post("/", createTypeCategoryValidator(), createTypeCategory);
router.put("/:id", updateTypeCategory);
router.delete("/:id", deleteTypeCategory);
module.exports = router;
