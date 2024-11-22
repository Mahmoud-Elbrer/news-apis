const { body } = require("express-validator");

exports.createTypeCategoryValidator = () => {
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
      body("enable")
      .notEmpty()
      .withMessage("nameEn cannot be empty")
      .isBoolean()
      .withMessage("nameEn must be a string"),
  ];
};