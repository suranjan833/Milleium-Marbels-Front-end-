"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/Group-6.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  // { label: "Live Stockyard", href: "/live-stockyard" },
  { label: "Collections", href: "/collections" },
  {
    label: "Vista",
    href: "https://visualizer.milleniummarbles.com/product-homepage",
  },
  { label: "Blog", href: "/blog" },
  { label: "Events", href: "/event" },
  // { label: "Awards", href: "/award" },
  { label: "Contact", href: "/contact" },
];

const collections = [
  "Exotic",
  "Granite",
  "Lime Stone",
  "Marbles",
  "Onyx",
  "Quartzite",
  "Travertine",
];

const factoryLocations = [
  { label: "Silvassa", href: "https://maps.app.goo.gl/rNPytKgDubGWnJsm6" },
  { label: "Shoolagiri", href: "https://maps.app.goo.gl/X5LqEp7hqdtLWgdv9" },
  { label: "Kishangarh", href: "https://maps.app.goo.gl/aBWRdCcDu5yVtMEM7" },
];

const showroomLocations = [
  { label: "Gurugram", href: "https://maps.app.goo.gl/UEsn2g34T2nHWufA9" },
  { label: "Mumbai", href: "https://maps.app.goo.gl/7WJZGBWz7TsPQEVu5" },
  { label: "Indore", href: "https://maps.app.goo.gl/62Qd6N2P3t1eEbEu6" },
];

const titleStyle =
  "text-[12px] uppercase tracking-[0.1em] text-white font-semibold";

const linkStyle =
  "text-[15px] leading-8 text-white/80 hover:text-[#72b2ff] transition-all duration-300";

export default function Footer() {
  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  return (
    <footer className="bg-[#101010] text-white border-t border-white/10">
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center items-start lg:justify-between gap-10 lg:gap-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logo}
                alt="Millenium Marbles"
                width={235}
                height={94}
                className="w-[180px] sm:w-[210px] lg:w-[230px] h-auto"
              />
            </Link>
          </div>

          {/* Main Content Columns */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-16 lg:gap-x-2 3xl:gap-x-8">
            {/* Quick Links */}
            <div className="w-full">
              <p className={titleStyle}>Quick Links</p>
              <ul className="mt-4 lg:mt-5 space-y-[0.5]">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={linkStyle}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections */}
            <div className="w-full">
              <p className={titleStyle}>Collections</p>
              <ul className="mt-4 lg:mt-5 space-y-[0.5]">
                {collections.map((item) => (
                  <li key={item}>
                    <Link href="/collections" className={linkStyle}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations Section */}
            <div className="col-span-2 lg:col-span-2">
              <p className={titleStyle}>Locations</p>
              <div className="mt-4 lg:mt-5 grid grid-cols-2 gap-x-6 sm:gap-x-10 lg:gap-x-8">
                {/* Factory */}
                <div>
                  <p className={titleStyle}>Factory</p>
                  <ul className="mt-3 space-y-[0.5]">
                    {factoryLocations.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className={linkStyle}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Showroom & Phone */}
                <div>
                  <p className={titleStyle}>Showroom</p>
                  <ul className="mt-3 space-y-[0.5]">
                    {showroomLocations.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className={linkStyle}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 sm:mt-7">
                    <p className={titleStyle}>Phone</p>
                    <Link
                      href="tel:+918088218821"
                      className="inline-block mt-2 text-[14px] sm:text-[15px] text-[#72b2ff] hover:text-white transition-colors whitespace-nowrap"
                    >
                      +91 8088218821
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us & Enquiry */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex flex-col justify-between">
              <div>
                <p className={titleStyle}>Follow Us</p>
                <div className="mt-4 flex items-center gap-3.5 text-white/80">
                  <Link
                    href="https://www.facebook.com/share/19TkQMqvXi/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#72b2ff] transition-colors"
                  >
                    <FacebookIcon sx={{ fontSize: 22 }} />
                  </Link>
                  <Link
                    href="https://x.com/milleniummarble?s=21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#72b2ff] transition-colors"
                  >
                    <XIcon sx={{ fontSize: 18 }} />
                  </Link>
                  {/* <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#72b2ff] transition-colors"
                  >
                    <LinkedInIcon sx={{ fontSize: 22 }} />
                  </Link> */}
                  <Link
                    href="https://youtube.com/@milleniummarbles?si=8rUzKyoOTjore_ow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#72b2ff] transition-colors"
                  >
                    <YouTubeIcon sx={{ fontSize: 22 }} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/milleniummarbles?igsh=MW9yMTc0OGwwZ3M5aA%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#72b2ff] transition-colors"
                  >
                    <InstagramIcon sx={{ fontSize: 22 }} />
                  </Link>
                </div>

                <div className="mt-8 lg:mt-10">
                  <p className={titleStyle}>Enquiry</p>
                  <Link
                    href="mailto:info@milleniummarbles.com"
                    className="block mt-2 text-[14px] sm:text-[15px] text-[#72b2ff] hover:text-white transition-colors "
                  >
                    info@milleniummarbles.com
                  </Link>
                </div>
              </div>

              {/* Back to top button */}
              {/* <div className="mt-8 flex justify-end">
                <button
                  onClick={scrollToTop}
                  className="bg-[#222222] hover:bg-[#333333] border border-white/10 text-white flex flex-col items-center justify-center w-11 h-11 rounded transition-colors group cursor-pointer"
                  aria-label="Scroll to top"
                >
                  <svg
                    className="w-3.5 h-3.5 text-white group-hover:-translate-y-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5">
                    TOP
                  </span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
