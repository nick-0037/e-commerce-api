const webhookController = require("../controllers/webhookController");

const express = require("express");

const router = express.Router();

router.post("/webhook", webhookController.stripeWebhook);

module.exports = router;