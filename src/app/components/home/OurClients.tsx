"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  fetchOurClients,
  type OurClient,
  type OurClientType,
} from "../../Utils/api";
import { base_url } from "../../Utils/network";

type Tab = "all" | OurClientType;

/**
 * The backend is configured to return media URLs pointing at `localhost:8000`.
 * Normalize those to the actual API host so logos load correctly on the live site.
 */
function resolveLogoUrl(url: string, modifiedAt?: string): string {
  let resolved = url.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//, base_url);
  if (modifiedAt) {
    const t = new Date(modifiedAt).getTime();
    if (!isNaN(t)) {
      resolved += `${resolved.includes("?") ? "&" : "?"}t=${t}`;
    }
  }
  return resolved;
}

export default function OurClients() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [clients, setClients] = useState<OurClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadClients() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchOurClients(
          activeTab === "all" ? {} : { type: activeTab }
        );
        if (!cancelled) {
          setClients(data.results ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load clients."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadClients();

    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  const tabClass = (tab: Tab) =>
    `px-5 py-2 text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-full border ${
      activeTab === tab
        ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(114,178,255,0.3)]"
        : "bg-white/[0.03] text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
    }`;

  return (
    <section className="relative bg-[#101010] py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="gracela uppercase text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 leading-tight">
            Our <span className="text-primary font-normal">Clients</span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        {/* <div className="flex justify-center items-center gap-2 sm:gap-4 mb-10 sm:mb-12 flex-wrap">
          <button onClick={() => setActiveTab("all")} className={tabClass("all")}>
            All Clients
          </button>
          <button
            onClick={() => setActiveTab("real_estate_corporate")}
            className={tabClass("real_estate_corporate")}
          >
            Real Estate & Corporate
          </button>
          <button
            onClick={() => setActiveTab("hospitality_luxury")}
            className={tabClass("hospitality_luxury")}
          >
            Hospitality & Luxury
          </button>
        </div> */}

        {/* Clients Logo Grid */}
        {loading ? (
          <div className="text-center text-neutral-400 text-sm py-12">
            Loading clients...
          </div>
        ) : error ? (
          <div className="text-center text-red-400 text-sm py-12">{error}</div>
        ) : clients.length === 0 ? (
          <div className="text-center text-neutral-400 text-sm py-12">
            No clients found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {clients.map((client) => (
              <div
                key={client.id}
                className="group relative flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[200px] p-6  border border-primary rounded-lg bg-white shadow-[0_4px_25px_rgba(114,178,255,0.12)] transition-all duration-300 cursor-pointer"
              >
                {client.logo_url ? (
                  <div className="relative w-full h-full min-h-[120px]  lg:min-w-[200px] lg:min-h-[200px] flex items-center justify-center">
                    <Image
                      src={resolveLogoUrl(client.logo_url, client.modified_at)}
                      alt={client.name}
                      width={400}
                      height={200}
                      unoptimized
                      className="max-h-24 w-auto object-contain filter  transition-all duration-300"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-base sm:text-lg md:text-xl font-medium tracking-wider text-white/90 group-hover:text-primary transition-colors duration-300 uppercase">
                      {client.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
