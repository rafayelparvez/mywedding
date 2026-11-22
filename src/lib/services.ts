import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
const db = client.db("mywedding");

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

/** Seed sample services into the DB (run once) */
export async function seedServices() {
  await client.connect();
  const collection = db.collection("services");

  const existing = await collection.countDocuments({});
  if (existing > 0) return; // already seeded

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
  console.log(`✅ Seeded ${services.length} sample services`);
}

export async function getServices(limit = 6) {
  await client.connect();
  const collection = db.collection("services");

  const raw = await collection
    .find({ approved: true, active: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return raw.map<Service>((s) => ({
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