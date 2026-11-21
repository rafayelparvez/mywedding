import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
  size?: "md" | "lg";
};

const highlights = [
  "Trusted vendors and stunning venues",
  "Checklists and inspiration in one place",
  "Plan together, from first idea to the big day",
];

const AuthShell = ({
  eyebrow,
  title,
  description,
  children,
  footer,
  size = "md",
}: AuthShellProps) => {
  return (
    <main className="flex flex-1 bg-[#FFF9FC]">
      <aside className="relative hidden w-[44%] shrink-0 overflow-hidden bg-[#190C24] lg:block xl:w-[48%]">
        <Image
          src="/images/bg-1.avif"
          alt=""
          fill
          priority
          sizes="48vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0B0610]/85 via-[#190C24]/75 to-[#190C24]" />
        <div className="absolute -bottom-40 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-[#D81B7E]/20 blur-3xl" />
        <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-white/15 to-transparent" />

        <div className="relative flex h-full flex-col justify-between gap-12 p-10 xl:p-14">
          <Link
            href="/"
            aria-label="MyWedding — Plan your wedding, your way"
            className="inline-flex w-fit items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FA4796]"
          >
            <Image
              src="/images/MyWedding-Logo-dark.png"
              alt="MyWedding — Plan your wedding, your way"
              width={2172}
              height={724}
              priority
              className="h-11 w-auto xl:h-12"
            />
          </Link>

          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#FA4796]"
              />
              Plan your wedding, your way
            </span>
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.12] tracking-tight text-white xl:text-5xl">
              Every detail,
              <span className="block bg-linear-to-r from-[#FA4796] via-[#F06AAE] to-[#FFB3D9] bg-clip-text text-transparent">
                all in one place.
              </span>
            </h2>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-white/70 xl:text-base">
              From the first spark of inspiration to the final dance, MyWedding
              helps you bring your day together beautifully.
            </p>

            <ul className="mt-8 space-y-3.5">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm text-white/80"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D81B7E]/25 text-[#FA4796]"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                    >
                      <path d="m4 10.5 4 4 8-9" />
                    </svg>
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs leading-relaxed text-white/45">
            Made with love for couples and the vendors who make it happen.
          </p>
        </div>
      </aside>

      <section className="flex flex-1 items-start justify-center px-4 py-8 sm:px-6 sm:py-12 lg:items-center lg:px-10 lg:py-16">
        <div
          className={`w-full ${size === "lg" ? "max-w-xl" : "max-w-md"}`}
        >
          <Link
            href="/"
            aria-label="MyWedding — Plan your wedding, your way"
            className="mb-6 inline-flex items-center rounded-md lg:hidden"
          >
            <Image
              src="/images/MyWedding Logo.png"
              alt="MyWedding — Plan your wedding, your way"
              width={2048}
              height={768}
              priority
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_28px_80px_-40px_rgba(25,12,36,0.45)] sm:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D81B7E]">
              {eyebrow}
            </span>
            <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-[#190C24] sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-[#190C24]/60">
              {description}
            </p>

            <div className="mt-6">{children}</div>
          </div>

          <div className="mt-5 text-center text-sm text-[#190C24]/60">
            {footer}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthShell;
