import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
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
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-black/10 bg-white hover:border-[#D81B7E]/30 hover:bg-[#D81B7E]/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
            >
              Home
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-black/10 bg-white hover:border-[#D81B7E]/30 hover:bg-[#D81B7E]/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
            >
              Profile
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#190C24]">Dashboard</h2>
          <p className="text-[#190C24]/60">
            Welcome to your dashboard. Navigation links are above.
          </p>
        </div>
      </div>
    </div>
  );
}