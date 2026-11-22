"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VendorMyServicesPage() {
  const [services, setServices] = useState<Array<{
    id: string;
    title: string;
    category: string;
    price: string;
    image: string;
    status: "active" | "pending" | "inactive";
  }>>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from API on mount
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/vendor/services?vendorId=vendor_123");

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Failed to fetch services");
        }

        const result = await response.json();
        // Transform API response to component format
        // Services from API have approved/active fields, we map to status
        const fetchedServices = result.services?.map((s: any) => ({
          id: s.id,
          title: s.title,
          category: s.category,
          price: s.price,
          image: s.image,
          // Map approved/active to status
          status: (!s.approved ? "inactive" : !s.active ? "pending" : "active"),
        })) || [];

        setServices(fetchedServices);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch services");
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  function getStatusClass(status: string) {
    if (status === "active") return "bg-green-100 text-green-800";
    if (status === "pending") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  }

  function getStatusText(status: string) {
    if (status === "active") return "Active";
    if (status === "pending") return "Pending";
    return "Inactive";
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
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold text-[#190C24] mb-6">
          My Services
        </h2>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading && services.length === 0 && (
          <div className="grid grid-cols-1 gap-6 py-12">
            <div className="col-span-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur p-8">
              <p className="text-center text-[#190C24]/60">Loading services...</p>
            </div>
          </div>
        )}

        {/* Services table */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 py-4 border-b border-black/10 font-medium text-xs text-[#190C24] uppercase tracking-wider">
              <div className="flex">
              <span className="w-24">Service</span>
              <span className="w-12 text-right">Price</span>
              <span className="w-12 text-center">Status</span>
              <span className="w-12 text-center">Actions</span>
              </div>
            </div>

            {services.length === 0 && !loading && (
              <div className="border-b border-black/10 py-4 flex">
                <div className="flex-1">No services found</div>
                <div className="w-12 text-right"></div>
                <div className="w-12 text-center"></div>
                <div className="w-12 text-center"></div>
              </div>
            )}

            {services.map((service) => (
              <div
                key={service.id}
                className="border-b border-black/10 py-4 flex"
              >
                <div className="flex-1">{service.title}</div>
                <div className="w-12 text-right">${service.price}</div>
                <div className="w-12 text-center">
                  <span className={getStatusClass(service.status)}>
                    {getStatusText(service.status)}
                  </span>
                </div>
                <div className="w-12 text-center">
                  <button className="text-xs text-[#D81B7E] hover:underline">Edit</button>
                  <button className="text-xs text-[#FA4796] hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}