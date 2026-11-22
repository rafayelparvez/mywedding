import { getBookingStats } from "@/lib/bookings";

export async function GET() {
  try {
    // Fetch stats for the current user - we'll get userId from session
    // For now, fetch all stats and let the client filter if needed
    // In a real app, you'd get the userId from the authenticated session
    const stats = await getBookingStats();

    return new Response(JSON.stringify({ stats }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch dashboard stats" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}