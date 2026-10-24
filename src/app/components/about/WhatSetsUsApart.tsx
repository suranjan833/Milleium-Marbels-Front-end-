"use client";

import Image from "next/image";

type Stat = {
  number: string;
  label: string;
};

type Factory = {
  title: string;
  image: string;
  stats: Stat[];
};

const factories: Factory[] = [
  {
    title: "Silvassa Factory",
    image: "/assets/about/factory1.jpg",
    stats: [
      { number: "4", label: "PINHE WIRESAW" },
      { number: "2", label: "ITALIAN AUTOMATIC FILLING PLANT" },
      { number: "1", label: "ITALIAN GRINDING MACHINE" },
      {
        number: "1",
        label: "ITALIAN POLISH MACHINES",
      },
      { number: "1", label: "GANGSAW" },
    ],
  },

  {
    title: "Shoolagiri Factory",
    image: "/assets/about/factory2.jpg",
    stats: [
      { number: "1", label: "PINHE WIRESAW " },
      { number: "1", label: "ITALIAN AUTOMATIC FILLING PLANT " },
      { number: "2", label: "GANGSAW " },
    ],
  },

  {
    title: "Kishangarh Factory",
    image: "/assets/about/factory3.jpg",
    stats: [
      { number: "2", label: "PINHE WIRESAW" },
      { number: "1", label: "ITALIAN AUTOMATIC FILLING PLANT " },
      { number: "1", label: "ITALIAN GRINDING MACHINE " },
      { number: "2", label: "GANGSAW " },
    ],
  },
];

export default function WhatSetsApart() {
  return (
    <section className="bg-[#0f0f0f] text-white pt-14 sm:pt-16 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading */}

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[30px] sm:text-[34px] lg:text-[38px] font-normal leading-tight">
            What Sets Us Apart
          </h2>

          <div className="mt-3">
            <p className="text-white text-[14px] sm:text-[18px] tracking-[2px]">
              State-Of-The-Art Technology
            </p>

            <p
              className={`mt-5 text-white text-[13px] sm:text-[15px] leading-[2] max-w-3xl mx-auto`}
            >
              At Millenium Marbles, we leverage state-of-the-art technology to
              ensure the{" "}
              <span className="text-[#72b2ff]">
                highest quality and precision
              </span>{" "}
              in our products.
            </p>
          </div>
        </div>

        {/* Factory Sections */}

        <div className="space-y-16 sm:space-y-20">
          {factories.map((factory, index) => (
            <div
              key={factory.title}
              className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center"
            >
              {/* Image */}

              <div className={`group ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                <div className="overflow-hidden rounded-[18px] transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
                  <Image
                    src={factory.image}
                    alt={factory.title}
                    width={900}
                    height={600}
                    className="w-full h-[300px] sm:h-[380px] lg:h-[410px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Content */}

              <div
                className={`
                  ${index % 2 !== 0 ? "lg:order-1" : ""}
                  lg:-mt-8
                `}
              >
                <h3 className="text-[34px] sm:text-[36px] font-normal mb-3">
                  {factory.title}
                </h3>

                <div className="w-full border-b border-white/20 mb-6" />

                <div className="space-y-3">
                  {factory.stats.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between border-b border-white/20 pb-4 gap-4"
                    >
                      <span className="text-[32px] sm:text-[39px] text-[#72b2ff] font-light">
                        {item.number}
                      </span>

                      <span className="text-white text-[12px] sm:text-[14px] text-right max-w-[75%] leading-relaxed">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
