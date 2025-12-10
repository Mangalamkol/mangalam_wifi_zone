const fs = require("fs").promises;
const pdf = require("pdf-parse");

async function parseCouponPDF(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const data = await pdf(buffer);

    // Filter for lines that look like coupon codes (e.g., alphanumeric, at least 6 chars)
    const codes = data.text
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => /^[A-Za-z0-9]{6,}$/.test(t));

    return codes;
  } catch (error) {
    console.error(`Error parsing PDF at ${filePath}:`, error);
    // Re-throw the error to be handled by the controller.
    throw new Error("Failed to parse and extract coupon codes from PDF.");
  } finally {
    // Cleanup: always try to delete the temporary file.
    try {
      await fs.unlink(filePath);
    } catch (cleanupError) {
      // Log an error if cleanup fails, but don't throw because the primary operation may have succeeded.
      console.error(`Failed to delete temporary file ${filePath}:`, cleanupError);
    }
  }
}

module.exports = { parseCouponPDF };
