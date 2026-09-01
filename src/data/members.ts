/**
 * The 38 members from /find-a-member/, extracted from the live page in the
 * order they appear. Each was a PowerPack infobox; `lines` holds the body text
 * under the company name, one entry per `<br>`-separated line, keeping any
 * `tel:`/`mailto:` link that line carried.
 *
 * Data quirks from the source are preserved rather than silently corrected —
 * see the "Data issues worth cleaning up" section of the README.
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
    name: "Steel Connections Inc",
    href: "http://www.steelconnectionsinc.com",
    logo: "/wordpress-assets/steel.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "208-672-1014", href: "tel:208-672-1014" },
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
      { text: "971-377-3150", href: "tel:(971) 377-3150" },
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
      { text: "208-955-8180", href: "tel:(208) 955-8180" },
    ],
  },
  {
    column: 0,
    name: "Western Wallboard Systems, Inc.",
    logo: "/wordpress-assets/ww.png",
    logoWidth: 322,
    logoHeight: 322,
    lines: [
      { text: "Contact: Greg Herman" },
      { text: "208-409-8354", href: "tel:(208) 409-8354" },
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
      { text: "208-412-5467", href: "tel:208-412-5467" },
    ],
  },
  {
    column: 0,
    name: "Brant Freeman & Associates, LLC",
    logo: "/wordpress-assets/brant-freeman-logo.png",
    logoWidth: 322,
    logoHeight: 322,
    lines: [
      { text: "1-208-402-8091", href: "tel:1-208-402-8091" },
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
    name: "ISG Print & Embroidery",
    href: "https://isgprint.com/",
    logo: "/wordpress-assets/isg-logo_1.png",
    logoWidth: 400,
    logoHeight: 248,
    lines: [
      { text: "Contact: Emily Carpenter" },
      { text: "1-208-908-0107", href: "tel:1-208-908-0107" },
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
      { text: "208-501-5143", href: "tel:208-501-5143" },
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
      // Original href was "_wp_link_placeholder" — an unsaved WordPress link
      // that resolves to a 404. Dropped; the text is kept.
      { text: "Contact: Mike Royeton" },
      { text: "208-446-7372", href: "tel:208-446-7372" },
    ],
  },
  {
    column: 0,
    name: "Rocky Mountain Rebar",
    href: "https://www.rockymtnrebar.com/",
    logo: "/wordpress-assets/Logo-RMR.jpg",
    logoWidth: 1280,
    logoHeight: 792,
    lines: [
      { text: "Contact: Kelly Foster" },
      { text: "(208) 254-0676", href: "tel:(208) 254-0676" },
    ],
  },
  {
    column: 0,
    name: "Boise Demolition",
    href: "https://boisedemolition.com/",
    logo: "/wordpress-assets/rsw_1160.webp",
    logoWidth: 1160,
    logoHeight: 1536,
    lines: [
      { text: "Contact: Yadi Vega" },
      { text: "vega@boisedemolition.comtBoise Demolition", href: "mailto:vega@boisedemolition.com" },
    ],
  },
  {
    column: 1,
    name: "ConDoc",
    href: "https://www.condoc.com/",
    logo: "/wordpress-assets/condoc3.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "Contact: Shavonna Case" },
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
    name: "Idaho Construction Bonding",
    href: "http://www.icbcompany.com",
    logo: "/wordpress-assets/ICB-logo-vertical-01.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "Contact: Jenae Sexton" },
      { text: "208-921-4546", href: "tel:208-921-4546" },
      { text: "BREAK THE MOLD!" },
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
    name: "WAFED Insurance Group dba HD Insurance",
    href: "https://www.wafdinsurancegroup.com/",
    logo: "/wordpress-assets/wafd.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "Contact: Heidi Reeder" },
      { text: "208-344-6565", href: "tel:208-344-6565" },
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
    name: "Liberty Mutual Surety",
    href: "https://www.libertymutual.com/insurance-agent/idaho/idaho-falls-0240",
    logo: "/wordpress-assets/liberty.png",
    logoWidth: 272,
    logoHeight: 300,
    lines: [
      { text: "Contact: Craig Dunbar, MBA, AFSB" },
      { text: "208-386-0885", href: "tel:208-386-0885" },
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
    name: "Cloverdale Plumbing Company",
    href: "https://www.cloverdaleplumbing.com/",
    logo: "/wordpress-assets/cloverdale-logo.png",
    logoWidth: 322,
    logoHeight: 322,
    lines: [
      { text: "208-376-1901", href: "tel:(208) 376-1901" },
    ],
  },
  {
    column: 1,
    name: "Mountainland Supply",
    href: "https://www.mountainlandsupply.com/",
    logo: "/wordpress-assets/mountain-land.png",
    logoWidth: 322,
    logoHeight: 322,
    lines: [
      { text: "Contact: Rich Walz" },
      { text: "208-546-0201", href: "tel:208-546-0201" },
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
      { text: "208-550-6064", href: "tel:208-550-6064" },
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
      { text: "1-208-991-0567", href: "tel:1-208-991-0567" },
    ],
  },
  {
    column: 1,
    name: "LKL Associates, Inc.",
    href: "https://www.lklassociates.com/",
    logo: "/wordpress-assets/lkl.png",
    logoWidth: 300,
    logoHeight: 274,
    lines: [
      { text: "Contact: Beau Frampton" },
      { text: "1-208-494-1500", href: "tel:1-208-494-1500" },
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
    name: "Color Craft Painting",
    href: "https://www.colorcraftpaint.com/",
    logo: "/wordpress-assets/color-craft-logo.jpg",
    logoWidth: 205,
    logoHeight: 126,
    lines: [
      { text: "Contact: Jeff Barnes" },
      { text: "208-860-4685", href: "tel:208-860-4685" },
    ],
  },
  {
    column: 1,
    name: "PORTAPros",
    href: "https://www.portapros.com/",
    logo: "/wordpress-assets/porta-pros-logo.jpg",
    logoWidth: 230,
    logoHeight: 78,
    lines: [
      { text: "Contact: Taelor Preheim" },
      { text: "(208) 467-0089", href: "tel:(208) 467-0089" },
    ],
  },
];
