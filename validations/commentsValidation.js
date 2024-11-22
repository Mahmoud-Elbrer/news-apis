const { body } = require("express-validator");

exports.createCommentValidator = () => {
  return [
    body("content")
      .notEmpty()
      .withMessage("Content cannot be empty")
      .isString()
      .withMessage("Content must be a string"),
    body("userId")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
      body("newsId")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
  ];
};

exports.createReplyValidator = () => {
  return [
    body("content")
      .notEmpty()
      .withMessage("Content cannot be empty")
      .isString()
      .withMessage("Content must be a string"),
    body("userId")
      .notEmpty()
      .withMessage("userId cannot be empty")
      .isInt()
      .withMessage("userId must be a string"),
      body("commentId")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
  ];
};