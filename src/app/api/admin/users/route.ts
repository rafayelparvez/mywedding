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

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: "user" | "vendor" | "admin";
  image?: string | null;
  createdAt: Date;
}

export async function GET() {
  try {
    const mongo = ensureClient();
    await mongo.connect();
    const db = mongo.db("mywedding");

    // Fetch all users from the auth users collection
    const usersCollection = db.collection("users");
    const users = await usersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formattedUsers: User[] = users.map((u) => ({
      id: u._id.toString(),
      name: u.name ?? null,
      email: u.email ?? "",
      role: u.role ?? "user",
      image: u.image ?? undefined,
      createdAt: u.createdAt instanceof Date ? u.createdAt : new Date(u.createdAt),
    }));

    return new Response(JSON.stringify({ users: formattedUsers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Admin users API error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}