import { connectToDatabase } from "@/lib/db";

export async function POST(req, res) {
  try {
    const { requestId, status } = await req.json();

    if (!requestId || !status) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const connection = await connectToDatabase();

    const [result] = await connection.execute(
      'UPDATE requests SET status = ? WHERE request_id = ?',
      [status, requestId]
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ message: "Request not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Request status updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Failed to update request status:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
