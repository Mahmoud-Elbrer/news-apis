const { body } = require("express-validator");

exports.createChannelValidator = () => {
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
    body("categoryId")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
    body("typeCategoryId")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
    body("language")
      .notEmpty()
      .withMessage("language cannot be empty")
      .isString()
      .withMessage("language must be a string"),
    body("channelUrl")
      .notEmpty()
      .withMessage("channelUrl cannot be empty")
      .isString()
      .withMessage("channelUrl must be a string"),
    body("enable")
      .notEmpty()
      .withMessage("enable cannot be empty")
      .isBoolean()
      .withMessage("enable must be a string"),
  ];
};