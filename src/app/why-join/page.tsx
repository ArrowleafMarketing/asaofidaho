import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Why Join",
  description:
    "Member benefits of the American Subcontractors Association: members-only resources, government advocacy, events and education, industry news and the ASAdvantage program.",
};

/**
 * Why Join — two Beaver Builder rows on page 24:
 *
 *  1. 601c83895d62d  an empty spacer row (two 50% columns, no modules) that
 *                    provides the whitespace under the header
 *  2. 601c83bf3bf31  a 1100px fixed-width row holding one rich-text module
 *
 * Copy is verbatim, including its original punctuation and the "bang-for-you-buck"
 * typo. The section headings are `<p align="center"><strong><u>…` on the
 * original; they are promoted to real headings here and styled to render
 * identically (body size, bold, underlined, centred).
 */

const sectionHeading =
  "mt-0 mb-6 text-center text-[17px] leading-normal font-bold underline";

export default function WhyJoinPage() {
  return (
    <>
      <Header variant="solid" />

      <main id="content" className="flex-1">
        {/* Spacer row 601c83895d62d — two empty 50% columns */}
        <div className="p-5">
          <div className="mx-auto max-w-(--container-page)">
            <div className="flex flex-wrap">
              <div className="w-1/2 max-md:w-full" />
              <div className="w-1/2 max-md:w-full" />
            </div>
          </div>
        </div>

        {/* Content row 601c83bf3bf31 — fixed 1100px */}
        <div className="p-5">
          <div className="mx-auto max-w-(--container-row)">
            <div className="flex flex-col">
              <div className="bb-richtext m-5">
                <h1 className="mb-6 text-center text-[17px] leading-normal font-bold">
                  The American Subcontractors Association exists for its
                  members, and strives to offer them the best in Member
                  Benefits. Learn more about what ASA has to offer your
                  business, and see how membership with ASA is the smart move
                  towards a successful subcontracting enterprise.
                </h1>

                <p className="text-center font-bold underline">
                  <a
                    href="https://americansubcontractorsassociationnationalasa.growthzoneapp.com/ap/CloudFile/Download/nLv3VDMr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click Here to Learn More about the ASAdvantage Benefits
                    Available to ASA Members!
                  </a>
                </p>

                {/* Empty centred paragraph the original carries before the rule. */}
                <p className="text-center">&nbsp;</p>

                <hr className="my-10 h-px border-0 bg-black/10" />

                <h2 className={sectionHeading}>Members Only Resources</h2>

                <p>
                  ASA is YOUR go-to solution for educational resources.
                  On-demand videos, manuals, technical papers, and more are
                  provided to ASA members to assist with hundreds of issues from
                  the subcontractor/supplier perspective. Our robust library of
                  downloadable FREE members-only resources is easily accessible
                  to all ASA members.
                </p>

                <p>ASA&#8217;s free downloadable resources include:</p>

                <ul className="mb-6 list-disc pl-10">
                  <li>Model Contract Language</li>
                  <li>Prime and Subcontract Bidding Support</li>
                  <li>Project Management</li>
                  <li>Support for Working with OSHA</li>
                  <li>Tax and Regulatory Resources</li>
                  <li>&#8230; and much, MUCH MORE!</li>
                </ul>

                <p>
                  ASA members can also take advantage of our ASAdvantage
                  program, an incredible saving to members that give you the
                  best bang-for-you-buck for your ASA membership. ASAdvantage
                  includes deals and discounts from our sponsors that can save
                  you on everything from laptops to tires.
                </p>

                <h2 className={sectionHeading}>Government Advocacy</h2>

                <p>
                  Construction generates billions of dollars in revenues every
                  year &#8230; and government generates countless regulations
                  and legislation that complicate the business of construction.
                  ASA is YOUR voice in Washington and your statehouses.
                  Legislators and decision-makers hear ASA on issues that affect
                  business conditions for all subcontractors and suppliers.
                </p>

                <h2 className={sectionHeading}>Events and Education</h2>

                <p>
                  ASA members meet annually for our national
                  convention,&nbsp;
                  <a
                    href="http://www.subexcel.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SUBExcel
                  </a>
                  . SUBExcel is an incredible opportunity to not only network but
                  participate in exceptional in-person education to further your
                  business. In addition, ASA offers monthly educational webinars
                  to provide ongoing educational opportunities on a wide variety
                  of topics that are built to help you succeed.
                </p>

                <h2 className={sectionHeading}>News You Can Use</h2>

                <p>
                  ASA members receive a weekly e-news bulletin, ASAToday,
                  covering the latest news from Washington and the construction
                  industry to keep you in the know. Members also receive
                  ASA&#8217;s monthly digital educational journal, The
                  Contractor&#8217;s Compass, which delves deeper into
                  construction issues that directly impact your business. You
                  get an advantage over your competitors who don&#8217;t have
                  ASA on their side!
                </p>

                <h2 className={sectionHeading}>Strength In Numbers</h2>

                <p>
                  ASA&#8217;s powerful voice in the construction industry for
                  over 50 years has improved business conditions for
                  subcontractors and suppliers. ASA fights the big battles FOR
                  YOU on issues such as prompt payment, retainage, standard
                  contract language, bid shopping, insurance and more.
                </p>

                {/* Empty paragraph the original carries before this heading. */}
                <p>&nbsp;</p>

                <h2 className={sectionHeading}>A Staff That Works For You</h2>

                <p className="mb-0">
                  ASA staff members are knowledgeable professionals experienced
                  in the construction industry. We understand the needs of
                  subcontractors and suppliers. Highly accessible and driven to
                  serve our members, we will help you to find the answers you
                  need to successfully run your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
