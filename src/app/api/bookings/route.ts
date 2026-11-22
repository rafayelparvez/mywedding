import { createBooking } from "@/lib/bookings";
import { getServices } from "@/lib/services";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { eventDate, eventLocation, message, serviceId, userId } = data;

    // Validate required fields
    if (!eventDate) {
      return new Response(
        JSON.stringify({ error: "Event date is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!serviceId) {
      return new Response(
        JSON.stringify({ error: "Service ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch service to get vendor ID, title, and vendor name
    const services = await getServices(50);
    const service = services.find((s) => s.id === serviceId);

    if (!service) {
      return new Response(
        JSON.stringify({ error: "Service not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create the booking - status defaults to "pending"
    const result = await createBooking(
      {
        userId,
        serviceId,
        eventDate,
        eventLocation: eventLocation || "",
        message: message || "",
        serviceTitle: service.title,
        vendorId: service.vendorId,
        vendorName: service.vendorName,
      },
      userId
    );

    if (!result.success) {
      if (result.alreadyBooked) {
        return new Response(
          JSON.stringify({ error: result.error }),
          {
            status: 409, // Conflict - already booked
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      return new Response(
        JSON.stringify({ error: result.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, booking: result.booking }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Create booking API error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to create booking" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}