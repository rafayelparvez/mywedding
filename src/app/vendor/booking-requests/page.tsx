"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";

export default function VendorBookingRequestsPage() {
  const [pendingBookings, setPendingBookings] = useState<Array<{
    id: string;
    userId: string;
    serviceTitle: string;
    vendorId?: string;
    vendorName?: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: Date;
    message: string;
    eventDate?: string;
    eventLocation?: string;
    userName?: string;
    userImage?: string;
  }>>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, isPending } = useSession();

  // Wait for session to resolve
  useEffect(() => {
    // Session check - if not authenticated, we'll just show the page without redirect
    // since this is a vendor-only page that requires auth
  }, [isPending, session]);

  // Fetch bookings on mount
  useEffect(() => {
    async function fetchBookings() {
      if (!session) return;

      try {
        const res = await fetch("/api/vendor/booking-requests?vendorId=" + session.user.id, {
          cache: "no-store",
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch booking requests");
        }

        const result = await res.json();
        setPendingBookings(result.bookings);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch booking requests");
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

  // Handle accept booking
  const handleAccept = async (bookingId: string) => {
    // Find the booking and check it's pending
    const booking = pendingBookings.find((b) => b.id === bookingId);
    if (!booking || booking.status !== "pending") return;

    if (!window.confirm("Accept this booking request?")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/vendor/booking-requests/" + bookingId + "/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to accept booking");
      }

      // Refresh bookings to update UI (only if session is ready)
      if (isPending || !session) return;
      const fetchRes = await fetch("/api/vendor/booking-requests?vendorId=" + session!.user.id, {
        cache: "no-store",
      });
      const fetchResult = await fetchRes.json();
      setPendingBookings(fetchResult.bookings);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to accept booking");
      setLoading(false);
    }
  };

  // Handle reject booking
  const handleReject = async (bookingId: string) => {
    // Find the booking and check it's pending
    const booking = pendingBookings.find((b) => b.id === bookingId);
    if (!booking || booking.status !== "pending") return;

    if (!window.confirm("Reject this booking request?")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/vendor/booking-requests/" + bookingId + "/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to reject booking");
      }

      // Refresh bookings to update UI (only if session is ready)
      if (isPending || !session) return;
      const fetchRes = await fetch("/api/vendor/booking-requests?vendorId=" + session!.user.id, {
        cache: "no-store",
      });
      const fetchResult = await fetchRes.json();
      setPendingBookings(fetchResult.bookings);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to reject booking");
      setLoading(false);
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
              Vendor
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
          Booking Requests
        </h2>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading && pendingBookings.length === 0 && (
          <div className="grid grid-cols-1 gap-6 py-12">
            <div className="col-span-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur p-8">
              <p className="text-center text-[#190C24]/60">Loading booking requests...</p>
            </div>
          </div>
        )}

        {/* Pending booking requests count */}
        <div className="mb-6">
          <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
            Pending Booking Requests
          </p>
          <p className="text-3xl font-bold text-[#FA4796]">{pendingBookings.length}</p>
        </div>

        {/* Booking requests list */}
        {pendingBookings.length > 0 ? (
          <div className="space-y-6">
            {pendingBookings.map((booking) => {
              const formattedDate = booking.createdAt.toLocaleDateString(
                undefined,
                { month: "short", day: "numeric" }
              );

              return (
                <div
                  key={booking.id}
                  className="border rounded-xl overflow-hidden bg-white shadow-sm mb-6"
                >
                  {/* Customer Information */}
                  <div className="p-5 border-b border-black/10">
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={booking.userImage || "/images/avatar-default.png"}
                        alt={booking.userName || "Customer"}
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10 object-cover"
                      />
                      <div>
                        <p className="font-medium text-[#190C24]">
                          {booking.userName || "Unknown customer"}
                        </p>
                        <p className="text-xs text-[#190C24]/60">
                          {booking.eventDate ? "Event: " + booking.eventDate : "No date specified"}
                        </p>
                      </div>
                    </div>

                    {/* Service Information */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                          Service
                        </p>
                        <p className="text-sm text-[#190C24]">{booking.serviceTitle}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                          Location
                        </p>
                        <p className="text-sm text-[#190C24]">
                          {booking.eventLocation || "Not specified"}
                        </p>
                      </div>
                    </div>

                    {/* Customer Message */}
                    <div>
                      <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                        Message
                      </p>
                      <p className="text-sm text-[#190C24]/60 line-clamp-3">
                        {booking.message}
                      </p>
                    </div>

                    {/* Booking Status */}
                    <div className="mt-3 p-3 rounded bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
                      <p className="font-medium text-[#190C24]/60 uppercase tracking-wider">
                        Status
                      </p>
                      <p className="text-yellow-800">{getStatusText(booking.status)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 border-t border-black/10">
                    {booking.status === "pending" && (
                      <div className="flex gap-3">
                        {/* Accept Button */}
                        <button
                          onClick={() => handleAccept(booking.id)}
                          disabled={true}
                          className="flex-1 px-4 py-2 rounded-xl bg-[#10B981]/20 text-sm font-medium text-[#10B981] hover:bg-[#10B981]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            aria-hidden="true"
                            className="h-4 w-5 mr-2"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Accept
                        </button>

                        {/* Reject Button */}
                        <button
                          onClick={() => handleReject(booking.id)}
                          disabled={true}
                          className="flex-1 px-4 py-2 rounded-xl bg-[#FA4796]/20 text-sm font-medium text-[#FA4796] hover:bg-[#FA4796]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            aria-hidden="true"
                            className="h-4 w-5 mr-2"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M6 18l-8-8 8-8M21 5l-5-5-5 5M18 15l5 5-5 5M9 10l-3 3l3 3" />
                          </svg>
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-[#190C24]/60">
            <p>No pending booking requests</p>
          </div>
        )}
      </div>
    </div>
  );
}