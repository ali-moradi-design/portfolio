import localFont from "next/font/local";

// Huninn, one weight, self-hosted Latin subset: builds do not need the network.
export const huninn = localFont({
  src: "../fonts/huninn-latin.woff2",
  variable: "--font-huninn",
  display: "swap",
  weight: "400",
});
