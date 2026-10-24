"use client";

import Image from "next/image";

const showrooms = [
  { city: "Gurugram", type: "Showroom", image: "/assets/about/billboard.jpg" },
  { city: "Mumbai", type: "Showroom", image: "/assets/about/billboard.jpg" },
  { city: "Indore", type: "Showroom", image: "/assets/about/billboard.jpg" },
];

export default function WorldSupply() {
  return (
    <section className="bg-[#181818] text-white py-20 sm:py-24 pb-12">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Introduction */}

        <div className="max-w-5xl mx-auto text-center">
          <p
            className={`text-white text-[13px] sm:text-base leading-[2] font-light`}
          >
            By incorporating these advanced technologies from around the world,
            we ensure the superior quality and exceptional finish of our marble
            products, meeting the diverse needs of our customers with precision
            and efficiency.
          </p>
        </div>

        {/* Divider */}

        <div className="w-full h-[1px] bg-white/40 my-12 sm:my-14" />

        {/* Showrooms Heading */}

        <div className="text-center mb-10 sm:mb-12">
          <h2
            className={`text-[48px] sm:text-[55px] md:text-[60px] font-normal leading-none`}
          >
            Our Showrooms
          </h2>

          <p
            className={`text-gray-400 mt-4 uppercase tracking-[4px] text-xs sm:text-sm font-light`}
          >
            Visit us at any of our three locations
          </p>
        </div>

        {/* Showroom Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {showrooms.map((showroom) => (
            <div key={showroom.city} className="group">
              <div className="overflow-hidden rounded-[28px] sm:rounded-[32px] transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.03] group-hover:shadow-[0_35px_80px_rgba(0,0,0,0.55)]">
                <Image
                  src={showroom.image}
                  alt={`${showroom.city} ${showroom.type}`}
                  width={600}
                  height={400}
                  className="w-full h-[260px] sm:h-[280px] md:h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mt-5 sm:mt-6 text-center">
                <h3 className="text-2xl sm:text-[26px] md:text-[28px] font-normal tracking-[2px] uppercase">
                  {showroom.city}
                </h3>
                {/* <p className="text-gray-400 mt-1 uppercase tracking-[4px] text-[11px] sm:text-xs font-light">
                  {showroom.type}
                </p> */}
              </div>
            </div>
          ))}
        </div>

        {/* World Map */}

        <div className="mt-16 sm:mt-20 overflow-hidden">
          <Image
            src="/assets/about/map-indian.png"
            alt="Global supply network"
            width={1400}
            height={800}
            className="w-full h-auto opacity-90"
          />
        </div>

        {/* Bottom Divider */}

        <div className="border-t border-gray-700 mt-10 sm:mt-12" />
      </div>
    </section>
  );
}
