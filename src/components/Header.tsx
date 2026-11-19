import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
];

const Header = () => {
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

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-0.5 sm:gap-1.5 lg:gap-3"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative whitespace-nowrap rounded-md px-1.5 py-2 text-[11px] font-medium text-[#190C24] transition-colors hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] sm:px-3 sm:text-sm lg:px-4 lg:text-[15px]"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-1.5 bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-[#D81B7E] transition-transform duration-200 group-hover:scale-x-100 sm:inset-x-3 lg:inset-x-4"
              />
            </Link>
          ))}
        </nav>

        {/* Auth actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#190C24] px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#2A1739] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#190C24] sm:px-4 sm:py-2 sm:text-sm lg:px-6 lg:py-2.5 lg:text-[15px]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#D81B7E] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-[#D81B7E]/25 transition-colors hover:bg-[#B31668] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] sm:px-5 sm:py-2 sm:text-sm lg:px-7 lg:py-2.5 lg:text-[15px]"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
