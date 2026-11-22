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

/** Interface for admin dashboard stats */
export interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalTransactions: number;
}

/** Fetch admin dashboard statistics from the database */
export async function GET() {
  try {
    const mongo = ensureClient();
    await mongo.connect();
    const db = mongo.db("mywedding");

    // Total users: count all users in the auth users collection
    const usersCollection = db.collection("users");
    const totalUsers = await usersCollection.countDocuments({});
    const totalVendors = await usersCollection.countDocuments({ role: "vendor" });
    const totalCustomers = await usersCollection.countDocuments({ role: "user" });

    // Total services: count approved & active services
    const servicesCollection = db.collection("services");
    const totalServices = await servicesCollection.countDocuments({ approved: true, active: true });

    // Pending services: count pending bookings
    const bookingsCollection = db.collection("bookings");
    const pendingServices = await bookingsCollection.countDocuments({ status: "pending" });

    // Total transactions: count all bookings (each booking is a transaction)
    const totalTransactions = await bookingsCollection.countDocuments({});

    const stats: AdminStats = {
      totalUsers,
      totalVendors,
      totalCustomers,
      totalServices,
      pendingServices,
      totalTransactions,
    };

    return new Response(JSON.stringify({ stats }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Admin dashboard stats error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch dashboard stats" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}