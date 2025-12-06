const fs = require('fs');
const pdf = require('pdf-parse');

async function parsePdf(pdfPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);

        // Regex to find potential coupon codes (e.g., alphanumeric, 6-12 characters)
        const couponRegex = /[A-Z0-9]{6,12}/g;
        const text = data.text;
        const matches = text.match(couponRegex) || [];

        // Clean up and return unique codes
        const uniqueCodes = [...new Set(matches)];
        return uniqueCodes;

    } catch (error) {
        console.error("Error parsing PDF:", error);
        throw error; 
    } finally {
        // Clean up the uploaded file
        if (fs.existsSync(pdfPath)) {
            fs.unlinkSync(pdfPath);
        }
    }
}

module.exports = { parsePdf };