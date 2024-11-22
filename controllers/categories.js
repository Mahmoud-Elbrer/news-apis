const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middlewares/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { models } = require("../database/connection");
const { categories } = models;

exports.getCategories = asyncWrapper(async (req, res, next) => {
  const data = await categories.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getCategory = asyncWrapper(async (req, res, next) => {
  const data = await categories.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createCategory = asyncWrapper(async (req, res, next) => {
  const dateNow = new Date().toISOString().replace(/[:\.]/g, "-");
  const filePath = `${dateNow}-${req.files.image.name}`;

  const data = await categories.create({
    name: req.body.name,
    nameEn: req.body.nameEn,
    enable: req.body.enable,
    image: filePath,
  });
  await data.save();
  await req.files.image.mv("uploads/categories/" + filePath);

  return res.json({
    status: httpStatus.SUCCESS,
    message: "Category created successfully",
  });
});

exports.updateCategory = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const data = await categories.update(req.body, {
    where: { id },
  });
  console.log(data);
  if (!data[0]) {
    const error = errorResponse.create(
      `Category with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: "Category updated successfully" });
});

exports.deleteCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await categories.destroy({ where: { id } });
  if (!data) {
    const error = errorResponse.create(
      `Category with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Category deleted" });
});


exports.deleteAllCategory = asyncWrapper(async (req, res, next) => {
  await categories.destroy({
    where: {}
  });
  return res.json({ status: httpStatus.SUCCESS, message : "Categories deleted" });
});
