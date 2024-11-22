const router = require("express").Router();
const {
  // Comment routes
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  // Reply routes
  getReply,
  createReply,
  updateReply,
  deleteReply,
  // Comment like/dislike routes
  likeComment,
  getCommentLikes,
  // Reply like/dislike routes
  likeReply,
  getReplyLikes,
} = require("../controllers/comments");
const {
  createCommentValidator,
  createReplyValidator,
} = require("../validations/commentsValidation");

// Comment routes
router.get("/", getComments);
router.get("/:id", getComment);
router.post("/", createCommentValidator(), createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

// Reply routes
router.post("/:id/replies", createReplyValidator(), createReply);
router.get("/:id/replies", getReply);
router.put("/replies/:id", updateReply);
router.delete("/replies/:id", deleteReply);

// Comment like/dislike routes
router.post("/like", likeComment);
router.get("/:commentId/likes", getCommentLikes);

// Reply like/dislike routes
router.post("/replies/like", likeReply);
router.get("/replies/:replyId/likes", getReplyLikes);

module.exports = router;
