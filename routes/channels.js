const router = require("express").Router();
const {
  getChannels,
  getChannel, 
  createChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channels");
const {
  createChannelValidator,
} = require("../validations/channelsValidation");

router.get("/", getChannels);
router.get("/:id", getChannel);
router.post("/", createChannelValidator(), createChannel);
router.put("/:id", updateChannel);
router.delete("/:id", deleteChannel);
module.exports = router;
