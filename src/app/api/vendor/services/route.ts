import { getServices } from "@/lib/services";

export async function GET(request: Request) {
  try {
    // In a real app, we'd get the vendorId from the session
    // For now, fetch all approved services and filter by vendorId if available
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get("vendorId");

    const services = await getServices(50);

    // Filter services by vendorId if provided
    let vendorServices = services;
    if (vendorId) {
      vendorServices = services.filter((s) => s.vendorId === vendorId);
    }

    return new Response(JSON.stringify({ services: vendorServices }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Vendor services API error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch services" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}