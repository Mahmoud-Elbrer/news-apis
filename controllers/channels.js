const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middlewares/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { models } = require("../database/connection");
const scheduleJobs = require("../index.js");
const { channels ,  categories ,  typeCategories} = models;

exports.getChannels = asyncWrapper(async (req, res, next) => {
  const data = await channels.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getChannel = asyncWrapper(async (req, res, next) => {
  const data = await channels.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: categories,
        as: "category",
      },
      {
        model: typeCategories,
        as: "typeCategory",
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createChannel = asyncWrapper(async (req, res, next) => {
  const dateNow = new Date().toISOString().replace(/[:\.]/g, "-");
  const filePath = `${dateNow}-${req.files.image.name}`;

  const data = await channels.create({
    name: req.body.name,
    nameEn: req.body.nameEn,
    categoryId: req.body.categoryId,
    typeCategoryId: req.body.typeCategoryId,
    language: req.body.language,
    channelUrl: req.body.channelUrl,
    enable: req.body.enable,
    image: filePath,
  });

  await data.save();
  await req.files.image.mv("uploads/channels/" + filePath);

  // reStart schedule RSS functionality to get new channels
  scheduleJobs.scheduleRSSJobs();

  return res.json({
    status: httpStatus.SUCCESS,
    message: "Channel created successfully",
  });
});

exports.updateChannel = asyncWrapper(async (req, res, next) => {});

exports.deleteChannel = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await channels.destroy({ where: { id } });
  if (!data) {
    const error = errorResponse.create(
      `Channel with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Channel deleted" });
});