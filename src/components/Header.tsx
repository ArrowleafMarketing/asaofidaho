"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MenuBarsIcon, MenuCloseIcon } from "@/components/Icons";
import { navItems, site, type NavItem } from "@/lib/site";

/**
 * Recreates the GeneratePress header for this site:
 *
 *  - The homepage runs GP's transparent-header ("page hero") variant: the header
 *    is absolutely positioned over the hero slideshow, `.site-header` gets a
 *    rgba(255,255,255,0.45) wash, the nav strip itself is transparent, and the
 *    links are near-black (#110000) with a #1e72bd hover and current state.
 *  - Every other page uses the standard header: rgba(255,255,255,0.36) on
 *    `.site-header`, a #fafbfb nav strip, #1e73be links, a #38b7ed-on-white
 *    hover and a #7a8896 current state.
 *  - Both variants stick to the top on scroll (`sticky-menu-slide`,
 *    `both-sticky-menu`), sliding a #fafbfb bar down with the logo showing.
 *  - Below 768px the desktop header is replaced by GP's `#mobile-header`.
 */

/** Height of the untoggled header, i.e. how far you scroll before the bar sticks. */
const STICKY_TRIGGER = 124;

type Variant = "overlay" | "solid";

function isActive(pathname: string, item: NavItem) {
  if (item.external) return false;
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavLink({
  item,
  active,
  variant,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  variant: Variant;
  onNavigate?: () => void;
}) {
  const base =
    "nav-link block px-5 font-heading text-[17px] font-bold uppercase leading-[60px]";

  const colors =
    variant === "overlay"
      ? active
        ? "text-asa-nav-overlay-hover"
        : "text-asa-nav-overlay-link hover:text-asa-nav-overlay-hover"
      : active
        ? "text-asa-nav-current bg-white/[0.36]"
        : "text-asa-link hover:text-asa-link-hover hover:bg-white";

  const className = `${base} ${colors}`;

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

function Menu({
  variant,
  orientation,
  onNavigate,
  itemClassName = "",
}: {
  variant: Variant;
  orientation: "row" | "column";
  onNavigate?: () => void;
  itemClassName?: string;
}) {
  const pathname = usePathname();

  return (
    <ul
      className={`list-none ${
        orientation === "row" ? "flex flex-wrap items-center" : ""
      } ${itemClassName}`}
    >
      {navItems.map((item) => (
        <li key={item.label} className="relative">
          <NavLink
            item={item}
            active={isActive(pathname, item)}
            variant={variant}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}

function MenuToggle({
  open,
  onClick,
  controls,
  className = "",
}: {
  open: boolean;
  onClick: () => void;
  controls: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-controls={controls}
      aria-expanded={open}
      className={`flex items-center border-0 bg-transparent px-0 font-heading text-[17px] font-bold uppercase leading-[60px] ${className}`}
    >
      <span className="inline-flex self-center opacity-70">
        {open ? <MenuCloseIcon /> : <MenuBarsIcon />}
      </span>
      <span className="screen-reader-text">Menu</span>
    </button>
  );
}

export function Header({ variant }: { variant: Variant }) {
  const [stuck, setStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stickyOpen, setStickyOpen] = useState(false);

  useEffect(() => {
    // Reading scrollY doesn't force layout and React bails out when the
    // boolean is unchanged, so a plain listener is cheap. Deliberately not
    // rAF-coalesced: rAF is suspended in background tabs, which would leave
    // the bar in a stale state for a restored-scroll page load.
    const onScroll = () => setStuck(window.scrollY > STICKY_TRIGGER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeAll = () => {
    setMobileOpen(false);
    setStickyOpen(false);
  };

  const headerWash =
    variant === "overlay" ? "bg-white/[0.45]" : "bg-white/[0.36]";
  const navStrip = variant === "overlay" ? "bg-transparent" : "bg-asa-nav-bg";

  return (
    <>
      <a className="screen-reader-text skip-link" href="#content">
        Skip to content
      </a>

      {/* ---------------- desktop header (>768px) ---------------- */}
      <div
        className={
          variant === "overlay"
            ? "absolute inset-x-0 z-10 max-md:hidden"
            : "relative max-md:hidden"
        }
      >
        <header className={headerWash} id="masthead" aria-label="Site">
          <div className="mx-auto flex max-w-(--container-page) items-center px-10 py-5">
            <Link href="/" rel="home" className="inline-block max-w-full">
              <Image
                src={site.logo.src}
                alt={site.logo.alt}
                width={site.logo.width}
                height={site.logo.height}
                priority
                className="block h-auto w-[300px]"
              />
            </Link>

            <nav className={`z-100 ml-auto ${navStrip}`} aria-label="Primary">
              <Menu variant={variant} orientation="row" />
            </nav>
          </div>
        </header>
      </div>

      {/* ---------------- sticky bar (all widths) ---------------- */}
      {/*
        `inert` (rather than aria-hidden alone) takes the off-screen bar out of
        both the accessibility tree and the tab order, so its duplicate links
        aren't focusable while it is slid up.
      */}
      <nav
        aria-label="Primary sticky"
        inert={!stuck}
        className={`fixed inset-x-0 top-0 z-500 bg-asa-nav-bg shadow-[0_2px_2px_-2px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-out ${
          stuck ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-(--container-page) items-center px-10 max-md:px-2.5">
          <Link
            href="/"
            rel="home"
            title={site.name}
            className="mr-2.5 flex items-center"
            onClick={closeAll}
          >
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="block h-[60px] w-auto py-2.5"
            />
          </Link>

          <div className="ml-auto max-md:hidden">
            <Menu variant="solid" orientation="row" />
          </div>

          <div className="ml-auto md:hidden">
            <MenuToggle
              open={stickyOpen}
              onClick={() => setStickyOpen((v) => !v)}
              controls="sticky-menu"
              className="pr-5 text-asa-link"
            />
          </div>
        </div>

        {stickyOpen && (
          <div id="sticky-menu" className="bg-asa-nav-bg md:hidden">
            <Menu
              variant="solid"
              orientation="column"
              onNavigate={closeAll}
              itemClassName="[&_a]:leading-[35px]"
            />
          </div>
        )}
      </nav>

      {/* ---------------- mobile header (<=768px) ---------------- */}
      <nav
        id="mobile-header"
        aria-label="Mobile"
        className="relative z-100 bg-asa-nav-bg md:hidden"
      >
        <div className="mx-auto flex max-w-(--container-page) flex-wrap items-center">
          <div className="mr-auto ml-2.5 flex items-center">
            <Link href="/" rel="home" title={site.name} onClick={closeAll}>
              <Image
                src={site.logo.src}
                alt={site.logo.alt}
                width={site.logo.width}
                height={site.logo.height}
                priority
                className="block h-[60px] w-auto py-2.5"
              />
            </Link>
          </div>

          <MenuToggle
            open={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            controls="mobile-menu"
            className="pr-5 text-asa-link"
          />

          {mobileOpen && (
            <div id="mobile-menu" className="basis-full bg-asa-nav-bg">
              {/* Mobile items use a 35px line-height per the site's custom CSS. */}
              <Menu
                variant="solid"
                orientation="column"
                onNavigate={closeAll}
                itemClassName="[&_a]:leading-[35px]"
              />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
