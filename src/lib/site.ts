/**
 * Site-wide constants mirrored from the original WordPress install.
 * Keeping them in one place means the client can hand you a new phone number
 * or menu item and there is exactly one file to touch.
 */

export const site = {
  name: "ASA of Idaho",
  legalName: "American Subcontractors Association of Idaho",
  tagline: "Better Construction Through Fair Construction.",
  url: "https://asaofidaho.com",
  logo: {
    src: "/wordpress-assets/company-logo.png",
    width: 606,
    height: 171,
    alt: "ASA of Idaho",
  },
  phone: "907-978-8812",
  /**
   * Public contact address. Used by the footer's CONTACT US button and, unless
   * CONTACT_TO_EMAIL overrides it, as the destination for contact-form
   * submissions.
   */
  email: "alex@denaliexecservices.com",
  executiveDirector: {
    name: "Alex",
    title: "Executive Director",
    company: "Denali Executive Services, LLC",
  },
  /** External membership signup, opened in a new tab from the nav and hero. */
  joinUrl: "https://members.asaonline.com/join-idaho?id=M4rkZ3L5",
  copyright:
    "Copyright © 2024 - American Subcontractors Association of Idaho. All rights reserved.",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** External destinations open in a new tab, as they do on the live site. */
  external?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Find a Member", href: "/find-a-member" },
  { label: "Join Today", href: site.joinUrl, external: true },
  { label: "Why Join", href: "/why-join" },
  {
    label: "Advocacy",
    href: "https://docs.google.com/document/d/1r3JfKPS-Gfucy0vXSQf5ZMNC1-FBnTdw6zrvIR9K3gY/edit?usp=sharing",
    external: true,
  },
  {
    label: "Register for Events",
    href: "https://lp.constantcontactpages.com/cu/gXP0Ofs",
    external: true,
  },
];

export const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/American-Subcontractors-Association-of-Idaho-102598020483594/",
  },
  { name: "X", href: "https://twitter.com/ASA_Idaho" },
  { name: "YouTube", href: "https://www.youtube.com/user/Subcontractors" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/american-subcontractors-association-of-idaho",
  },
] as const;
