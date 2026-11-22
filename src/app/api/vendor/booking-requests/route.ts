import { getUserBookings } from "@/lib/bookings";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get("vendorId");

    // Fetch bookings filtered by vendorId and status "pending"
    const bookings = await getUserBookings(vendorId || "");

    // Filter for pending bookings only
    const pendingBookings = bookings.filter(
      (booking) => booking.status === "pending"
    );

    return new Response(JSON.stringify({ bookings: pendingBookings }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Vendor booking requests API error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch booking requests" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}