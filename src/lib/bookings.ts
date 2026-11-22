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

/** Booking interface */
export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  serviceTitle: string;
  vendorId?: string;
  vendorName?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  respondedAt?: Date;
}

/** Booking statistics interface */
export interface BookingStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
}

/** Seed sample bookings into the DB (run once) */
export async function initializeBookings() {
  const mongo = ensureClient();
  await mongo.connect();
  const db = mongo.db("mywedding");
  const collection = db.collection("bookings");

  // Check if bookings already exist
  const existingCount = await collection.countDocuments({});
  if (existingCount > 0) return; // already seeded

  // Get all services to reference
  // We'll create bookings for various services
  const bookings = [
    // User 1 bookings (user role)
    {
      id: "b1",
      userId: "user-1",
      serviceId: "s1",
      serviceTitle: "Elegant Garden Venue",
      status: "accepted",
      createdAt: new Date(Date.now() - 86400000 * 30), // 30 days ago
      respondedAt: new Date(Date.now() - 86400000 * 25),
    },
    {
      id: "b2",
      userId: "user-1",
      serviceId: "s2",
      serviceTitle: "Classic Photography",
      status: "pending",
      createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    },
    {
      id: "b3",
      userId: "user-1",
      serviceId: "s3",
      serviceTitle: "Gourmet Catering",
      status: "rejected",
      createdAt: new Date(Date.now() - 86400000 * 15),
    },
    {
      id: "b4",
      userId: "user-1",
      serviceId: "s5",
      serviceTitle: "Bridal Attire",
      status: "accepted",
      createdAt: new Date(Date.now() - 86400000 * 45),
      respondedAt: new Date(Date.now() - 86400000 * 40),
    },
    // User 2 bookings (another user)
    {
      id: "b5",
      userId: "user-2",
      serviceId: "s4",
      serviceTitle: "Seasonal Florist",
      status: "pending",
      createdAt: new Date(Date.now() - 86400000 * 3),
    },
    {
      id: "b6",
      userId: "user-2",
      serviceId: "s6",
      serviceTitle: "Ceremony Officiant",
      status: "accepted",
      createdAt: new Date(Date.now() - 86400000 * 60),
      respondedAt: new Date(Date.now() - 86400000 * 55),
    },
    // User 3 bookings
    {
      id: "b7",
      userId: "user-3",
      serviceId: "s1",
      serviceTitle: "Elegant Garden Venue",
      status: "pending",
      createdAt: new Date(Date.now() - 86400000 * 10),
    },
    {
      id: "b8",
      userId: "user-3",
      serviceId: "s5",
      serviceTitle: "Bridal Attire",
      status: "accepted",
      createdAt: new Date(Date.now() - 86400000 * 20),
      respondedAt: new Date(Date.now() - 86400000 * 18),
    },
  ];

  await collection.insertMany(bookings);
  console.log(`✅ Seeded ${bookings.length} sample bookings into MongoDB`);
}

/** Fetch booking statistics from the database */
export async function getBookingStats(userId?: string): Promise<BookingStats> {
  const mongo = ensureClient();
  await mongo.connect();
  const db = mongo.db("mywedding");
  const collection = db.collection("bookings");

  // Build filter
  const filter: any = {};

  // If userId is provided, filter by that user
  if (userId) {
    filter.userId = userId;
  }

  const total = await collection.countDocuments(filter);
  const pending = await collection.countDocuments({ ...filter, status: "pending" });
  const accepted = await collection.countDocuments({ ...filter, status: "accepted" });
  const rejected = await collection.countDocuments({ ...filter, status: "rejected" });

  return { total, pending, accepted, rejected };
}

/** Fetch user's bookings from the database */
export async function getUserBookings(userId: string): Promise<Booking[]> {
  const mongo = ensureClient();
  await mongo.connect();
  const db = mongo.db("mywedding");
  const collection = db.collection("bookings");

  const bookings = await collection
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  return bookings.map((b) => ({
    id: b.id,
    userId: b.userId,
    serviceId: b.serviceId,
    serviceTitle: b.serviceTitle,
    vendorId: b.vendorId,
    vendorName: b.vendorName,
    status: b.status,
    createdAt: b.createdAt,
    respondedAt: b.respondedAt,
  }));
}

/** Create a new booking with validation and duplicate check */
export async function createBooking(
  booking: {
    userId: string;
    serviceId: string;
    eventDate: string;
    eventLocation?: string;
    message?: string;
    serviceTitle?: string;
    vendorId?: string;
    vendorName?: string;
  },
  sessionUserId: string
): Promise<{ success: boolean; booking?: Booking; error?: string; alreadyBooked?: boolean }> {
  // Prevent duplicate booking: check if user already booked this service
  const existingBookings = await getUserBookings(sessionUserId);
  const alreadyBooked = existingBookings.some(
    (b) => b.serviceId === booking.serviceId
  );

  if (alreadyBooked) {
    return { success: false, error: "You have already booked this service.", alreadyBooked: true };
  }

  const mongo = ensureClient();
  await mongo.connect();
  const db = mongo.db("mywedding");
  const collection = db.collection("bookings");

  const newBooking: Booking = {
    id: crypto.randomUUID(),
    userId: sessionUserId,
    serviceId: booking.serviceId,
    serviceTitle: booking.serviceTitle || "",
    vendorId: booking.vendorId,
    vendorName: booking.vendorName,
    status: "pending",
    createdAt: new Date(),
    respondedAt: undefined,
  };

  await collection.insertOne(newBooking);

  return {
    success: true,
    booking: {
      id: newBooking.id,
      userId: sessionUserId,
      serviceId: booking.serviceId,
      serviceTitle: booking.serviceTitle || "",
      vendorId: booking.vendorId,
      vendorName: booking.vendorName,
      status: "pending",
      createdAt: new Date(),
      respondedAt: undefined,
    } as Booking,
  };
}