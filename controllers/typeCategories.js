const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middlewares/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { models } = require("../database/connection");
const { typeCategories } = models;

exports.getTypeCategories = asyncWrapper(async (req, res, next) => {
  const data = await typeCategories.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getTypeCategory = asyncWrapper(async (req, res, next) => {
  const data = await typeCategories.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createTypeCategory = asyncWrapper(async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
  //   return next(error);
  // }
  let data = await typeCategories.create(req.body);

  return res.json({
    status: httpStatus.SUCCESS,
    message: "Type Category created successfully",
    data
  });
});

exports.updateTypeCategory = asyncWrapper(async (req, res, next) => {});

exports.deleteTypeCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await typeCategories.destroy({ where: { id } });
  if (!data) {
    const error = errorResponse.create(
      `Type Category with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Type Category deleted" });
});

