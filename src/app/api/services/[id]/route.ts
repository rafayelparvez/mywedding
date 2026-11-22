import { getServices } from "@/lib/services";

export async function GET(request: Request) {
  try {
    // Parse the { id } from the URL path
    const pathname = new URL(request.url);
    const id = pathname.pathname.split("/").pop(); // gets the id from /api/services/[id]

    if (!id) {
      return new Response(JSON.stringify({ error: "Service ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch all services and find the one matching ID
    const services = await getServices(50); // fetch enough to search

    const service = services.find((s) => s.id === id);

    if (!service) {
      return new Response(JSON.stringify({ error: "Service not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Only return approved and active services
    if (!service.approved || !service.active) {
      return new Response(JSON.stringify({ error: "Service not available" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ service }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API service detail error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch service" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}