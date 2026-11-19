"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6 lg:h-20 lg:gap-8 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="MyWedding — Plan your wedding, your way"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D81B7E]"
        >
          <Image
            src="/images/MyWedding Logo.png"
            alt="MyWedding — Plan your wedding, your way"
            width={2048}
            height={768}
            priority
            className="h-8 w-auto sm:h-11 lg:h-14"
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1.5 md:flex lg:gap-3"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-[#190C24] transition-colors hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] lg:px-4 lg:text-[15px]"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-[#D81B7E] transition-transform duration-200 group-hover:scale-x-100 lg:inset-x-4"
              />
            </Link>
          ))}
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link
            href="/login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-linear-to-r from-[#190C24] via-[#4A1239] to-[#B31668] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#190C24] lg:px-6 lg:py-2.5 lg:text-[15px]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-linear-to-r from-[#D81B7E] via-[#E93A92] to-[#FA4796] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-[#D81B7E]/25 transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] lg:px-7 lg:py-2.5 lg:text-[15px]"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#190C24] transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-5 w-5"
          >
            {isMenuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-menu"
        inert={!isMenuOpen}
        className={`absolute inset-x-0 top-full grid overflow-hidden border-b border-black/10 bg-white shadow-lg transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 px-3 pb-1 pt-2 sm:px-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#190C24] transition-colors hover:bg-[#D81B7E]/5 hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-1 flex items-center gap-2 border-t border-black/5 px-3 pb-4 pt-3 sm:px-6">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-linear-to-r from-[#190C24] via-[#4A1239] to-[#B31668] px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#190C24]"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-linear-to-r from-[#D81B7E] via-[#E93A92] to-[#FA4796] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#D81B7E]/25 transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
