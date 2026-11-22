"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Service } from "@/lib/services";
import { ServicesGrid } from "@/components/ServicesGrid";

type ServicesPageState = {
  services: Service[];
  error?: string;
  loading: boolean;
  searchQuery: string;
  selectedCategory: string;
  sortBy: "newest" | "price-low" | "price-high";
};

const initialState: ServicesPageState = {
  services: [],
  error: undefined,
  loading: true,
  searchQuery: "",
  selectedCategory: "all",
  sortBy: "newest",
};

const CATEGORY_OPTS = [
  { value: "all", label: "All Categories" },
  { value: "venue", label: "Venue" },
  { value: "photography", label: "Photography" },
  { value: "catering", label: "Catering" },
  { value: "florist", label: "Florist" },
  { value: "attire", label: "Attire" },
  { value: "officiant", label: "Officiant" },
] as const;

const SORT_OPTS = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
] as const;

export default function ServicesPage() {
  const pathname = usePathname();
  const [state, setState] = useState<ServicesPageState>(initialState);

  // Initialize state from URL query params after mount
  useEffect(() => {
    const url = new URL(pathname, window.location.origin);
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "all";
    const sort = url.searchParams.get("sort") || "newest";

    // Validate category
    const validCategory =
      CATEGORY_OPTS.some((c) => c.value === category) ? category : "all";
    // Validate sort
    const validSort =
      SORT_OPTS.some((s) => s.value === sort) ? (sort as "newest" | "price-low" | "price-high") : "newest";

    // Fetch services with URL params
    fetch(`/api/services?search=${encodeURIComponent(
      search
    )}&category=${validCategory}&sort=${validSort}&limit=50`, {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        const services: Service[] = data.services || [];
        setState({
          services,
          error: undefined,
          loading: false,
          searchQuery: search,
          selectedCategory: validCategory,
          sortBy: validSort,
        });
      })
      .catch((err) => {
        setState({
          services: [],
          error: err instanceof Error ? err.message : "Failed to load services",
          loading: true,
          searchQuery: search,
          selectedCategory: validCategory,
          sortBy: validSort as "newest" | "price-low" | "price-high",
        });
      });
  }, [pathname]);

  // Sync URL params when state changes (without reloading)
  useEffect(() => {
    const params = new URLSearchParams();
    if (state.searchQuery) params.set("search", state.searchQuery);
    if (state.selectedCategory !== "all") params.set("category", state.selectedCategory);
    if (state.sortBy !== "newest") params.set("sort", state.sortBy);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    // Use pushState to update URL without reloading
    window.history.pushState({ path: newUrl }, "", newUrl);
  }, [
    state.searchQuery,
    state.selectedCategory,
    state.sortBy,
    pathname,
  ]);

  if (state.loading) {
    return (
      <div className="min-h-80 flex items-center justify-center">
        <div className="animate-pulse rounded-2xl bg-[#120A18] w-64 h-24 mx-auto" />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="py-12 text-center text-[#190C24]/60">
        <p className="text-lg">{state.error}</p>
      </div>
    );
  }

  if (state.services.length === 0) {
    return (
      <div className="py-24 sm:py-32 text-center">
        <p className="text-[#190C24]/60 text-sm">
          No services found matching your criteria.
          {state.searchQuery && <span className="font-medium">try adjusting your search</span>}.
          {state.selectedCategory !== "all" && (
            <span className="font-medium ml-2">category filter</span>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1
            className="mb-6 text-3xl sm:text-4xl font-semibold text-[#190C24] text-center sm:text-left"
          >
            Wedding Services
          </h1>

          {/* Search and filters */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#190C24]/60"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 7a5 5 0 0 1 10 5v-2a5 5 0 0 1-10-5zm0 4a3 3 0 0 1 6-3v-2a3 3 0 0 1-6-3zm5.4-5.4a.7.7 0 0 0-1.06 0L20.679 9H15.5a.7.7 0 0 0-1.4 1.4l1.85 1.85a.7.7 0 0 0 .293.707v2a.7.7 0 0 0 1.4 0l1.85-1.85a.7.7 0 0 0 .707-.293zM5.5 15.5a.7.7 0 0 1 .707-.293l1.85-1.85a.7.7 0 0 1 .293.707v2a.7.7 0 0 1-1.4 0l-1.85-1.85a.7.7 0 0 1-.707-.293zM3.5 11.5a.7.7 0 0 0 .293.707l1.85 1.85a.7.7 0 0 1 .707.293h2a.7.7 0 0 1 0 1.4h-2a.7.7 0 0 1-.707-.293l-1.85 1.85a.7.7 0 0 1-.293-.707v-2a.7.7 0 0 1 1.4 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-14 pr-4 py-3 rounded-2xl bg-[#F9FAFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus-border-transparent"
                defaultValue={state.searchQuery}
                onChange={(e) => {
                  setState({
                    ...state,
                    searchQuery: e.target.value,
                    services: [],
                  });
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 max-w-2xl mx-auto">
            <div>
              <label className="block text-sm font-medium text-[#190C24] mb-2">Category</label>
              <select
                defaultValue={state.selectedCategory}
                onChange={(e) => {
                  setState({
                    ...state,
                    selectedCategory: e.target.value as "all" | "venue" | "photography" | "catering" | "florist" | "attire" | "officiant" || "all",
                    searchQuery: "",
                    services: [],
                  });
                }}
                className="w-full rounded-2xl bg-[#F9FAFB] py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus-border-transparent"
              >
                {CATEGORY_OPTS.map((opt) => {
                  const isSelected = opt.value === state.selectedCategory;
                  return (
                    <option
                      key={opt.value}
                      value={opt.value}
                      selected={isSelected}
                    >
                      {opt.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#190C24] mb-2">Sort by</label>
              <select
                defaultValue={state.sortBy}
                onChange={(e) => {
                  setState({
                    ...state,
                    sortBy: (e.target.value as "newest" | "price-low" | "price-high") || "newest",
                    services: [],
                  });
                }}
                className="w-full rounded-2xl bg-[#F9FAFB] py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus-border-transparent"
              >
                {SORT_OPTS.map((opt) => {
                  const isSelected = opt.value === state.sortBy;
                  return (
                    <option
                      key={opt.value}
                      value={opt.value}
                      selected={isSelected}
                    >
                      {opt.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <ServicesGrid
          services={state.services}
          error={state.error}
          loading={state.loading}
        />
      </div>
    </div>
  );
}