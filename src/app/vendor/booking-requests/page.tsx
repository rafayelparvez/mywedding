"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function VendorBookingRequestsPage() {
  // In real app, fetch from /api/vendor/booking-requests
  const pendingBookings = [
    {
      id: "b1",
      serviceTitle: "Elegant Garden Venue",
      userName: "John Smith",
      createdAt: new Date(Date.now() - 86400000 * 3),
      message: "Hello, interested in booking your venue for June 15th",
    },
    {
      id: "b2",
      serviceTitle: "Classic Photography",
      userName: "Mary Johnson",
      createdAt: new Date(Date.now() - 86400000 * 15),
      message: "Looking for photography packages for intimate ceremony",
    },
    {
      id: "b3",
      serviceTitle: "Gourmet Catering",
      userName: "Robert Wilson",
      createdAt: new Date(Date.now() - 86400000 * 20),
      message: "Need catering for 80 guests, vegetarian options required",
    },
  ];

  function getStatusClass(status: string) {
    if (status === "pending") return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  }

  function getStatusText(status: string) {
    if (status === "pending") return "Pending";
    return "Accepted";
  }

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
        </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold text-[#190C24] mb-6">
          Booking Requests
        </h2>

        {/* Pending booking requests count */}
        <div className="mb-6">
          <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
            Pending Booking Requests
          </p>
          <p className="text-3xl font-bold text-[#FA4796]">{pendingBookings.length}</p>
        </div>

        {/* Booking requests list */}
        {pendingBookings.length > 0 ? (
          <div className="space-y-4">
            {pendingBookings.map((booking) => {
              const statusClass = getStatusClass("pending");
              const statusText = getStatusText("pending");
              const formattedDate = booking.createdAt.toLocaleDateString(
                undefined,
                { month: "short", day: "numeric" }
              );

              return (
                <div key={booking.id} className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className="w-8 h-8 rounded-md bg-[#FA4796]/20 text-[#FA4796]"
                      >
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#190C24]">
                            {booking.serviceTitle}
                          </p>
                          <p className="text-xs text-[#190C24]/60">
                            {formattedDate}
                          </p>
                          <p className="text-xs text-[#190C24]/60">
                            from {booking.userName}
                          </p>
                        </div>

                        <div className="flex-1">
                          <p className="text-xs text-[#190C24]/60">{booking.message}</p>
                        </div>

                        <div className="flex-shrink-0">
                          <button
                            className="px-3 py-1 rounded text-xs font-medium text-[#FA4796] hover:underline"
                          >
                            Accept
                          </button>
                          <button
                            className="px-3 py-1 rounded text-xs font-medium text-[#FA4796] hover:underline ml-2"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[#190C24]/60 text-sm">
              No pending booking requests
            </p>
          )}
        </div>
      </div>
    </div>
  );
}