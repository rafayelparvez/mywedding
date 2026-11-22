import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

function ensureClient(): MongoClient {
  if (!client) {
    const uri = process.env.BETTER_AUTH_DB_URI;
    if (!uri) {
      throw new Error("BETTER_AUTH_DB_URI environment variable is not set");
    }
    client = new MongoClient(uri);
  }
  return client;
}

interface Transaction {
  id: string;
  userId: string;
  serviceId: string;
  serviceTitle: string;
  vendorId?: string;
  vendorName?: string;
  status: "pending" | "accepted" | "rejected";
  amount?: string;
  createdAt: Date;
  respondedAt?: Date;
  userEmail?: string;
}

export async function GET() {
  try {
    const mongo = ensureClient();
    await mongo.connect();
    const db = mongo.db("mywedding");

    // Fetch all bookings/transactions
    const bookingsCollection = db.collection("bookings");
    const allBookings = await bookingsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Fetch all users to get email addresses
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();
    const userMap = new Map<string, string>();
    users.forEach((u) => {
      userMap.set(u._id.toString(), u.email ?? "unknown@email.com");
    });

    const formattedTransactions: Transaction[] = allBookings.map((b) => ({
      id: b.id,
      userId: b.userId,
      serviceId: b.serviceId,
      serviceTitle: b.serviceTitle,
      vendorId: b.vendorId,
      vendorName: b.vendorName,
      status: b.status,
      amount: undefined, // Could be enhanced with payment data
      createdAt: b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt),
      respondedAt: b.respondedAt instanceof Date ? b.respondedAt : b.respondedAt ? new Date(b.respondedAt) : undefined,
      userEmail: userMap.get(b.userId) || "unknown",
    }));

    return new Response(JSON.stringify({ transactions: formattedTransactions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Admin transactions API error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch transactions" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}