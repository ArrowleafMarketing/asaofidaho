"use client";

import Image from "next/image";
import { useEffect, useReducer } from "react";

/**
 * The homepage hero: Beaver Builder's background slideshow on row
 * 601c4d99a732b. Config lifted verbatim from the layout JS —
 * `autoPlay: true, speed: 3000, transition: 'fade', transitionDuration: 1,
 * crop: true`, i.e. each photo holds for 3s then cross-fades over 1s, cropped
 * to cover the row.
 *
 * The row's height comes from a UABB spacer (node 601c4ea5bd485):
 * 500px desktop / 400px tablet / 200px phone, plus the module's own 20px
 * margins and the row's 20px padding — so the band measures 580 / 480 / 280px.
 */

const SLIDES = [
  {
    src: "/wordpress-assets/Boise_skyline-web.jpg",
    alt: "Boise skyline at dusk",
  },
  {
    src: "/wordpress-assets/construction-downtown-boise-web.jpg",
    alt: "Construction cranes in downtown Boise",
  },
  {
    src: "/wordpress-assets/construction-saw.jpg",
    alt: "A worker operating a concrete saw",
  },
] as const;

const HOLD_MS = 3000;
const FADE_MS = 1000;

export function HeroSlideshow() {
  const [index, next] = useReducer((i: number) => (i + 1) % SLIDES.length, 0);

  useEffect(() => {
    // Respect a reduced-motion preference by holding on the first photo.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const timer = window.setInterval(next, HOLD_MS);
    return () => window.clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden px-5 py-5">
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          priority={i === 0}
          className="object-cover transition-opacity ease-linear"
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}

      {/* Row overlay: rgba(0,92,163,0.15) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[rgba(0,92,163,0.15)]"
        aria-hidden="true"
      />

      {/* The spacer module (500/400/200px) plus its own 20px margins. */}
      <div className="relative mx-auto my-5 h-[500px] w-full max-w-(--container-row) max-[992px]:h-[400px] max-md:h-[200px]" />
    </section>
  );
}
