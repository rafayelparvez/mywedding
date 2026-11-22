"use client";

import Image from "next/image";
import Link from "next/link";
import { Service } from "@/lib/services";

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div
      className="group rounded-2xl overflow-hidden border border-black/10 bg-white/95 backdrop-blur hover:border-[#D81B7E]/30 transition-colors"
    >
      {service.image ? (
        <Image
          src={service.image}
          alt={service.title}
          width={400}
          height={280}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div
          className="w-full h-64 bg-[#120A18] flex items-center justify-center text-white/50 text-sm"
        >
          {service.category}
        </div>
      )}

      <div className="p-5">
        <h3 className="font-semibold text-[13px] text-[#190C24] uppercase tracking-[0.1em] mb-1">
          {service.title}
        </h3>
        <p className="text-sm text-[#190C24]/60 line-clamp-3 mb-3">
          {service.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#D81B7E]">{service.price}</span>
          </div>

          <Link
            href={`/services/${service.category}`}
            className="text-xs font-medium text-[#FA4796] hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesGrid({
  services,
  error,
  loading,
}: {
  services: Service[];
  error?: string | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 py-12">
        <div className="col-span-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur p-8">
          <div className="animate-pulse h-96 bg-[#120A18] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || services.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 py-12">
        <div className="col-span-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur p-8">
          <p className="text-center text-[#190C24]/60">
            {services.length === 0
              ? "No services found matching your criteria."
              : "Failed to load services. Please try again."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((service) => (
        <Link
          key={service.id}
          href="/services"
          className="group"
        >
          <ServiceCard service={service} />
        </Link>
      ))}
    </div>
  );
}