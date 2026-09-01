/**
 * The original site pulls these from GeneratePress' icon set, Font Awesome 5.15
 * and the PowerPack "ua-icon" webfont. Inlining the same glyphs as SVG keeps the
 * marks identical while dropping three webfont downloads.
 */

type IconProps = {
  className?: string;
};

/** GeneratePress `gp-icon icon-menu-bars` — open state. */
export function MenuBarsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      className={className}
      fill="currentColor"
    >
      <path d="M0 96c0-13.255 10.745-24 24-24h464c13.255 0 24 10.745 24 24s-10.745 24-24 24H24c-13.255 0-24-10.745-24-24zm0 160c0-13.255 10.745-24 24-24h464c13.255 0 24 10.745 24 24s-10.745 24-24 24H24c-13.255 0-24-10.745-24-24zm0 160c0-13.255 10.745-24 24-24h464c13.255 0 24 10.745 24 24s-10.745 24-24 24H24c-13.255 0-24-10.745-24-24z" />
    </svg>
  );
}

/** GeneratePress `gp-icon icon-close` — toggled state. */
export function MenuCloseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      className={className}
      fill="currentColor"
    >
      <path d="M71.029 71.029c9.373-9.372 24.569-9.372 33.942 0L256 222.059l151.029-151.03c9.373-9.372 24.569-9.372 33.942 0 9.372 9.373 9.372 24.569 0 33.942L289.941 256l151.03 151.029c9.372 9.373 9.372 24.569 0 33.942-9.373 9.372-24.569 9.372-33.942 0L256 289.941l-151.029 151.03c-9.373 9.372-24.569 9.372-33.942 0-9.372-9.373-9.372-24.569 0-33.942L222.059 256 71.029 104.971c-9.372-9.373-9.372-24.569 0-33.942z" />
    </svg>
  );
}

/** Font Awesome 5 Solid `fa-phone`. */
export function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      className={className}
      fill="currentColor"
    >
      <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
    </svg>
  );
}

/** PowerPack `ua-icon-facebook22`. */
export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.45-4.92 8.45-9.94z" />
    </svg>
  );
}

/** Font Awesome Brands `fa-twitter` — the live site still shows the bird mark. */
export function TwitterIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
    </svg>
  );
}

/** PowerPack `ua-icon-youtube`. */
export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <path d="M21.58 7.19c-.23-1.24-1.25-2.16-2.48-2.29C16.95 4.69 14.48 4.69 12 4.69s-4.95 0-7.1.21c-1.23.13-2.25 1.05-2.48 2.29C2.16 8.72 2.14 10.39 2.14 12s.02 3.28.28 4.81c.23 1.24 1.25 2.16 2.48 2.29 2.15.21 4.62.21 7.1.21s4.95 0 7.1-.21c1.23-.13 2.25-1.05 2.48-2.29.26-1.53.28-3.2.28-4.81s-.02-3.28-.28-4.81zM9.83 15.5v-7l6.06 3.5-6.06 3.5z" />
    </svg>
  );
}

/** PowerPack `ua-icon-linkedin2`. */
export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <path d="M6.94 5.01a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM6.7 8.48H3.3V20h3.4V8.48zm5.44 0H8.76V20h3.36v-6.05c0-3.14 4.1-3.4 4.1 0V20h3.37v-7.2c0-5.27-6.03-5.08-7.47-2.48V8.48z" />
    </svg>
  );
}

/** UABB `ua-icon-arrow-right`, used as the CONTACT US button's trailing icon. */
export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
