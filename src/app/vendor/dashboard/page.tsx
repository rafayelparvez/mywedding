"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function VendorDashboardPage() {
  // In real app, fetch from /api/vendor/stats
  const stats = {
    totalServices: 8,
    activeServices: 5,
    pendingBookingRequests: 3,
    acceptedBookings: 2,
    currentSubscription: "Basic",
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
            {/* Vendor role display */}
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
        {/* Overview Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Services */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Total Services
            </p>
            <p className="text-3xl font-bold text-[#190C24]">{stats.totalServices}</p>
          </div>

          {/* Active Services */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Active Services
            </p>
            <p className="text-3xl font-bold text-[#10B981]">{stats.activeServices}</p>
          </div>

          {/* Pending Booking Requests */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Pending Booking Requests
            </p>
            <p className="text-3xl font-bold text-[#FA4796]">{stats.pendingBookingRequests}</p>
          </div>

          {/* Accepted Bookings */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Accepted Bookings
            </p>
            <p className="text-3xl font-bold text-[#10B981]">{stats.acceptedBookings}</p>
          </div>

          {/* Current Subscription Plan */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Current Subscription
            </p>
            <p className="text-3xl font-bold text-[#D81B7E]">
              {stats.currentSubscription}
            </p>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Active This Month
            </p>
            <p className="text-2xl font-bold text-[#190C24]">12</p>
          </div>
          <div>
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Revenue This Month
            </p>
            <p className="text-2xl font-bold text-[#190C24]">$4,500</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <Link
            href="/vendor/my-services"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white hover:bg-[#F9FAFB] hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] transition-colors"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-5"
            >
              <path d="M17 21v-2a4 4 0 0 1-4-4H5a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
            </svg>
            <span>My Services</span>
          </Link>

          <Link
            href="/vendor/booking-requests"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white hover:bg-[#F9FAFB] hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] transition-colors"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1l4 4L23 1" />
            </svg>
            <span>Booking Requests</span>
          </Link>

          <Link
            href="/vendor/subscription"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white hover:bg-[#F9FAFB] hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] transition-colors"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1l4 4L23 1" />
            </svg>
            <span>Subscription</span>
          </Link>

          <Link
            href="/vendor/profile/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white hover:bg-[#F9FAFB] hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] transition-colors"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1l4 4L23 1" />
            </svg>
            <span>Profile</span>
          </Link>
        </div>
      </div>

      {/* Page-specific content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-[#190C24] mb-6">
          Vendor Dashboard
        </h2>
      </div>
    </div>
  );
}