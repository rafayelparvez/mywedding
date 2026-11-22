"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function VendorProfileSettingsPage() {
  // Initialize state from session
  const { data: sessionData, isPending } = useSession();

  // Use sessionData for user info, isPending for loading state
  const hasSession = !!sessionData;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string>("/images/avatar-default.png");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Wait for session to resolve, then redirect if not authenticated
  useEffect(() => {
    if (!isPending && !hasSession) {
      router.push("/login");
    }
  }, [isPending, hasSession, router]);

  // Fetch user profile data from session on mount
  useEffect(() => {
    if (isPending || !hasSession) return;

    // Set initial values from session user data
    setName(sessionData?.user?.name || "");
    setEmail(sessionData?.user?.email || "");
    setAvatar(sessionData?.user?.image || "/images/avatar-default.png");
  }, [isPending, hasSession]);

  // Update name
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  // Update email
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  // Update avatar
  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset input to allow re-selecting same file
    e.target.value = "";
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      const name = formData.get("name") as string;
      const email = formData.get("email") as string;

      // Validate required fields
      if (!name.trim()) {
        throw new Error("Name is required");
      }
      if (!email.trim()) {
        throw new Error("Email is required");
      }

      // Submit profile update to API
      const response = await fetch("/api/vendor/profile", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update profile");
      }

      setSuccess("Profile updated successfully!");

      // Reset form after 5 seconds
      const timer = setTimeout(() => {
        setSuccess(null);
        // Reset to initial values from session
        setName(hasSession ? sessionData?.user?.name || "" : "");
        setEmail(hasSession ? sessionData?.user?.email || "" : "");
        setAvatar(hasSession ? sessionData?.user?.image || "/images/avatar-default.png" : "/images/avatar-default.png");
      }, 5000);
      return () => clearTimeout(timer);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
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
          Profile Settings
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

        <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
          {/* Avatar Section */}
          <div className="mb-6">
            <label className="block text-sm text-[#190C24] mb-2">
              Avatar
            </label>
            <div className="relative">
              <Image
                src={avatar}
                alt="Avatar"
                width={120}
                height={120}
                className="rounded-full object-cover border-2 border-white"
              />
              <input
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/*"
              />
              <button
                className="w-full h-full rounded-full bg-white p-0 transition-colors"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-6 w-6 text-[#190C24]/60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.88 7.88l1.25 1.25a5.5 5.5 0 0 0 7.78 0l4.38-4.38a5.5 5.5 0 0 0 0-7.78z" />
                  <path d="M11.3 9a1 1 0 0 1 1.42 0l1.54 1.54a1 1 0 0 1-1.42 1.42l-1.54-1.54A1 1 0 0 1 11.3 9m3.47 2a1 1 0 0 0-1.42 0l-1.52 1.52a1 1 0 1 0 1.42 1.42l1.52-1.52a1 1 0 0 0 1.42-1.42m-3.47 2a1 1 0 0 1-1.42 0l-1.52-1.52a1 1 0 1 0 1.42 1.42l1.52 1.52a1 1 0 0 0 1.42-1.42m3.51-5.3a1 1 0 0 0-1.42 0L7.06 4.82a1 1 0 0 0-1.42 1.42l1.46 1.46a1 1 0 0 0 1.42-1.42L11.3 3.98m3.09 8.6a1 1 0 0 1-1.42 0L5.24 6.02a1 1 0 0 0-1.42 1.42l1.52 1.52a1 1 0 0 0 1.42-1.42L8.53 5.25m4.01 2.3a1 1 0 0 0 0 1.41l-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.42m2.59-7.78a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.42m7.75 0a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 1 0 1.41-1.41l-1.41-1.41a1 1 0 0 0 1.41-1.42m-7.75 6.6a1 1 0 0 1 1.42 0l1.52-1.52a1 1 0 0 1-1.42 1.42l-1.52 1.52a1 1 0 0 1-1.42-1.42l1.52 1.52a1 1 0 0 1 1.42-1.42m7.76 0a1 1 0 0 1-1.42 0l-1.52-1.52a1 1 0 1 0 1.42-1.42l1.52 1.52a1 1 0 0 1 1.42-1.42" />
                </svg>
                <span className="relative z-10 text-sm text-[#190C24]">
                  Change
                </span>
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <label className="block text-sm text-[#190C24] mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus:border-[#D81B7E]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#190C24] mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus-border-[#D81B7E]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-xl bg-[#D81B7E]/20 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}