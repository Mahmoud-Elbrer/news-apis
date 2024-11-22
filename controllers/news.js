const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection.js");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse.js");
const { validationResult } = require("express-validator");
const { news } = models;

exports.getNews = asyncWrapper(async (req, res) => {
  const data = await news.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getNewsById = asyncWrapper(async (req, res) => {
  let data = await news.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: cities,
        as: "cities",
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createNews = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await news.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editNews = asyncWrapper(async (req, res) => {});

exports.deleteNews = asyncWrapper(async (req, res) => {
  console.log('i am deleting news');
  await news.destroy({
    where: {},
  });
  //let data = await news.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS , message: 'All News Deleted' });
});
