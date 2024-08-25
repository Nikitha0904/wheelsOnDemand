// pages/api/update-request-status.js

import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { requestId, status } = req.body;

  if (!requestId || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const connection = await connectToDatabase();

    const [result] = await connection.execute(
      'UPDATE requests SET status = ? WHERE id = ?',
      [status, requestId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    return res.status(200).json({ message: "Request status updated successfully" });
  } catch (error) {
    console.error("Failed to update request status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
