import { getServices } from "@/lib/services";

export async function GET() {
  try {
    const services = await getServices(6);
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