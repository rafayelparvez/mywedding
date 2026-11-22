"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VendorAddServicePage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "venue",
    price: "",
    description: "",
  });

  const categories = [
    { value: "venue", label: "Venue" },
    { value: "photography", label: "Photography" },
    { value: "catering", label: "Catering" },
    { value: "florist", label: "Florist" },
    { value: "officiant", label: "Officiant" },
    { value: "attire", label: "Attire" },
  ];

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, title: e.target.value });
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFormData({ ...formData, category: e.target.value });
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, price: e.target.value });
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormData({ ...formData, description: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In real app, would submit to API
    window.alert("Service added successfully!");
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
            <span className="text-sm font-medium text-[#190C24]">Vendor</span>

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
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div>
            <label className="block text-sm text-[#190C24] mb-2">
              Service Title
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus:border-[#D81B7E]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#190C24] mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus:border-[#D81B7E]"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#190C24] mb-2">
                Price
              </label>
              <input
                name="price"
                type="text"
                value={formData.price}
                onChange={handlePriceChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus:border-[#D81B7E]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#190C24] mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleDescriptionChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus:border-[#D81B7E]"
              required
            >
            </textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-[#D81B7E]/20 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
}