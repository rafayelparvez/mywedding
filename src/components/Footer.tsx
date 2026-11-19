import Image from "next/image";
import Link from "next/link";

const footerSections = [
  {
    title: "Plan",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Vendors", href: "/vendors" },
      { label: "Wedding Checklist", href: "/checklist" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "FAQs", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2h-2.5v2.8h2.5v7h3Z" />
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.2-1.7 0-2.5l1.1-4.5s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.7 1.4 1.7 1.7 0 2.9-2.2 2.9-4.8 0-2-1.3-3.4-3.6-3.4-2.7 0-4.3 2-4.3 4.1 0 .8.2 1.4.6 1.9.2.2.2.3.1.6l-.2.8c-.1.3-.3.4-.6.2-1.2-.5-1.8-1.8-1.8-3.2 0-2.6 2.2-5.5 6.5-5.5 3.4 0 5.8 2.4 5.8 5.2 0 3.4-1.9 6-4.8 6-1 0-1.9-.5-2.2-1.1l-.6 2.2c-.2.9-.8 1.9-1.2 2.5A9 9 0 1 0 12 3Z" />
    ),
  },
];

const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-[#120A18] text-white">
      {/* Gradient hairline */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-linear-to-r from-transparent via-[#D81B7E]/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 left-1/2 -z-10 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#D81B7E]/10 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label="MyWedding — Plan your wedding, your way"
              className="inline-flex max-w-full items-center rounded-md transition-opacity duration-300 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FA4796]"
            >
              <Image
                src="/images/MyWedding-Logo-dark.png"
                alt="MyWedding — Plan your wedding, your way"
                width={2172}
                height={724}
                className="h-10 w-auto max-w-full sm:h-12 lg:h-14"
              />
            </Link>

            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-white/65 sm:text-[15px]">
              Everything you need to plan a beautiful wedding — trusted vendors,
              stunning venues, and inspiration for every step of your journey.
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition duration-300 hover:border-[#FA4796]/60 hover:bg-[#D81B7E]/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FA4796] sm:h-10 sm:w-10"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                    >
                      {social.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <nav
              key={section.title}
              aria-label={`${section.title} links`}
              className="col-span-1 lg:col-span-2"
            >
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-xs">
                {section.title}
              </h2>
              <ul className="mt-3.5 space-y-2.5 sm:mt-4 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-[#FA4796] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FA4796]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-xs">
              Get in Touch
            </h2>
            <ul className="mt-3.5 space-y-2.5 text-sm text-white/65 sm:mt-4 sm:space-y-3">
              <li className="break-words">
                <a
                  href="mailto:hello@mywedding.com"
                  className="transition-colors hover:text-[#FA4796] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FA4796]"
                >
                  hello@mywedding.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="transition-colors hover:text-[#FA4796] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FA4796]"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="leading-relaxed">
                Monday – Friday
                <br />
                9:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:mt-12 sm:flex-row sm:gap-4 sm:text-left">
          <p className="text-[11px] text-white/50 sm:text-xs lg:text-sm">
            © {new Date().getFullYear()} MyWedding. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-white/50 sm:text-xs lg:text-sm">
            Made with
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5 text-[#FA4796]"
            >
              <path d="M12 21s-6.716-4.35-9.193-8.13C1.1 10.06 2.02 6.6 5.09 5.51a5.06 5.06 0 0 1 5.66 1.6L12 8.4l1.25-1.29a5.06 5.06 0 0 1 5.66-1.6c3.07 1.09 3.99 4.55 2.28 7.36C18.716 16.65 12 21 12 21Z" />
            </svg>
            for couples everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
