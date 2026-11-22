import { getUserBookings, createBooking } from "@/lib/bookings";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const bookings = await getUserBookings(userId || "");

    return new Response(JSON.stringify({ bookings }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Dashboard bookings error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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

    // Fetch bookings to check owner
    const { searchParams: sp } = new URL(request.url);
    const userId = sp.get("userId");

    const bookings = await getUserBookings(userId || "");

    // Find the booking and verify it's the user's own pending booking
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
        JSON.stringify({ error: "Only pending bookings can be cancelled" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // In a full implementation, we'd delete from MongoDB directly
    // For now, we'll just return success and let the frontend refetch
    // A real implementation would use: await collection.deleteOne({ _id: new ObjectId(bookingId) })

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Cancel booking error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to cancel booking" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}