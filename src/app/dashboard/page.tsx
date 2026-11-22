"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
useClient;

import { useEffect, useState } from "react";

// Admin dashboard page with metrics and navigation
interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalTransactions: number;
}

interface DashboardNavItem {
  label: string;
  href: string;
  icon?: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard stats from API
  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch("/api/admin/stats", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }
        const data = await response.json();
        setStats(data.stats);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  if (isLoading && stats === null) {
    return (
      <div className="min-h-screen bg-white p-8">
        <p className="text-lg text-[#190C24]">Loading dashboard stats...</p>
      </div>
    );
  }

  const navLinks: DashboardNavItem[] = [
    { label: "Overview", href: "/dashboard" },
    { label: "Manage Users", href: "/dashboard/users" },
    { label: "Manage Services", href: "/dashboard/services" },
    { label: "Transactions", href: "/dashboard/transactions" },
  ];

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
              Admin
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Statistics */}
        {stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Registered Users */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Total Registered Users
              </p>
              <p className="text-3xl font-bold text-[#190C24]">{stats.totalUsers}</p>
            </div>

            {/* Total Vendors */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Total Vendors
              </p>
              <p className="text-3xl font-bold text-[#FA4796]">{stats.totalVendors}</p>
            </div>

            {/* Total Customers */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Total Customers
              </p>
              <p className="text-3xl font-bold text-[#10B981]">{stats.totalCustomers}</p>
            </div>

            {/* Total Services */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Total Services
              </p>
              <p className="text-3xl font-bold text-[#10B981]">{stats.totalServices}</p>
            </div>

            {/* Pending Services */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Pending Services
              </p>
              <p className="text-3xl font-bold text-[#FA4796]">{stats.pendingServices}</p>
            </div>

            {/* Total Transactions */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Total Transactions
              </p>
              <p className="text-3xl font-bold text-[#F87171]">{stats.totalTransactions}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">Total Registered Users</p>
              <p className="text-3xl font-bold text-[#190C24]">Loading...</p>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">Total Vendors</p>
              <p className="text-3xl font-bold text-[#FA4796]">Loading...</p>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">Total Customers</p>
              <p className="text-3xl font-bold text-[#10B981]">Loading...</p>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">Total Services</p>
              <p className="text-3xl font-bold text-[#10B981]">Loading...</p>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">Pending Services</p>
              <p className="text-3xl font-bold text-[#FA4796]">Loading...</p>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm border border-black/10">
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">Total Transactions</p>
              <p className="text-3xl font-bold text-[#F87171]">Loading...</p>
            </div>
          </div>
        )}

        {/* Admin Navigation */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#190C24] mb-4">
            Admin Navigation
          </h3>
          <nav className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-4 py-2.5 text-[#190C24] bg-[#F9FAFB] hover:bg-[#EFF6FF] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}