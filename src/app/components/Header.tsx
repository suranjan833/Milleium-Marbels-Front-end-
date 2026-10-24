"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import logo from "../../../public/assets/Group-6.png";

const SEARCH_RESULTS_PATH = "/live-stockyard";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const INSIGHTS_CHILDREN: NavItem[] = [
  { label: "Events", href: "/event" },
  { label: "Blog", href: "/blog" },
  // { label: "Awards", href: "/award" },
];

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  // { label: "Live Stockyard", href: "/live-stockyard" },
  { label: "Collections", href: "/collections" },
  {
    label: "Vista",
    href: "https://visualizer.milleniummarbles.com/product-homepage",
  },
  { label: "Insights", href: "#", children: INSIGHTS_CHILDREN },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);

  const [desktopSearch, setDesktopSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");

  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : (pathname?.startsWith(href) ?? false);

  const isInsightsActive = () =>
    INSIGHTS_CHILDREN.some((c) => isActive(c.href));

  const goToSearchResults = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`${SEARCH_RESULTS_PATH}?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="relative ">
      <div className="xl:absolute top-0 left-0 right-0 z-10 bg-black xl:bg-transparent w-full">
      <div className="mx-auto flex h-[90px] sm:h-[110px] md:h-[140px] items-center justify-between px-4 lg:px-10">
        {/* LOGO */}

        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Millenium Marbles"
            width={210}
            height={85}
            className="w-[145px] sm:w-[170px] md:w-[190px] lg:w-[210px] h-auto"
          />
        </Link>

        {/* DESKTOP NAV ONLY */}

        <nav className="hidden xl:flex xl:flex-wrap items-center">
          <div className="lg:flex gap-5">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                /* Insights Dropdown */
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setInsightsOpen(true)}
                  onMouseLeave={() => setInsightsOpen(false)}
                >
                  <button
                    onClick={() => setInsightsOpen(!insightsOpen)}
                    className={`text-3xl font-normal uppercase tracking-wider transition-colors hover:text-[#72b2ff] flex items-center gap-1 pb-4 ${isInsightsActive() ? "text-[#72b2ff]" : "text-neutral-200"}`}
                  >
                    {item.label}
                    {insightsOpen ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMoreIcon fontSize="small" />
                    )}
                  </button>

                  {insightsOpen && (
                    <div className="absolute top-full left-0 -mt-1 bg-[rgba(26,26,26,0.5)] border border-white/10 rounded-xl shadow-2xl py-2 min-w-[180px] z-50 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-1 text-2xl font-normal uppercase tracking-wider transition-colors hover:bg-white/5 hover:text-[#72b2ff] ${isActive(child.href) ? "text-[#72b2ff]" : "text-neutral-200"}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                   )} 
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-3xl font-normal uppercase tracking-wider transition-colors hover:text-[#72b2ff] ${isActive(item.href) ? "text-[#72b2ff]" : "text-neutral-200"}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* SEARCH */}

          <div className="flex items-center gap-2 border-b border-white/70 pb-1 ml-4">
            <SearchIcon fontSize="small" className="text-neutral-200" />

            <input
              type="text"
              value={desktopSearch}
              onChange={(e) => setDesktopSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToSearchResults(desktopSearch);
              }}
              placeholder="Search ..."
              className="w-40 bg-transparent italic text-neutral-200 placeholder-neutral-400 outline-none"
            />
          </div>
        </nav>

        {/* TABLET + MOBILE CONTROLS */}

        <div className="flex xl:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="text-white"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-full bg-white/10 p-2 text-white"
            aria-label="Open search"
          >
            <SearchIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* MENU DRAWER */}

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "85%",
            maxWidth: "360px",
            background: "#0b0b0b",
            color: "#fff",
          },
        }}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <button onClick={() => setDrawerOpen(false)} className="text-white">
            <ArrowBackIcon />
          </button>

          <span className="uppercase tracking-[3px] text-sm">Menu</span>
        </div>

        <ul>
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <li key={item.label}>
                <button
                  onClick={() => setMobileInsightsOpen(!mobileInsightsOpen)}
                  className={`w-full flex items-center justify-between px-6 py-5 border-b border-white/10 uppercase tracking-wider text-sm ${isInsightsActive() ? "text-[#72b2ff]" : "text-white"}`}
                >
                  {item.label}
                  {mobileInsightsOpen ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )}
                </button>
                {mobileInsightsOpen && (
                  <ul className="bg-white/5">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`block pl-10 pr-6 py-4 border-b border-white/5 uppercase tracking-wider text-xs ${isActive(child.href) ? "text-[#72b2ff]" : "text-white/70"}`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`block px-6 py-5 border-b border-white/10 uppercase tracking-wider text-sm ${isActive(item.href) ? "text-[#72b2ff]" : "text-white"}`}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </Drawer>

      {/* SEARCH DRAWER */}

      <Drawer
        anchor="top"
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            background: "#0b0b0b",
          },
        }}
      >
        <div className="p-5">
          <div className="flex justify-end mb-5">
            <button onClick={() => setSearchOpen(false)} className="text-white">
              <CloseIcon />
            </button>
          </div>

          <div className="flex items-center border-b border-white/30 pb-3">
            <input
              autoFocus
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goToSearchResults(mobileSearch);

                  setSearchOpen(false);
                }
              }}
              placeholder="Search..."
              className="w-full bg-transparent text-white outline-none italic"
            />

            <SearchIcon className="text-white/50" />
          </div>
        </div>
      </Drawer>
      </div>
    </header>
  );
};

export default Header;
