"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ServicesTableRow {
  id: string;
  title: string;
  category: string;
  price: string;
  approved: boolean;
  active: boolean;
  createdAt: Date;
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServicesTableRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all services from the API
  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch("/api/admin/services", {
          cache: "no-store",
        });
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to fetch services");
        }
        const data = await response.json();
        setServices(data.services);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err instanceof Error ? err.message : "Failed to load services");
      } finally {
        setIsLoading(false);
      }
    }

    loadServices();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <p className="text-lg text-[#190C24]">Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#D81B7E]/20 px-4 py-2 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors"
        >
          Retry
        </button>
      </div>
    );
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
              Manage Services
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#190C24]">
            Wedding Services
          </h2>
          <p className="text-[#190C24]/60 text-sm">
            Total: {services.length}
          </p>
        </div>

        {services.length === 0 ? (
          <div className="p-8 text-center text-[#190C24]/60">
            <p>No services found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left p-3 text-xs font-medium text-[#190C24] uppercase tracking-[0.1em]">
                    Title
                  </th>
                  <th className="text-left p-3 text-xs font-medium text-[#190C24] uppercase tracking-[0.1em]">
                    Category
                  </th>
                  <th className="text-left p-3 text-xs font-medium text-[#190C24] uppercase tracking-[0.1em]">
                    Price
                  </th>
                  <th className="text-left p-3 text-xs font-medium text-[#190C24] uppercase tracking-[0.1em]">
                    Status
                  </th>
                  <th className="text-left p-3 text-xs font-medium text-[#190C24] uppercase tracking-[0.1em]">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-black/10 hover:bg-[#F9FAFB]">
                    <td className="p-3">
                      <span className="font-medium text-[#190C24]">{service.title}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-xs font-medium text-[#190C24]/60 uppercase tracking-[0.05em]">
                        {service.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-[#190C24]">{service.price}</span>
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          service.approved && service.active
                            ? "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#10B981]/10 text-[#10B981]"
                            : service.approved
                              ? "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#F87171]/10 text-[#F87171]"
                              : "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#FA4796]/10 text-[#FA4796]"
                        }
                      >
                        {service.approved && service.active
                          ? "Approved & Active"
                          : service.approved
                            ? "Approved"
                            : "Pending"}
                      </span>
                    </td>
                    <td className="p-3">
                      <p className="text-xs text-[#190C24]/60">
                        {service.createdAt.toLocaleDateString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}