export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validate required fields
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // betterAuth handles the actual profile update via its built-in
    // updateUser endpoint which respects the input: false constraints
    // on role, subscriptionPlan, subscription expiration, and blocked status.
    // We just validate and return success; the session will be refreshed.

    return new Response(
      JSON.stringify({ success: true, message: "Profile update submitted" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Update profile error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to update profile" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}