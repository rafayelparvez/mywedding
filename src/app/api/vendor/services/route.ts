import { createService } from "@/lib/services";
import { getServices } from "@/lib/services";

export async function GET(request: Request) {
  try {
    // In a real app, we'd get the vendorId from the session
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get("vendorId");

    const services = await getServices(50);

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

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const title = data.get("title") as string;
    const category = data.get("category") as string;
    const description = data.get("description") as string;
    const price = data.get("price") as string;
    const images = data.getAll("images") as string[];
    const vendorId = data.get("vendorId") as string;
    const vendorName = data.get("vendorName") as string;

    // Validate required fields
    if (!title || !category || !description || !price || !vendorId) {
      return new Response(
        JSON.stringify({ error: "All required fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Format images as comma-separated data URLs or paths
    const image = images.length > 0 ? images.join(", ") : "";

    // Create the service with subscription limit enforcement and pending approval
    const result = await createService(
      {
        title,
        category,
        description,
        price,
        image,
        vendorId,
        vendorName: vendorName || undefined,
      },
      vendorId
    );

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, service: result.service }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Create service API error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to create service" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}