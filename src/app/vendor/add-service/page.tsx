"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VendorAddServicePage() {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "venue",
    price: "",
    description: "",
    location: "",
    vendorId: "",
    vendorName: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const categories = [
    { value: "venue", label: "Venue" },
    { value: "photography", label: "Photography" },
    { value: "catering", label: "Catering" },
    { value: "florist", label: "Florist" },
    { value: "officiant", label: "Officiant" },
    { value: "attire", label: "Attire" },
  ];

  // Image state: stores data URLs of selected images
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, title: e.target.value });
  }

  function handleLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, location: e.target.value });
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

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImages((prev) => {
        // Avoid duplicates
        if (prev.some((u) => u === e.target?.result as string)) return prev;
        return [...prev, e.target?.result as string];
      });
    };
    reader.readAsDataURL(files[0]);
    // Reset input to allow re-selecting same file
    e.target.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const title = formData.title.trim();
      const category = formData.category;
      const description = formData.description.trim();
      const price = formData.price.trim();

      // Validate required fields
      if (!title) {
        throw new Error("Service title is required");
      }
      if (!category) {
        throw new Error("Category is required");
      }
      if (!price) {
        throw new Error("Price is required");
      }
      if (selectedImages.length === 0) {
        throw new Error("At least one service image is required");
      }
      if (!formData.vendorId) {
        throw new Error("Vendor ID is required");
      }

      // Build FormData for API submission
      const form = new FormData();
      form.append("title", title);
      form.append("category", category);
      form.append("description", description);
      form.append("price", price);
      form.append("location", formData.location);

      // Append each selected image as a string data URL
      selectedImages.forEach((img) => {
        form.append("images", img);
      });

      // Append vendor info
      form.append("vendorId", formData.vendorId);
      if (formData.vendorName) {
        form.append("vendorName", formData.vendorName);
      }

      // Submit to API
      const response = await fetch("/api/vendor/services", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create service");
      }

      setSuccess("Service submitted successfully! It's pending approval.");
      setFormData({
        title: "",
        category: "venue",
        price: "",
        description: "",
        location: "",
        vendorId: "",
        vendorName: "",
      });
      setSelectedImages([]);

      // Reset success after 5 seconds
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    } catch (err: any) {
      setError(err.message || "Failed to submit service");
    } finally {
      setLoading(false);
    }
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
              onClick={() => window.location.href = "/"}
              className="ml-4 text-sm text-[#D81B7E] hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold text-[#190C24] mb-6">
          Add New Service
        </h2>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800">
            <p className="text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div>
            <label className="block text-sm text-[#190C24] mb-2">
              Service Name
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E]"
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
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E]"
                required
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
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#190C24] mb-2">
              Location
            </label>
            <input
              name="location"
              type="text"
              value={formData.location}
              onChange={handleLocationChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E]"
              required
            />
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
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E]"
              required
            >
            </textarea>
          </div>

          {/* Service Images Section */}
          <div>
            <label className="block text-sm text-[#190C24] mb-2">
              Service Images
            </label>
            <p className="text-xs text-[#190C24]/60 mb-2">
              Multiple images supported. Maximum 3 images recommended for free vendors.
            </p>

            {/* Image previews */}
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {selectedImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-black/10 bg-white/95 p-2 relative"
                  >
                    <Image
                      src={img}
                      alt={`Service image ${idx + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-xs text-[#D81B7E] hover:underline"
                      onClick={() => {
                        setSelectedImages((prev) =>
                          prev.filter((_, i) => i !== idx)
                        );
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File upload button */}
            <div>
              <input
                type="file"
                name="images"
                onChange={handleImageSelect}
                className="hidden"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                className="w-full px-4 py-3 rounded-xl bg-[#D81B7E]/20 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
              >
                Upload Service Images
              </button>
            </div>
          </div>

          {/* Hidden vendor ID - in real app, this would come from the session */}
          <input
            type="hidden"
            name="vendorId"
            value=""
            className="hidden"
          />

          {/* Hidden vendor name */}
          <input
            type="hidden"
            name="vendorName"
            value=""
            className="hidden"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-xl bg-[#D81B7E]/20 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
}