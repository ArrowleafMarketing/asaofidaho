import {
  ArrowRightIcon,
  FacebookIcon,
  LinkedInIcon,
  PhoneIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/components/Icons";
import { SwoopDivider } from "@/components/SwoopDivider";
import { site, socialLinks } from "@/lib/site";

const socialIcons = {
  Facebook: FacebookIcon,
  X: TwitterIcon,
  YouTube: YouTubeIcon,
  LinkedIn: LinkedInIcon,
} as const;

/**
 * The Beaver Builder theme-builder footer, shared by every page.
 *
 * Row 601d737e3953f: the capitol-and-flag photo, `background-attachment: fixed`
 * for parallax, positioned left center, under an rgba(43,122,217,0.86) wash,
 * with the white swoop shape layered on its top edge. Padding 115px / 40px,
 * content capped at 1100px, everything white.
 *
 * Unlike the page headings, this row's h3 gets no Oswald/uppercase override —
 * it inherits Roboto at the theme's 29px h3 size, bold and centred.
 *
 * Row 601e7844385fd: a #00428e bar holding the 14px centred copyright.
 */
export function Footer() {
  return (
    <footer>
      <div className="bg-parallax relative bg-[url('/wordpress-assets/capital-and-flag_iStock_000011479533Small.jpg')] bg-cover bg-[left_center] bg-no-repeat px-5 pt-[115px] pb-10">
        {/* Row overlay (::after on the original) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[rgba(43,122,217,0.86)]"
          aria-hidden="true"
        />

        <SwoopDivider />

        <div className="relative z-[2] mx-auto flex max-w-(--container-row) flex-col text-white">
          {/* heading 601d737e3954a — 30px bottom margin, 20px on phones */}
          <h3 className="mx-5 mt-5 mb-[30px] text-center font-bold text-white max-md:mb-5">
            {site.tagline}
          </h3>

          {/* rich-text 601d784d14385 */}
          <div className="bb-richtext mx-5 my-0">
            <p className="mb-0 text-center">
              <strong>American Subcontractors Association, Inc.</strong>
            </p>
          </div>

          {/* rich-text 605e184766151 */}
          <div className="bb-richtext mx-5 my-0">
            <p className="mb-0 text-center">
              <strong className="text-[18px]">
                {site.executiveDirector.name}
              </strong>
              <br />
              <em>{site.executiveDirector.title}</em>
            </p>
          </div>

          {/* uabb-button e9ns57hf4ucd — 35px bottom margin, 20px on phones */}
          <div className="mx-5 mt-0 mb-[35px] text-center max-md:mb-5">
            <a
              href={site.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Click Here"
              aria-label="Contact Us"
              className="btn-contact"
            >
              <span>Contact Us</span>
              <ArrowRightIcon className="ml-2 inline-block h-[1em] w-[1em] align-[-0.125em]" />
            </a>
          </div>

          {/*
            icon module 601d737e39549 — centred on desktop with a -20px top
            margin; left-aligned with a +20px top margin below 768px.
          */}
          <div className="mx-5 -mt-5 mb-0 text-center max-md:mt-5 max-md:text-left">
            <span className="inline-flex items-center">
              <PhoneIcon className="text-[16px] text-white transition-colors" />
              <span className="pl-[15px] text-left">{site.phone}</span>
            </span>
          </div>

          {/* pp-social-icons 601d790cf416d */}
          <div className="mx-5 mt-0 mb-5 flex justify-center">
            {socialLinks.map((social, index) => {
              const Icon = socialIcons[social.name];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer external"
                  aria-label={social.name}
                  className={`inline-flex h-[60px] w-[60px] items-center justify-center rounded-full bg-asa-blue-dark text-white transition-colors hover:bg-asa-social-hover hover:text-white ${
                    index === socialLinks.length - 1 ? "" : "mr-2.5"
                  }`}
                >
                  <Icon className="h-[30px] w-[30px]" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 601e7844385fd — copyright bar */}
      <div className="bg-asa-blue-dark px-5 pt-[15px]">
        <div className="mx-auto flex max-w-(--container-row) flex-col">
          {/*
            rich-text 601e7870c4742 — 5px top margin on desktop, 20px at 992px
            and 15px at 768px; the module's own 20px keeps the bar off the edge.
          */}
          <p className="mx-5 mt-[5px] mb-5 text-center text-[14px] leading-[1.3] text-white max-[992px]:mt-5 max-md:mt-[15px]">
            {site.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
