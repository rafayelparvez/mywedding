"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SpinnerIcon } from "@/components/auth/icons";
import { signOut, useSession } from "@/lib/auth-client";
import { ROLE_LABELS } from "@/lib/roles";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
];

const UserAvatar = ({
  image,
  initials,
  className = "h-9 w-9",
}: {
  image?: string | null;
  initials: string;
  className?: string;
}) => (
  <span
    aria-hidden="true"
    className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#D81B7E] to-[#B31668] text-xs font-semibold text-white ${className}`}
  >
    {image ? (
      <Image
        src={image}
        alt=""
        fill
        sizes="40px"
        unoptimized
        className="object-cover"
      />
    ) : (
      initials
    )}
  </span>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const displayName =
    session?.user.name?.trim() ||
    session?.user.email?.split("@")[0] ||
    "Account";
  const firstName = displayName.split(/\s+/)[0];
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  const roleLabel =
    session?.user.role === "vendor" || session?.user.role === "admin"
      ? ROLE_LABELS[session.user.role]
      : ROLE_LABELS.user;

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut();
      setIsMenuOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

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
          {isPending ? (
            <div
              aria-hidden="true"
              className="h-10 w-40 animate-pulse rounded-full bg-black/5"
            />
          ) : session ? (
            <>
              <div className="flex items-center gap-2.5 rounded-full border border-black/10 bg-white py-1 pl-1 pr-3 shadow-sm">
                <UserAvatar
                  image={session.user.image}
                  initials={initials}
                />
                <span className="flex flex-col leading-tight">
                  <span className="max-w-28 truncate text-sm font-semibold text-[#190C24]">
                    {firstName}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D81B7E]">
                    {roleLabel}
                  </span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#190C24]/70 transition hover:border-[#D81B7E]/30 hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? <SpinnerIcon className="h-3.5 w-3.5" /> : null}
                Sign out
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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

          <div className="mt-1 border-t border-black/5 px-3 pb-4 pt-3 sm:px-6">
            {isPending ? (
              <div
                aria-hidden="true"
                className="h-11 w-full animate-pulse rounded-2xl bg-black/5"
              />
            ) : session ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#FFF9FC] p-3">
                  <UserAvatar
                    image={session.user.image}
                    initials={initials}
                    className="h-11 w-11"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#190C24]">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-[#190C24]/55">
                      {session.user.email}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#D81B7E]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D81B7E]">
                    {roleLabel}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-medium text-[#190C24]/70 transition hover:border-[#D81B7E]/30 hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSigningOut ? (
                    <SpinnerIcon className="h-4 w-4" />
                  ) : null}
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
