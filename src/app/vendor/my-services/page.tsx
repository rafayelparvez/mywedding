"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function VendorMyServicesPage() {
  // In real app, fetch from /api/vendor/services
  const services = [
    {
      id: "s1",
      title: "Elegant Garden Venue",
      category: "venue",
      price: "$5,500",
      image: "/images/placeholder-venue.jpg",
      status: "active",
    },
    {
      id: "s2",
      title: "Classic Photography",
      category: "photography",
      price: "$2,800",
      image: "/images/placeholder-photo.jpg",
      status: "active",
    },
    {
      id: "s3",
      title: "Gourmet Catering",
      category: "catering",
      price: "$8,200",
      image: "/images/placeholder-catering.jpg",
      status: "pending",
    },
    {
      id: "s4",
      title: "Seasonal Florist",
      category: "florist",
      price: "$1,800",
      image: "/images/placeholder-florist.jpg",
      status: "active",
    },
  ];

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

            {/* Service 1 */}
            <div className="border-b border-black/10 py-4 flex">
              <div className="flex-1">{services[0].title}</div>
              <div className="w-12 text-right">${services[0].price}</div>
              <div className="w-12 text-center">
                <span className={getStatusClass(services[0].status)}>
                  {getStatusText(services[0].status)}
                </span>
              </div>
              <div className="w-12 text-center">
                <button className="text-xs text-[#D81B7E] hover:underline">Edit</button>
                <button className="text-xs text-[#FA4796] hover:underline">Delete</button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="border-b border-black/10 py-4 flex">
              <div className="flex-1">{services[1].title}</div>
              <div className="w-12 text-right">${services[1].price}</div>
              <div className="w-12 text-center">
                <span className={getStatusClass(services[1].status)}>
                  {getStatusText(services[1].status)}
                </span>
              </div>
              <div className="w-12 text-center">
                <button className="text-xs text-[#D81B7E] hover:underline">Edit</button>
                <button className="text-xs text-[#FA4796] hover:underline">Delete</button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="border-b border-black/10 py-4 flex">
              <div className="flex-1">{services[2].title}</div>
              <div className="w-12 text-right">${services[2].price}</div>
              <div className="w-12 text-center">
                <span className={getStatusClass(services[2].status)}>
                  {getStatusText(services[2].status)}
                </span>
              </div>
              <div className="w-12 text-center">
                <button className="text-xs text-[#D81B7E] hover:underline">Edit</button>
                <button className="text-xs text-[#FA4796] hover:underline">Delete</button>
              </div>
            </div>

            {/* Service 4 */}
            <div className="border-b border-black/10 py-4 flex">
              <div className="flex-1">{services[3].title}</div>
              <div className="w-12 text-right">${services[3].price}</div>
              <div className="w-12 text-center">
                <span className={getStatusClass(services[3].status)}>
                  {getStatusText(services[3].status)}
                </span>
              </div>
              <div className="w-12 text-center">
                <button className="text-xs text-[#D81B7E] hover:underline">Edit</button>
                <button className="text-xs text-[#FA4796] hover:underline">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}