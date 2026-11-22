import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

/** Ensure MongoClient is initialized */
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

/** Service interface */
export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string; // data URL or path
  approved: boolean;
  active: boolean;
  createdAt: Date;
  vendorId?: string;
  vendorName?: string;
}

/** Service categories reflected in the UI palette */
export const SERVICE_CATEGORIES = {
  venue: "Venue",
  photography: "Photography",
  catering: "Catering",
  florist: "Florist",
  attire: "Attire",
  officiant: "Officiant",
} as const;

/** Get the vendor's subscription plan from their user document */
async function getVendorPlan(vendorId: string): Promise<"free" | "premium"> {
  const mongo = ensureClient();
  await mongo.connect();
  const db = mongo.db("mywedding");
  const usersCollection = db.collection("users");
  const user = await usersCollection.findOne({ vendorId });
  // Check additional fields for subscription plan
  if (user?.additionalFields?.subscriptionPlan) {
    return user.additionalFields.subscriptionPlan as "free" | "premium";
  }
  // Default to free for vendors
  return "free";
}

/** Count active (approved + active) services for a vendor */
async function countVendorActiveServices(vendorId: string): Promise<number> {
  const mongo = ensureClient();
  await mongo.connect();
  const db = mongo.db("mywedding");
  const collection = db.collection("services");
  const count = await collection.countDocuments({ vendorId, active: true, approved: true });
  return count;
}

/** Check if vendor can publish another service based on their plan */
async function canVendorPublishService(vendorId: string): Promise<{ allowed: boolean; reason?: string }> {
  const plan = await getVendorPlan(vendorId);
  const activeCount = await countVendorActiveServices(vendorId);

  if (plan === "premium") {
    return { allowed: true };
  }

  // Free vendors: max 3 active services
  if (activeCount >= 3) {
    return { allowed: false, reason: "Free vendors can have a maximum of 3 active services. Upgrade to premium for unlimited." };
  }

  return { allowed: true };
}

/** Initialize MongoDB connection and seed services if needed */
export async function initializeServices() {
  const mongo = ensureClient();
  await mongo.connect();
  const db = mongo.db("mywedding");
  const collection = db.collection("services");

  // Seed sample services if collection is empty
  const existingCount = await collection.countDocuments({});
  if (existingCount === 0) {
    const services = [
      {
        title: "Elegant Garden Venue",
        description: "Beautiful outdoor wedding venue with garden scenery and indoor backup options.",
        category: "venue",
        price: "$5,500",
        image: "/images/placeholder-venue.jpg",
        approved: true,
        active: true,
        createdAt: new Date(),
      },
      {
        title: "Classic Photography",
        description: "Timeless wedding photography and videography capturing every moment.",
        category: "photography",
        price: "$2,800",
        image: "/images/placeholder-photo.jpg",
        approved: true,
        active: true,
        createdAt: new Date(),
      },
      {
        title: "Gourmet Catering",
        description: "Custom wedding menus with local, seasonal ingredients and dietary accommodations.",
        category: "catering",
        price: "$8,200",
        image: "/images/placeholder-catering.jpg",
        approved: true,
        active: true,
        createdAt: new Date(),
      },
      {
        title: "Seasonal Florist",
        description: "Hand-tied bouquets and centerpieces using fresh seasonal blooms.",
        category: "florist",
        price: "$1,800",
        image: "/images/placeholder-florist.jpg",
        approved: true,
        active: true,
        createdAt: new Date(),
      },
      {
        title: "Bridal Attire",
        description: "Wedding dresses and tuxedo rental with alteration services.",
        category: "attire",
        price: "$1,600",
        image: "/images/placeholder-attire.jpg",
        approved: true,
        active: true,
        createdAt: new Date(),
      },
      {
        title: "Ceremony Officiant",
        description: "Personalized wedding ceremony officiation for all faiths and traditions.",
        category: "officiant",
        price: "$650",
        image: "/images/placeholder-officiant.jpg",
        approved: true,
        active: true,
        createdAt: new Date(),
      },
      {
        title: "Luxury Transportation",
        description: "Classic and modern wedding day transportation in premium vehicles.",
        category: "venue",
        price: "$1,200",
        image: "/images/placeholder-transport.jpg",
        approved: true,
        active: true,
        createdAt: new Date(),
      },
      {
        title: "Wedding Planner",
        description: "Full-service wedding planning and day-of coordination.",
        category: "venue",
        price: "$3,500",
        image: "/images/placeholder-planner.jpg",
        approved: true,
        active: true,
        createdAt: new Date(),
      },
    ];

    await collection.insertMany(services);
    console.log(`✅ Seeded ${services.length} sample services into MongoDB`);
  }
}

/** Fetch approved & active services from MongoDB */
export async function getServices(limit = 6) {
  const mongo = ensureClient();
  await mongo.connect();
  const db = mongo.db("mywedding");
  const collection = db.collection("services");

  const raw = await collection
    .find({ approved: true, active: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return (
    raw as Array<{
      _id: any;
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
    }>
  ).map((s) => ({
    id: s._id.toString(),
    title: s.title,
    description: s.description,
    category: s.category,
    price: s.price,
    image: s.image,
    approved: s.approved,
    active: s.active,
    createdAt: s.createdAt,
    vendorId: s.vendorId,
    vendorName: s.vendorName,
  }));
}

/** Create a new service with subscription limit enforcement and pending approval */
export async function createService(
  service: {
    title: string;
    category: string;
    description: string;
    price: string;
    image: string;
    vendorId: string;
    vendorName: string;
  },
  vendorId: string
): Promise<{ success: boolean; service?: Service; error?: string }> {
  // Check subscription limits
  const canPublish = await canVendorPublishService(vendorId);
  if (!canPublish.allowed) {
    return { success: false, error: canPublish.reason! };
  }

  const mongo = ensureClient();
  await mongo.connect();
  const db = mongo.db("mywedding");
  const collection = db.collection("services");

  const newService: Service = {
    id: crypto.randomUUID(),
    title: service.title,
    description: service.description,
    category: service.category,
    price: service.price,
    image: service.image,
    approved: false, // New services start as Pending approval
    active: false, // Inactive until approved
    createdAt: new Date(),
    vendorId,
    vendorName,
  };

  await collection.insertOne(newService);
  return { success: true, service: newService };
}