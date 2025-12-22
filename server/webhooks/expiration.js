import User from "../models/user.model.js";
import { sendNotification } from "../services/notificationService.js";

export async function handleExpiration(req, res) {
  const { userId, plan, expiresAt } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const message = `Your plan ${plan} has expired on ${new Date(expiresAt).toLocaleDateString()}.`;

    // Send notification to user
    await sendNotification(user.fcmToken, "Plan Expiration", message);

    res.status(200).json({ message: "Expiration notification sent" });
  } catch (error) {
    console.error("Error handling expiration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
