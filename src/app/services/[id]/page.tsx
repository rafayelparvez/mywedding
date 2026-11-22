"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Service } from "@/lib/services";
import { ROLE_LABELS } from "@/lib/roles";
import { useRouter } from "next/navigation";
import { useRef, useCallback } from "react";

export default function ServiceDetailPage() {
  const { id } = useParams() as { id: string };
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Wait for session to resolve, then redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  // Also wait for id to be available
  useEffect(() => {
    if (!isPending && !id) {
      router.push("/services");
    }
  }, [isPending, id, router]);

  const [service, setService] = useState<Service | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    eventDate: "",
    eventLocation: "",
    message: "",
  });

  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Fetch service details after session and id are ready
  useEffect(() => {
    if (isPending || !id) return;

    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          const errData = await res.json();
          setError(errData.error || "Failed to load service");
          return;
        }

        const data = await res.json();
        setService(data.service);
      } catch (err) {
        setError("Failed to load service. Please try again.");
      }
    }

    fetchService();
  }, [isPending, id]);

  if (isPending) {
    return (
      <div className="min-h-80 flex items-center justify-center">
        <div className="animate-pulse rounded-2xl bg-[#120A18] w-64 h-24 mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-[#190C24]/60">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-24 sm:py-32 text-center">
        <p className="text-[#190C24]/60 text-sm">
          Service not found. It may be unavailable or the ID is invalid.
        </p>
        <div className="mt-4">
          <a href="/services" className="text-[#D81B7E] font-medium hover:underline">
            Go back to services
          </a>
        </div>
      </div>
    );
  }

  // Check if current user is a vendor and this is their own service
  const isVendorOwnService =
    session?.user.role === "vendor" && service.vendorId === session?.user.id;

  // Handle booking submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    setBookingError(null);
    setBookingSuccess(null);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);

      const eventDate = formData.get("eventDate") as string;
      const eventLocation = formData.get("eventLocation") as string;
      const message = formData.get("message") as string;

      // Validate required fields
      if (!eventDate.trim()) {
        throw new Error("Event date is required");
      }

      // Submit booking to API - userId comes from session, not form
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          eventDate: eventDate.trim(),
          eventLocation: eventLocation.trim(),
          message: message.trim(),
          serviceId: service!.id,
          userId: session!.user.id, // TRUSTED: from authenticated session only
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === "You have already booked this service.") {
          setBookingError(result.error);
          setIsBooking(false);
          // Show "already booked" feedback - don't reset, keep user informed
          return;
        }
        throw new Error(result.error || "Failed to create booking");
      }

      setBookingSuccess("Booking submitted successfully! The vendor will review your request.");
      setFormData({
        eventDate: "",
        eventLocation: "",
        message: "",
      });

      // Reset success after 5 seconds
      const timer = setTimeout(() => setBookingSuccess(null), 5000);
      return () => clearTimeout(timer);
    } catch (err: any) {
      setBookingError(err.message || "Failed to create booking");
    } finally {
      setIsBooking(false);
    }
  }, [service, session]);

  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-6 text-3xl sm:text-4xl font-semibold text-[#190C24] text-center sm:text-left">
            {service.title}
          </h1>

          <p className="text-[#190C24]/60 text-sm">
            {service.description}
          </p>
        </div>

        {/* Service details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Image */}
          <div>
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="rounded-2xl h-64 w-full object-cover sm:h-80"
              />
            ) : (
              <div
                className="rounded-2xl h-64 w-full bg-[#120A18] flex items-center justify-center text-white/50 text-sm"
              >
                {service.category}
              </div>
            )}
          </div>

          {/* Category & Price */}
          <div>
            <p className="text-[#190C24]/60 text-sm mb-2">
              <strong>Category:</strong> {service.category}
            </p>
            <p className="text-[#190C24]/60 text-sm mb-2">
              <strong>Price:</strong> {service.price}
            </p>
          </div>

          {/* Vendor Info */}
          <div>
            <p className="text-[#190C24]/60 text-sm mb-2">
              <strong>Vendor:</strong> {service.vendorName || "Not specified"}
            </p>
            {session?.user.role !== "admin" && !isVendorOwnService && (
              <p className="text-[#190C24]/60 text-sm small">
                {service.vendorId
                  ? "Contact vendor through platform"
                  : "Vendor not listed"}
              </p>
            )}
          </div>
        </div>

        {/* Booking CTA */}
        {session?.user.role !== "admin" ? (
          <>
            {isVendorOwnService ? (
              <p className="mt-6 text-[#190C24]/60 text-sm">
                You cannot book your own service. Contact the vendor directly.
              </p>
            ) : (
              <div className="mt-6">
                {/* Show "Already Booked" feedback if applicable */}
                {bookingError && (
                  <div className="mb-3 p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
                    <p>{bookingError}</p>
                  </div>
                )}

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#190C24] mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          eventDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#190C24] mb-2">
                      Event Location
                    </label>
                    <input
                      type="text"
                      name="eventLocation"
                      value={formData.eventLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          eventLocation: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#190C24] mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E]"
                      placeholder="e.g., Looking for weekend availability, specific requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isBooking}
                    className="w-full px-6 py-3 rounded-xl bg-[#D81B7E]/20 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
                  >
                    {isBooking ? (
                      "Submitting..."
                    ) : (
                      "Book this service"
                    )}
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 text-center">
            <p className="text-[#190C24]/60 text-sm">
              Admins cannot create customer bookings. Contact vendors directly.
            </p>
          </div>
        )}

        {/* Admin note: can view any service details */}
        {session?.user.role === "admin" && (
          <p className="mt-3 text-xs text-[#190C24]/60]">
            Admin: Can modify or remove any service.
          </p>
        )}
      </div>
    </div>
  );
}