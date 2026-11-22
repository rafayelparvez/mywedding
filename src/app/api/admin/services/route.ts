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

interface AdminService {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  approved: boolean;
  active: boolean;
  createdAt: Date;
  vendorId?: string;
  vendorName?: string;
}

export async function GET() {
  try {
    const mongo = ensureClient();
    await mongo.connect();
    const db = mongo.db("mywedding");

    // Fetch all approved & active services from the database
    const servicesCollection = db.collection("services");
    const services = await servicesCollection
      .find({ approved: true, active: true })
      .sort({ createdAt: -1 })
      .toArray();

    const formattedServices: AdminService[] = services.map((s) => ({
      id: s._id.toString(),
      title: s.title,
      description: s.description,
      category: s.category,
      price: s.price,
      image: s.image,
      approved: s.approved,
      active: s.active,
      createdAt: s.createdAt instanceof Date ? s.createdAt : new Date(s.createdAt),
      vendorId: s.vendorId,
      vendorName: s.vendorName,
    }));

    return new Response(JSON.stringify({ services: formattedServices }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Admin services API error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch services" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}