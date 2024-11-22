const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middlewares/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { models } = require("../database/connection");
const { comments, repliesComment, users, commentLikes, replyLikes } = models;

// Comment Routes

exports.getComments = asyncWrapper(async (req, res, next) => {
  const data = await comments.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getComment = asyncWrapper(async (req, res, next) => {
  const data = await comments.findOne({
    where: { id: req.params.id },
    include: { model: repliesComment, as: "replies" },
  });

  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createComment = asyncWrapper(async (req, res, next) => {
  let data = await comments.create(req.body);

  return res.json({
    status: httpStatus.SUCCESS,
    message: "Comment created successfully",
    data,
  });
});

exports.updateComment = asyncWrapper(async (req, res, next) => {});

exports.deleteComment = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await comments.destroy({ where: { id } });
  if (!data) {
    const error = errorResponse.create(
      `Comment with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Comment deleted" });
});

// Reply Routes
exports.getReply = asyncWrapper(async (req, res, next) => {
  const data = await repliesComment.findAll({
    where: { commentId: req.params.id },
    include: [
      { model: users, as: "user", attributes: { exclude: ["password"] } },
      { model: comments, as: "comment" },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createReply = asyncWrapper(async (req, res, next) => {
  let data = await repliesComment.create(req.body);

  return res.json({
    status: httpStatus.SUCCESS,
    message: "Reply created successfully",
    data,
  });
});

exports.updateReply = asyncWrapper(async (req, res, next) => {});

exports.deleteReply = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await repliesComment.destroy({ where: { id } });
  if (!data) {
    const error = errorResponse.create(
      `Reply with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Reply deleted" });
});

// Like or Dislike a Comment
exports.likeComment = async (req, res) => {
  const { commentId, userId, isLike } = req.body;
  let like = await commentLikes.findOne({ where: { commentId, userId } });

  if (like) {
    like.isLike = isLike;
    await like.save();
  } else {
    like = await commentLikes.create(req.body);
  }

  return res.json({
    status: httpStatus.SUCCESS,
    message: "Like or Dislike created successfully",
    like: like,
  });
};

// Like or Dislike a Reply
exports.likeReply = async (req, res) => {
  const { replyId, userId, isLike } = req.body;
  let like = await replyLikes.findOne({ where: { replyId, userId } });

  if (like) {
    like.isLike = isLike;
    await like.save();
  } else {
    like = await replyLikes.create(req.body);
  }

  return res.json({
    status: httpStatus.SUCCESS,
    message: "Like or Dislike created successfully",
    like: like,
  });
};

// Get likes and dislikes count for a comment
exports.getCommentLikes = async (req, res) => {
  const { commentId } = req.params;
  const likesCount = await commentLikes.count({
    where: { commentId, isLike: true },
  });
  const dislikesCount = await commentLikes.count({
    where: { commentId, isLike: false },
  });

  return res.json({
    status: httpStatus.SUCCESS,
    likes: likesCount,
    dislikes: dislikesCount,
  });
};

// Get likes and dislikes count for a reply
exports.getReplyLikes = async (req, res) => {
  const { replyId } = req.params;
  const likesCount = await replyLikes.count({
    where: { replyId, isLike: true },
  });
  const dislikesCount = await replyLikes.count({
    where: { replyId, isLike: false },
  });

  return res.json({
    status: httpStatus.SUCCESS,
    likes: likesCount,
    dislikes: dislikesCount,
  });
};