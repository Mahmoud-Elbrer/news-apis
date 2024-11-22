const { body } = require("express-validator");

exports.createCategoryValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isString()
      .withMessage("Name must be a string"),
    body("nameEn")
      .notEmpty()
      .withMessage("nameEn cannot be empty")
      .isString()
      .withMessage("nameEn must be a string"),
  ];
};