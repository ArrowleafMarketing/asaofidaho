import Image from "next/image";

import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { Roster } from "@/components/Roster";
import { associateBoard, sponsors, subcontractorBoard } from "@/data/leadership";
import { site } from "@/lib/site";

/**
 * Homepage — mirrors the Beaver Builder layout on page 17:
 *
 *  1. 601c4d99a732b  full-width background slideshow; the header overlays it
 *  2. 601c4fb452367  #2b7ad9 band: mission statement + JOIN TODAY
 *  3. 601c8438b8555  three columns — subcontractor board + annual sponsors /
 *                    associate board / contact form on a #32aaff panel
 *  4. (footer)       theme-builder CTA row + copyright bar
 *
 * The original ships two copies of row 3 — one `fl-visible-desktop`, one
 * `fl-visible-mobile` — carrying identical roster content. One responsive grid
 * replaces both.
 *
 * Spacing follows Beaver Builder's defaults: 20px of padding on the row
 * (`.fl-row-content-wrap`), none on the columns, and 20px of margin on every
 * module (`.fl-module-content`), with the per-node overrides layered on top.
 *
 * One caveat on those overrides. Several modules on the original carry large
 * negative top margins (-25px on the rosters, -35px on the contact form).
 * They are not design values: WordPress wraps rich-text content in a `<p>`, so
 * a `<table>` or `<div>` inside it gets hoisted out by the parser and leaves an
 * empty paragraph behind, whose ~25px bottom margin the negative value cancels.
 * This markup has no phantom paragraph, so each override is applied as its
 * *net* value instead — reproducing the spacing the visitor actually sees.
 *
 * Heading levels: the original emits four `<h1>` per row (eight on the page,
 * since the desktop and mobile rows both render). Only the first is an `<h1>`
 * here; the rest are `<h2>` styled to the identical 42px/31px, so the page
 * looks the same but has one top-level heading.
 */

export default function HomePage() {
  return (
    <>
      <Header variant="overlay" />

      <main id="content" className="flex-1">
        {/*
          The mission band (row 601c4fb452367) now sits bottom-anchored inside
          the hero rather than below it, so the blue reads as part of the hero
          area. The slideshow shows above it.
        */}
        <HeroSlideshow>
          <div className="bg-asa-blue px-5 pt-2.5">
            <div className="mx-auto flex max-w-(--container-wide) flex-col">
              {/* rich-text 601c4fdc6be98 — margin-bottom overridden to 0 */}
              <div className="mx-5 mt-5 mb-0">
                <p className="mb-0 text-center font-heading text-[22px] font-semibold uppercase text-white">
                  &#8220;Better Construction Through Fair
                  Construction&#8221;&#8212;The American Subcontractors
                  Association promotes and protects the rights and interests of
                  subcontractors and suppliers by building strength in community
                  through education, legislation, networking and professional
                  growth.
                </p>
              </div>

              {/*
                button p9lwen30fg1x. The original sets margin-top:-10px against
                a paragraph whose bottom margin is zeroed, so the button
                overlaps the last line of the mission statement. Using the
                standard 20px module margin here instead, per the client.
              */}
              <div className="m-5 text-center">
                <a
                  href={site.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bb-button btn-join"
                >
                  JOIN TODAY
                </a>
              </div>
            </div>
          </div>
        </HeroSlideshow>

        {/* ---- leadership / sponsors / contact (row 601c8438b8555) ---- */}
        {/*
          The original's columns are floats with no equal-height wrapper, so
          each is only as tall as its own content — `items-start` reproduces
          that, keeping the #32aaff panel sized to the form rather than
          stretching it to the tallest column.
        */}
        <section className="p-5">
          <div className="flex flex-wrap items-start">
            {/* Column 601c8438c26ff (33.33%) */}
            <div className="flex w-1/3 flex-col max-md:w-full">
              <h1 className="bb-heading m-5">Leadership</h1>

              <p className="mx-5 my-0 text-asa-muted">
                <em>
                  <b>
                    Subcontractor Board of Directors
                    <br />
                  </b>
                </em>
              </p>

              {/* roster 601c559532f8d — net 0 top margin (see note above) */}
              <div className="mx-5 mt-0 mb-0">
                <Roster members={subcontractorBoard} columns={2} />
              </div>

              <h2 className="bb-heading m-5 text-[42px] max-md:text-[31px]">
                Annual sponsors
              </h2>

              {/* nested col-group 8rcvzbntig6a > col c1fwpolsthik */}
              <div className="flex flex-col">
                {sponsors.map((sponsor) => (
                  <a
                    key={sponsor.logo}
                    href={sponsor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group m-5 block max-w-full"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={sponsor.width}
                      height={sponsor.height}
                      sizes="300px"
                      className="h-auto w-[300px] max-w-full transition-[filter] duration-300 ease-in-out group-hover:grayscale"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 601c8438c2706 (33.34%) */}
            <div className="flex w-1/3 flex-col max-md:w-full">
              <h2 className="bb-heading m-5 text-[42px] max-md:text-[31px]">
                Leadership
              </h2>

              <p className="mx-5 my-0 text-asa-muted">
                <em>
                  <b>Associate Board of Directors</b>
                </em>
              </p>

              {/* roster 601c52523b8d1 — net 0 top margin (see note above) */}
              <div className="mx-5 mt-0 mb-0">
                <Roster members={associateBoard} columns={1} />
              </div>
            </div>

            {/* Column 601c8438c270a (33.33%) — #32aaff panel */}
            <div className="flex w-1/3 flex-col bg-asa-blue-light max-md:w-full">
              <h2 className="bb-heading m-5 text-[42px] text-white max-md:text-[31px]">
                Contact
              </h2>

              {/* form 6022c03dd763a — net -10px top, 45px below 768px */}
              <div className="mx-5 -mt-2.5 mb-5 max-md:mt-[45px]">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
