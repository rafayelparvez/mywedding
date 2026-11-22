"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Wait for session to resolve, then redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const [bookings, setBookings] = useState<Array<{
    id: string;
    serviceTitle: string;
    vendorName: string;
    vendorId: string;
    eventDate: string;
    eventLocation: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: Date;
    message: string;
    serviceImage: string;
  }>>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch bookings on mount
  useEffect(() => {
    async function fetchBookings() {
      if (!session) return;

      try {
        const res = await fetch("/api/dashboard/bookings?userId=" + session.user.id, {
          cache: "no-store",
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch bookings");
        }

        const result = await res.json();
        setBookings(result.bookings);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch bookings");
        setLoading(false);
      }
    }

    fetchBookings();
  }, [session]);

  function getStatusClass(status: string) {
    if (status === "pending") return "bg-yellow-100 text-yellow-800";
    if (status === "accepted") return "bg-green-100 text-green-800";
    return "bg-red-100 text-red-800";
  }

  function getStatusText(status: string) {
    if (status === "pending") return "Pending";
    if (status === "accepted") return "Accepted";
    return "Rejected";
  }

  // Handle cancel booking
  const [deleting, setDeleting] = useState<boolean>(false);
  const handleCancel = async (bookingId: string) => {
    // Check if this is the user's own pending booking
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking || booking.status !== "pending") {
      // Show error or ignore
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/dashboard/bookings/" + bookingId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to cancel booking");
      }

      // Remove from local state
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err: any) {
      // Show error
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Topbar */}
      <header
        className="border-b border-black/10 bg-white sticky top-0 z-10 shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/"
              aria-label="MyWedding — Plan your wedding, your way"
              className="flex items-center gap-2"
            >
              <Image
                src="/images/MyWedding-Logo-dark.png"
                alt="MyWedding"
                width={40}
                height={40}
                className="h-6 w-6"
              />
              <span className="text-[13px] font-medium text-[#190C24]">
                MyWedding
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#190C24]">
              User
            </span>

            <button
              onClick={() => window.alert("Sign out clicked")}
              className="ml-4 text-sm text-[#D81B7E] hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold text-[#190C24] mb-6">
          My Bookings
        </h2>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading && bookings.length === 0 && (
          <div className="grid grid-cols-1 gap-6 py-12">
            <div className="col-span-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur p-8">
              <p className="text-center text-[#190C24]/60">Loading bookings...</p>
            </div>
          </div>
        )}

        {/* Bookings list */}
        <div>
          {bookings.length === 0 && !loading && (
            <div className="py-12 text-center text-[#190C24]/60">
              <p>No bookings found.</p>
              <p className="mt-2">Your booking requests will appear here.</p>
            </div>
          )}

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-xl overflow-hidden mb-6 bg-white shadow-sm"
            >
              {/* Service Image */}
              <div className="h-48 w-full relative">
                {booking.serviceImage ? (
                  <Image
                    src={booking.serviceImage}
                    alt={booking.serviceTitle}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="h-48 w-full bg-[#120A18] flex items-center justify-center text-white/50 text-sm"
                  >
                    {booking.serviceTitle}
                  </div>
                )}
              </div>

              {/* Booking Details */}
              <div className="p-6">
                <h3 className="font-semibold text-[13px] text-[#190C24] uppercase tracking-[0.1em] mb-2">
                  {booking.serviceTitle}
                </h3>

                {/* Vendor Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                      Vendor
                    </p>
                    <p className="text-sm text-[#190C24]">{booking.vendorName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                      Event Date
                    </p>
                    <p className="text-sm text-[#190C24]">{booking.eventDate}</p>
                  </div>
                </div>

                {/* Event Location */}
                <div className="mb-4">
                  <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                    Event Location
                  </p>
                  <p className="text-sm text-[#190C24]">{booking.eventLocation}</p>
                </div>

                {/* Status and Dates */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                      Booking Status
                    </p>
                    <p className="text-sm font-medium {
                      getStatusClass(booking.status)
                    }">
                      {getStatusText(booking.status)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                      Requested On
                    </p>
                    <p className="text-sm text-[#190C24]">
                      {booking.createdAt.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Cancel Button (only for pending bookings) */}
                {booking.status === "pending" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-[#D81B7E] text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}