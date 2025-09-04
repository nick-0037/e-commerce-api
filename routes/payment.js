const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-payment-intent/:userId", paymentController.createPaymentIntent);

module.exports = router;