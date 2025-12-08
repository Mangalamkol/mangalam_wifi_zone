const verifyRazorWebhook = (req, res, next) => {
    // Implementation for verifyRazorWebhook
    console.log('Razorpay webhook middleware hit');
    next();
}

module.exports = { verifyRazorWebhook }