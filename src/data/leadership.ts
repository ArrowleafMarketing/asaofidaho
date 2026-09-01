/**
 * The two leadership rosters from the homepage. On the WordPress site these are
 * TablePress tables (`tablepress-1` and `tablepress-2`) embedded in rich-text
 * modules; the subcontractor board is laid out two-up and the associate board
 * one-up. Names are bold, the line underneath is a title or a company.
 *
 * Order is preserved exactly as it reads on the live site.
 */

export type BoardMember = {
  name: string;
  /** Office held, or the member's company. */
  role: string;
};

/** tablepress-1 — rendered in two columns, filling left-to-right by row. */
export const subcontractorBoard: BoardMember[] = [
  { name: "Scott Tidwell", role: "President" },
  { name: "Adam Roe", role: "Vice President" },
  { name: "Darcy Neidigh", role: "DeBest Plumbing, Inc." },
  { name: "Denise Alter", role: "D & A Glass Company, Inc." },
  { name: "Chris Lombardo", role: "Forte Construction Services, Inc." },
  { name: "Nathan Miller", role: "M-L Masonry, Inc." },
  { name: "Brian Whipple", role: "Summit Wall Systems, Inc." },
  { name: "Greg Eveland", role: "LKL Associates" },
  { name: "Tyler Stoller", role: "Sawtooth Caulking, Inc." },
  { name: "Richard Stokes", role: "Precision Steel & Gypsum, Inc." },
  { name: "Brie Ghinazzi", role: "Merit Professional Coatings" },
  { name: "Trace Leighton", role: "Leighton Enterprises, inc." },
  { name: "Russell Freeman", role: "Desert Wall Systems" },
];

/** tablepress-2 — a single column. */
export const associateBoard: BoardMember[] = [
  { name: "Jenae Sexton", role: "Idaho Construction Bonding, LLC" },
  { name: "Eric Englund", role: "Markel Surety" },
];

export type Sponsor = {
  name: string;
  href: string;
  logo: string;
  width: number;
  height: number;
};

/**
 * Annual sponsors, as shown in the desktop layout (nodes 961mx8ljfzqr and
 * q8f02dlsgcua). Each logo renders at a 300px width and desaturates on hover.
 *
 * Note for the client: the live site's separate mobile-only row was never
 * updated alongside the desktop one, so phones still show a 2021 Graphic Zen
 * logo in place of the 2025 ISG artwork. This rebuild uses the current desktop
 * pair at every width rather than carrying that discrepancy forward.
 */
export const sponsors: Sponsor[] = [
  {
    name: "ISG Print & Embroidery",
    href: "https://isgprint.com/",
    logo: "/wordpress-assets/isg-logo.png",
    width: 1201,
    height: 746,
  },
  {
    name: "ISG",
    href: "https://isgprint.com/",
    logo: "/wordpress-assets/Asset-12x-1.png",
    width: 2621,
    height: 522,
  },
];
