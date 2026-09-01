import Image from "next/image";

import type { Member } from "@/data/members";

/**
 * PowerPack Infobox, "layout-3" variant: logo on the left at a fixed 100px
 * width, text block to the right with 25px between them. Card is
 * rgba(71,184,255,0.29) with 20px of padding, and the text block is
 * left-aligned.
 *
 * Two behaviours of the original are worth spelling out, because both come
 * from the same broken markup — a `tel:` link nested inside the card-wide `<a>`:
 *
 *  1. The parser's adoption-agency algorithm clones the outer anchor at every
 *     nesting level, so a single card ends up with up to eight anchors and
 *     seven tab stops, and the card's padding ring is not actually clickable.
 *     Here one stretched overlay link covers the whole card instead: same
 *     click target the design intends, one tab stop, valid HTML.
 *  2. Any text after that nested link is reparented *out* of the anchor, so it
 *     renders in the body colour (#222222) while everything before it inherits
 *     the link blue (#1e73be). That colour split is visible on the live site,
 *     so it is reproduced here — see the `passedLink` flag below.
 */
export function MemberCard({ member }: { member: Member }) {
  // Text from the first nested link onward is reparented out of the card
  // anchor on the original, so it loses the link colour.
  const firstLink = member.lines.findIndex((line) => Boolean(line.href));
  const lastBlueIndex = firstLink === -1 ? member.lines.length : firstLink;

  return (
    <div className="relative flex flex-row flex-wrap items-start bg-asa-card p-5">
      {member.href && (
        <a
          href={member.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-0"
        >
          <span className="screen-reader-text">
            {member.name} — visit website
          </span>
        </a>
      )}

      <div className="pointer-events-none mr-[25px] shrink-0">
        <Image
          src={member.logo}
          alt={`${member.name} logo`}
          width={member.logoWidth}
          height={member.logoHeight}
          sizes="100px"
          className="h-auto w-[100px] max-w-full"
        />
      </div>

      <div className="flex-1 text-left">
        <p className="mb-0 text-[17px] leading-normal">
          <span className="pointer-events-none text-asa-link">
            {member.name}
          </span>

          {member.lines.map((line, index) => {
            const beforeLink = index <= lastBlueIndex;

            return (
              <span key={`${line.text}-${line.href ?? ""}`}>
                <br />
                {line.href ? (
                  <a
                    href={line.href}
                    className="relative z-[1] text-asa-link hover:text-black"
                  >
                    {line.text}
                  </a>
                ) : (
                  <span
                    className={`pointer-events-none ${
                      beforeLink ? "text-asa-link" : "text-asa-ink"
                    }`}
                  >
                    {line.text}
                  </span>
                )}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
