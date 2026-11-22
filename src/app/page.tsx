"use client";

import Banner from "@/components/Banner";
import { useEffect, useState } from "react";
import { Service } from "@/lib/services";
import { ServicesGrid } from "@/components/ServicesGrid";

interface HomeState {
  services: Service[];
  error?: string;
  loading: boolean;
}

export default function Home() {
  const [state, setState] = useState<HomeState>({
    services: [],
    loading: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        setState({
          services: data.services || [],
          error: undefined,
          loading: false,
        });
      } catch (err) {
        setState({
          services: [],
          error: err instanceof Error ? err.message : "Failed to load services",
          loading: false,
        });
      }
    }

    load();
  }, []);

  return (
    <>
      <Banner />
      {/* Services section */}
      <section
        aria-labelledby="services-heading"
        className="py-24 sm:py-32 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="services-heading"
            className="mb-10 text-3xl sm:text-4xl font-semibold text-[#190C24] text-center sm:text-left"
          >
            Featured Wedding Services
          </h2>

          <ServicesGrid
            services={state.services}
            error={state.error}
            loading={state.loading}
          />
        </div>
      </section>

      {/* Why Choose MyWedding section */}
      <section
        aria-labelledby="choose-heading"
        className="py-24 sm:py-32 bg-[#120A18] relative overflow-x-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 h-[400px] w-[600px] bg-[#D81B7E]/10 blur-3xl rounded-full opacity-80"
          />
          <h2
            id="choose-heading"
            className="mb-8 text-3xl sm:text-4xl font-semibold text-white"
          >
            Why Choose MyWedding?
          </h2>
          <p className="mb-6 text-lg text-[#D81B7E]/80 sm:text-xl max-w-2xl">
            Your dream wedding deserves the best. We carefully vet every vendor to
            ensure quality, reliability, and an unforgettable experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-[#FA4796] font-medium text-sm uppercase tracking-[0.1em] mb-3">Vetted</p>
              <p className="text-white/60 text-sm">
                Every service is thoroughly reviewed and approved.
              </p>
            </div>
            <div>
              <p className="text-[#FA4796] font-medium text-sm uppercase tracking-[0.1em] mb-3">Verified</p>
              <p className="text-white/60 text-sm">
                Real vendors with verified portfolios and reviews.
              </p>
            </div>
            <div>
              <p className="text-[#FA4796] font-medium text-sm uppercase tracking-[0.1em] mb-3">Supported</p>
              <p className="text-white/60 text-sm">
                Dedicated support from planning to day-of coordination.
              </p>
            </div>
            <div>
              <p className="text-[#FA4796] font-medium text-sm uppercase tracking-[0.1em] mb-3">Flexible</p>
              <p className="text-white/60 text-sm">
                Plans tailored to every budget and style.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}