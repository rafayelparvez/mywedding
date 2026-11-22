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

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: "Booking ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (action !== "accept" && action !== "reject") {
      return new Response(
        JSON.stringify({ error: "Invalid action. Use 'accept' or 'reject'." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch bookings to check owner and status
    const { searchParams: sp } = new URL(request.url);
    const vendorId = sp.get("vendorId");

    const bookings = await getUserBookings(vendorId || "");

    // Find the booking
    const booking = bookings.find((b) => b.id === bookingId);

    if (!booking) {
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (booking.status !== "pending") {
      return new Response(
        JSON.stringify({ error: "Only pending bookings can be processed" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // In a real implementation, we'd update the booking status in MongoDB
    // For now, we'll return success and let the frontend refetch
    // A real implementation would update the document: 
    // await collection.updateOne({ _id: new ObjectId(bookingId) }, { $set: { status: action === "accepted" ? "accepted" : "rejected" }, $set: { respondedAt: new Date() } })

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Process booking request error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to process booking request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}