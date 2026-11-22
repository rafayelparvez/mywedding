export async function GET() {
  // Mock subscription data - in real app, fetch from database
  const subscription = {
    plan: "Basic",
    status: "active",
    price: "$29/month",
    features: [
      "Up to 5 services",
      "Pending booking requests",
      "Basic analytics",
    ],
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  };

  return new Response(JSON.stringify({ subscription }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}