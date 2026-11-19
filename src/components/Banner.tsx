"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const backgrounds = ["/images/bg-1.avif", "/images/bg-2.png"];
const SLIDE_DURATION = 6000;

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % backgrounds.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-labelledby="banner-heading"
      className="relative isolate overflow-hidden bg-[#190C24]"
    >
      {/* Sliding background images */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {backgrounds.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-[1200ms] ease-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Readability overlay */}
        <div className="absolute inset-0 bg-[#0B0610]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0B0610]/80 via-[#0B0610]/20 to-[#0B0610]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,6,16,0.15)_0%,rgba(11,6,16,0.65)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#0B0610] to-transparent" />
        <div className="absolute -bottom-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-[#D81B7E]/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[480px] w-full max-w-5xl flex-col items-center justify-center px-5 py-16 text-center sm:min-h-[560px] sm:px-8 sm:py-24 lg:min-h-[620px] lg:py-28 xl:py-32">
        {/* Eyebrow */}
        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-center text-[9px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/90 backdrop-blur sm:px-4 sm:text-[10px] sm:tracking-[0.22em] lg:text-[11px]">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FA4796]"
          />
          Your Dream Wedding Starts Here
        </span>

        {/* Heading */}
        <h1
          id="banner-heading"
          className="mt-5 max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-white sm:mt-6 sm:text-4xl sm:leading-[1.12] md:text-5xl lg:text-6xl"
        >
          Your Love Story Deserves a{" "}
          <span className="bg-linear-to-r from-[#FA4796] via-[#F06AAE] to-[#FFB3D9] bg-clip-text text-transparent">
            Perfect Beginning.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/75 sm:mt-6 sm:max-w-2xl sm:text-base lg:text-lg">
          From finding the perfect venue to choosing your dream wedding vendors,
          plan every little detail of your special day — all in one place.
        </p>

        {/* Call to action */}
        <div className="mt-7 flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <Link
            href="/services"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-linear-to-r from-[#D81B7E] via-[#E93A92] to-[#FA4796] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#D81B7E]/30 transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FA4796] sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
          >
            Start Planning
          </Link>
          <Link
            href="/register"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/30 bg-linear-to-r from-white/20 via-white/10 to-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:border-white/50 hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
          >
            Explore Vendors
          </Link>
        </div>

        {/* Trust text */}
        <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-white/65 sm:mt-10 sm:text-sm">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-[#FA4796]"
          >
            <path d="M12 21s-6.716-4.35-9.193-8.13C1.1 10.06 2.02 6.6 5.09 5.51a5.06 5.06 0 0 1 5.66 1.6L12 8.4l1.25-1.29a5.06 5.06 0 0 1 5.66-1.6c3.07 1.09 3.99 4.55 2.28 7.36C18.716 16.65 12 21 12 21Z" />
          </svg>
          Every detail matters. Every moment is special.
        </p>
      </div>
    </section>
  );
};

export default Banner;
