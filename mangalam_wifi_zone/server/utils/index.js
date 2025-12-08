const oc200Client = require("./oc200Client");
const { parseCouponPDF } = require("./pdfParser");
const { sendWhatsAppMessage } = require("./whatsappClient");
const { createOrder, verifyPaymentSignature } = require("./razorpayClient");

module.exports = {
  ...oc200Client,
  parseCouponPDF,
  sendWhatsAppMessage,
  createOrder,
  verifyPaymentSignature,
};