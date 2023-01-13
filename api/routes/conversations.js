const router = require("express").Router();
const Conversation = require("../models/Conversation");

router.post("/", async (req, res) => {
  const newConversations = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversations.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {
        $in: [req.params.userId],
      },
    });
    res.status(200).json(conversation);
  } catch (err) {}
});

module.exports = router;
