"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function VendorSubscriptionPage() {
  // In real app, fetch from /api/vendor/subscription
  const subscription = {
    plan: "Basic",
    status: "active",
    price: "$29/month",
    features: [
      "Up to 5 services",
      "Pending booking requests",
      "Basic analytics",
    ],
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };

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
          Subscription
        </h2>

        {/* Current Subscription Card */}
        <div className="p-6 rounded-xl bg-white shadow-sm border border-black/10 mb-8">
          <h3 className="text-xl font-semibold text-[#190C24] mb-4">
            Current Subscription Plan
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Plan
              </p>
              <p className="text-3xl font-bold text-[#190C24]">{subscription.plan}</p>
            </div>

            <div>
              <p className="text-xs text-[#190C24]/60 uppercase tracking-wider">
                Status
              </p>
              <p className="text-3xl font-bold bg-green-100 text-green-800">
                Active
              </p>
            </div>
          </div>

          <p className="text-[#190C24]/60 mt-4">
            Billing every month
          </p>

          <div className="mt-6 pt-6 border-t border-black/10">
            <h4 className="text-semibold text-[#190C24] mb-3">Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Up to 5 services
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Pending booking requests
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Basic analytics
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Upgrade Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white shadow-sm border border-black/10">
            <h4 className="text-semibold text-[#D81B7E] mb-3">Basic</h4>
            <p className="text-3xl font-bold text-[#190C24]">$29/month</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Up to 5 services
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Pending booking requests
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Basic analytics
                </span>
              </li>
            </ul>
            <button
              className="w-full px-4 py-2 rounded-xl bg-[#D81B7E]/20 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors"
            >
              Upgrade
            </button>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-sm border border-black/10">
            <h4 className="text-semibold text-green-800 mb-3">Pro</h4>
            <p className="text-3xl font-bold text-[#190C24]">$79/month</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Up to 20 services
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Accepted booking requests
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Advanced analytics
                </span>
              </li>
            </ul>
            <button
              className="w-full px-4 py-2 rounded-xl bg-[#10B981]/20 text-sm font-medium text-[#10B981] hover:bg-[#10B981]/30 transition-colors"
            >
              Upgrade
            </button>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-sm border border-black/10">
            <h4 className="text-semibold text-[#FA4796] mb-3">Enterprise</h4>
            <p className="text-3xl font-bold text-[#190C24]">Custom</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-[#FA4796]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Unlimited services
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-[#FA4796]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Priority support
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-[#FA4796]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18c1.664 0 3-1.336 3-3v-1c0-1.664-1.336-3-3-3s-3 1.336-3 3v1c0 1.664 1.336 3 3 3m0-12C7.67 6 4 8.67 4 12s3.67 6 8 6s-3.67 6-8 6m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-3 text-sm text-[#190C24]/80">
                  Custom integrations
                </span>
              </li>
            </ul>
            <button
              className="w-full px-4 py-2 rounded-xl bg-[#FA4796]/20 text-sm font-medium text-[#FA4796] hover:bg-[#FA4796]/30 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}