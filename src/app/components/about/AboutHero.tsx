import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="bg-[#0b0b0b] text-[#f2f2f2] pt-0 md:pt-2 lg:pt-6 pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="relative flex items-start justify-between mb-8 md:mb-10">
          {/* Company Navigation */}
          <div
            className="text-xs md:text-sm space-y-2.5 z-10 w-1/3"
          >
            <p className="text-gray-400 uppercase tracking-widest font-semibold text-[11px] mb-2">
              COMPANY
            </p>

            <div className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-white text-[14px] font-medium flex items-center gap-2 hover:text-[#72b2ff] transition-colors"
              >
                <span className="w-4 h-[1px] bg-white inline-block" />
                About Us
              </Link>

              <Link
                href="/team"
                className="text-gray-400 text-[14px] font-light flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="w-4 h-[1px] bg-gray-600 inline-block" />
                Team
              </Link>
            </div>
          </div>

          {/* Main Center Heading */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 text-center w-full pointer-events-none">
            <h1
              className="text-4xl sm:text-5xl md:text-[34px] lg:text-[36px] font-normal leading-tight text-white tracking-wide"
            >
              About Us
            </h1>

            <div className="w-8 h-[1px] bg-[#72b2ff] mt-2 mx-auto" />
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative w-full h-[600px] sm:h-[380px] md:h-[500px] lg:h-[640px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.45)] border border-white/10 group">
          <Image
            src="/assets/about/about-banner.jpg"
            alt="Millenium Marbles Factory Stockyard"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
