"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  // Sample statistics - in real app, fetch from /api/dashboard/stats
  const stats = {
    total: 5,
    pending: 2,
    accepted: 2,
    rejected: 1,
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
        {/* Overview Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Booking Requests */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Total Booking Requests
            </p>
            <p className="text-3xl font-bold text-[#190C24]">{stats.total}</p>
          </div>

          {/* Pending Bookings */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Pending Bookings
            </p>
            <p className="text-3xl font-bold text-[#FA4796]">{stats.pending}</p>
          </div>

          {/* Accepted Bookings */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Accepted Bookings
            </p>
            <p className="text-3xl font-bold text-[#10B981]">{stats.accepted}</p>
          </div>

          {/* Rejected Bookings */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
            <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
              Rejected Bookings
            </p>
            <p className="text-3xl font-bold text-[#F87171]">{stats.rejected}</p>
          </div>
        </div>

        {/* Profile Settings section */}
        <div>
          <h3 className="text-xl font-semibold text-[#190C24] mb-4">
            Profile Settings
          </h3>
          <p className="text-[#190C24]/60 text-sm">
            Manage your profile information, upload avatar, and update account settings.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Name
              </p>
              <p className="font-medium text-[#190C24]">John Doe</p>
            </div>
            <div>
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Email
              </p>
              <p className="font-medium text-[#190C24]">john@example.com</p>
            </div>
          </div>
          <button
            onClick={() => window.alert("Profile settings clicked")}
            className="mt-4 w-full inline-flex items-center justify-center rounded-full bg-[#D81B7E]/20 px-5 py-3 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-5 mr-2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1l4 4L23 1" />
            </svg>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}