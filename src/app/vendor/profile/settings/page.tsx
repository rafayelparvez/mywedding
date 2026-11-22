"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VendorProfileSettingsPage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("vendor@example.com");
  const [avatar, setAvatar] = useState<string>("/images/avatar-default.png");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // In real app, would upload and resize the avatar
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    window.alert("Profile updated successfully!");
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

        <form onSubmit={handleSave} className="max-w-xl space-y-6">
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
                  <path d="M11.3 9a1 1 0 0 1 1.42 0l1.54 1.54a1 1 0 0 1-1.42 1.42l-1.54-1.54A1 1 0 0 1 11.3 9m3.47 2a1 1 0 0 0-1.42 0l-1.52 1.52a1 1 0 1 0 1.42 1.42l1.52-1.52a1 1 0 0 0 1.42-1.42m-3.47 2a1 1 0 0 1-1.42 0l-1.52-1.52a1 1 0 1 0 1.42 1.42l1.52 1.52a1 1 0 0 0 1.42-1.42m3.51-5.3a1 1 0 0 0-1.42 0L7.06 4.82a1 1 0 0 0-1.42 1.42l1.46 1.46a1 1 0 0 0 1.42-1.42L11.3 3.98m3.09 8.6a1 1 0 0 1-1.42 0L5.24 6.02a1 1 0 0 0-1.42 1.42l1.52 1.52a1 1 0 0 0 1.42-1.42L8.53 5.25m4.01 2.3a1 1 0 0 0 0 1.41l-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.42m2.59-7.78a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.42m-7.76 0a1 1 0 0 1 0 1.41l1.41 1.41a1 1 0 1 0 1.41-1.41l-1.41-1.41a1 1 0 0 0-1.41-1.42m7.75 0a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 1 0 1.41-1.41l-1.41-1.41a1 1 0 0 0 1.41-1.42m-7.75 6.6a1 1 0 0 1 1.42 0l1.52-1.52a1 1 0 0 1-1.42 1.42l-1.52 1.52a1 1 0 0 1-1.42-1.42l1.52-1.52a1 1 0 0 1 1.42-1.42m7.76 0a1 1 0 0 1-1.42 0l-1.52-1.52a1 1 0 1 0 1.42-1.42l1.52 1.52a1 1 0 0 1 1.42-1.42l-1.52 1.52a1 1 0 0 1-1.42 1.42" />
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
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 placeholder-[#190C24]/60 focus:outline-none focus:ring-2 focus:ring-[#D81B7E] focus:border-[#D81B7E]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-[#D81B7E]/20 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}