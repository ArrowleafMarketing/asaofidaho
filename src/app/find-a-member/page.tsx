import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MemberCard } from "@/components/MemberCard";
import { members } from "@/data/members";

export const metadata: Metadata = {
  title: "Find a Member",
  description:
    "Browse the subcontractor, supplier and associate members of the American Subcontractors Association of Idaho.",
};

/**
 * Find a Member — a single Beaver Builder row (node 601db508c5cb6) whose
 * content is capped at 1200px and split into two 50% columns of PowerPack
 * infoboxes. There is no hero or page title on the original; the cards start
 * straight below the header.
 *
 * Card order within each column is preserved from the source page so the client
 * sees the list they curated.
 */

export default function FindAMemberPage() {
  const columns: [typeof members, typeof members] = [
    members.filter((member) => member.column === 0),
    members.filter((member) => member.column === 1),
  ];

  return (
    <>
      <Header variant="solid" />

      <main id="content" className="flex-1">
        <section className="p-5">
          {/* Float-based columns on the original — `items-start` keeps each
              column sized to its own content rather than stretching. */}
          <div className="mx-auto flex max-w-(--container-page) flex-wrap items-start">
            {columns.map((column, index) => (
              <div key={index} className="flex w-1/2 flex-col max-md:w-full">
                {column.map((member) => (
                  <div key={member.name + member.logo} className="m-5">
                    <MemberCard member={member} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
