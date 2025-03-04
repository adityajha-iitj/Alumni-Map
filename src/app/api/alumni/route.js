import no_filter_handler from "../../../database/fetch_complete_data";

export async function GET() {
  try {
    const data = await no_filter_handler();
    
    // ✅ Convert Mongoose documents to plain JSON objects
    const jsonData = JSON.parse(JSON.stringify(data));

    return Response.json(jsonData);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
