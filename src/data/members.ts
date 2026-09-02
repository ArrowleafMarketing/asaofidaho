/**
 * The current members from /find-a-member/, reconciled against the roster
 * the client emailed on 2026-09-02 (29 companies, with contact email/phone
 * for each). That email is the source of truth for phone numbers; contact
 * emails are intentionally not published on the cards — see the README.
 *
 * Fourteen companies from the original 38-member scrape were dropped because
 * they're absent from the current list; five are new. Phone numbers were
 * only changed where the new list's digits actually differ from what was on
 * the card — most stayed the same, just reformatted from the source's
 * digits-only style.
 *
 * Two things flagged for the client rather than guessed at — see the
 * "Data issues worth cleaning up" section of the README:
 *  - Desert Sage Wall Systems' contact may have changed from Russell Freeman
 *    to someone named Frank (new email is frank@desertsagewallsystems.com).
 *  - Idaho Construction Bonding (the Executive Director's own company) and
 *    LKL Associates (an associate-board member's company) are both absent
 *    from the new list and were removed — possibly an oversight.
 */

export type MemberLine = { text: string; href?: string };
export type Member = {
  /** Column the card sits in on the original site (0 = left, 1 = right). */
  column: 0 | 1;
  name: string;
  href?: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  lines: MemberLine[];
};

export const members: Member[] = [
  {
    column: 0,
    name: "Summit Wall Systems, Inc.",
    href: "http://www.summitwall.com/",
    logo: "/wordpress-assets/summit-wall.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "208-366-1660", href: "tel:2083661660" },
    ],
  },
  {
    column: 0,
    name: "Precision Steel & Gypsum, Inc.",
    href: "https://www.google.com/search?client=firefox-b-d&q=Precision+Steel+%26+Gypsum%2C+Inc.",
    logo: "/wordpress-assets/psg.png",
    logoWidth: 750,
    logoHeight: 548,
    lines: [
      { text: "208-375-3166", href: "tel:2083753166" },
    ],
  },
  {
    column: 0,
    name: "Forte Construction Services, LLC",
    href: "http://www.fcsboise.com",
    logo: "/wordpress-assets/fcs.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "208-939-6762", href: "tel:2089396762" },
      { text: "Providing superior workmanship from the very start" },
    ],
  },
  {
    column: 0,
    name: "M-L Masonry, Inc",
    href: "http://mlmasonry.com",
    logo: "/wordpress-assets/ml-masonry.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "208-999-1108", href: "tel:2089991108" },
    ],
  },
  {
    column: 0,
    name: "Desert Sage Wall Systems, LLC.",
    href: "http://www.desertsagewallsystems.com",
    logo: "/wordpress-assets/dessert.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      // The client's new list gives frank@desertsagewallsystems.com as the
      // contact email — possibly a change from Russell Freeman. Left as-is
      // pending confirmation; see the file-level note above.
      { text: "Contact: Russell Freeman" },
      { text: "208-454-6461", href: "tel:208-454-6461" },
    ],
  },
  {
    column: 0,
    name: "Adam Roe Painting, Inc.",
    href: "https://arppainting.com/",
    logo: "/wordpress-assets/adam-roe.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "Contact: Adam Roe" },
      { text: "208-323-8443", href: "tel:208-323-8443" },
    ],
  },
  {
    column: 0,
    name: "D & A Glass Company, Inc.",
    href: "https://www.daglass.net",
    logo: "/wordpress-assets/d-and-a.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "208-888-0077", href: "tel:208-888-0077" },
    ],
  },
  {
    column: 0,
    name: "Sawtooth Caulking, Inc.",
    href: "https://www.sawtoothcaulking.com/",
    logo: "/wordpress-assets/sawtooth.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "Contact: Tyler Stoller" },
      { text: "503-864-3335", href: "tel:503-864-3335" },
    ],
  },
  {
    column: 0,
    name: "Markel Surety",
    href: "https://www.markelsurety.com/",
    logo: "/wordpress-assets/markell.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "Contact: Eric Englund" },
      // Updated from (971) 377-3150 per the client's 2026-09-02 list.
      { text: "503-703-1283", href: "tel:503-703-1283" },
    ],
  },
  {
    column: 0,
    name: "Associated Insurance Services",
    href: "https://www.associatedins.com/",
    logo: "/wordpress-assets/aid.png",
    logoWidth: 300,
    logoHeight: 300,
    lines: [
      { text: "Contact: Clint Paskewitz, CRA" },
      // Updated from 208-955-8180 per the client's 2026-09-02 list.
      { text: "208-336-7733", href: "tel:208-336-7733" },
    ],
  },
  {
    column: 0,
    name: "Franz Witte Landscape",
    href: "https://www.franzwitte.com/",
    logo: "/wordpress-assets/franz-white-logo.png",
    logoWidth: 322,
    logoHeight: 322,
    lines: [
      { text: "Contact: Seneca Hull" },
      // Updated from 208-412-5467 per the client's 2026-09-02 list.
      { text: "208-853-0808", href: "tel:208-853-0808" },
    ],
  },
  {
    column: 0,
    name: "Brant Freeman & Associates, LLC",
    logo: "/wordpress-assets/brant-freeman-logo.png",
    logoWidth: 322,
    logoHeight: 322,
    lines: [
      { text: "208-402-8091", href: "tel:208-402-8091" },
    ],
  },
  {
    column: 0,
    name: "Northwest Safety & Risk Services, Inc.",
    href: "https://www.northwestsafety.com/",
    logo: "/wordpress-assets/Northwest_Safety___Risk_Services.png",
    logoWidth: 293,
    logoHeight: 76,
    lines: [
      { text: "Contact: Aaron Miller" },
      { text: "208-465-0215", href: "tel:208-465-0215" },
    ],
  },
  {
    column: 0,
    name: "Merit Professional Coatings",
    href: "https://meritnow.com/",
    logo: "/wordpress-assets/merit-logo.png",
    logoWidth: 300,
    logoHeight: 109,
    lines: [
      // Updated from 208-501-5143 per the client's 2026-09-02 list.
      { text: "435-531-3191", href: "tel:435-531-3191" },
    ],
  },
  {
    column: 0,
    name: "Rodda Paint",
    href: "https://www.roddapaint.com/",
    logo: "/wordpress-assets/rodda.png",
    logoWidth: 257,
    logoHeight: 153,
    lines: [
      { text: "Contact: Mike Royeton" },
      // Updated from 208-446-7372 per the client's 2026-09-02 list.
      { text: "208-443-7372", href: "tel:208-443-7372" },
    ],
  },
  {
    column: 1,
    name: "Leighton Enterprises, Inc.",
    logo: "/wordpress-assets/leighton.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "Contact: Trace Leighton" },
      { text: "208-938-0038", href: "tel:2089380038" },
    ],
  },
  {
    column: 1,
    name: "Midwest D-Vision Solutions",
    href: "http://mwdsidaho.com",
    logo: "/wordpress-assets/mid-west.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "208-577-1002", href: "tel:2085771002" },
    ],
  },
  {
    column: 1,
    name: "Upson Company",
    href: "http://www.upsoncompany.com",
    logo: "/wordpress-assets/upson.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "208-989-9905", href: "tel:208-989-9905" },
    ],
  },
  {
    column: 1,
    name: "D & A Door & Specialties, Inc.",
    href: "https://www.daglass.net",
    logo: "/wordpress-assets/d-and-a.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "208-287-3676", href: "tel:208-287-3676" },
    ],
  },
  {
    column: 1,
    name: "Advanced Heating and Cooling",
    href: "https://advancedheatingandcooling.com/",
    logo: "/wordpress-assets/advanced.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "208-412-9968", href: "tel:208-412-9968" },
    ],
  },
  {
    column: 1,
    name: "DeBest Plumbing, Inc.",
    href: "https://www.debestplumbing.com/",
    logo: "/wordpress-assets/debest.jpg",
    logoWidth: 272,
    logoHeight: 148,
    lines: [
      { text: "208-322-4844", href: "tel:(208) 322-4844" },
      { text: "Serving the Treasure Valley since 1973, DeBest Plumbing is proud to be a part of building our community." },
    ],
  },
  {
    column: 1,
    name: "The Hartwell Corporation",
    href: "https://www.thehartwellcorp.com/",
    logo: "/wordpress-assets/thc-logo.png",
    logoWidth: 322,
    logoHeight: 322,
    lines: [
      { text: "Contact: Brian Tucker" },
      // Updated from 208-550-6064 per the client's 2026-09-02 list.
      { text: "208-459-1678", href: "tel:208-459-1678" },
    ],
  },
  {
    column: 1,
    name: "Roe Painting",
    href: "https://www.roepaint.com",
    logo: "/wordpress-assets/roe-paint.png",
    logoWidth: 434,
    logoHeight: 116,
    lines: [
      { text: "Contact: Andy Roe" },
      { text: "208-991-0567", href: "tel:208-991-0567" },
    ],
  },
  {
    column: 1,
    name: "Sunshine Landscape",
    href: "https://sunshinelandscape.net/",
    logo: "/wordpress-assets/sunshine-landscapes.jpg",
    logoWidth: 151,
    logoHeight: 135,
    lines: [
      { text: "Contact: Levi Duckett" },
      { text: "208-884-8036", href: "tel:208-884-8036" },
      { text: "Creating, constructing, and maintaining your commercial landscape through every changing season." },
    ],
  },
  {
    column: 1,
    name: "Blueprint Specialties",
    href: "https://bpsboise.com/",
    logo: "/wordpress-assets/blueprint-specialties-logo.png",
    logoWidth: 300,
    logoHeight: 119,
    lines: [
      { text: "208-377-0294", href: "tel:208-377-0294" },
    ],
  },
  {
    column: 1,
    name: "Fully Promoted Idaho",
    // No href: fpidaho.com's TLS certificate doesn't match the domain
    // (it's parked on Squarespace with someone else's cert) — flagged for
    // the client rather than linking somewhere broken.
    logo: "/wordpress-assets/fp.png",
    logoWidth: 322,
    logoHeight: 322,
    lines: [
      { text: "208-322-2222", href: "tel:208-322-2222" },
    ],
  },
  {
    column: 1,
    name: "H&E Advisors",
    href: "https://haeadvisors.cpa/",
    logo: "/wordpress-assets/he-advisors-logo.avif",
    logoWidth: 614,
    logoHeight: 312,
    lines: [
      { text: "208-990-3223", href: "tel:208-990-3223" },
    ],
  },
  {
    column: 1,
    name: "Sherwin-Williams",
    href: "https://www.sherwin-williams.com/",
    logo: "/wordpress-assets/sherwin-williams-logo.png",
    logoWidth: 262,
    logoHeight: 88,
    lines: [
      { text: "208-860-5335", href: "tel:208-860-5335" },
    ],
  },
  {
    column: 1,
    name: "Umpqua Bank",
    href: "https://www.umpquabank.com/",
    logo: "/wordpress-assets/umpqua-bank-logo.png",
    logoWidth: 500,
    logoHeight: 85,
    lines: [
      { text: "208-296-9350", href: "tel:208-296-9350" },
    ],
  },
];
