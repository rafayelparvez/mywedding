import { getServices } from "@/lib/services";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Limit and sort are applied server-side
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);
    const sortBy = searchParams.get("sort") || "newest";

    const services = await getServices(limit);

    // Apply sorting server-side
    services.sort((a, b) => {
      switch (sortBy) {
        case "price-low": {
          const priceA = parseInt(a.price.replace(/[^\d]/g, "") || "0");
          const priceB = parseInt(b.price.replace(/[^\d]/g, "") || "0");
          return priceA - priceB;
        }
        case "price-high": {
          const priceA = parseInt(a.price.replace(/[^\d]/g, "") || "0");
          const priceB = parseInt(b.price.replace(/[^\d]/g, "") || "0");
          return priceB - priceA;
        }
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return new Response(JSON.stringify({ services }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch services" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}