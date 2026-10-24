import Image from "next/image";

export default function FactoryGallery() {
  const images = [
    {
      src: "/images/about/factory1.jpg",
      alt: "Silvassa Factory",
    },
    {
      src: "/images/about/factory2.jpg",
      alt: "Shoolagiri Factory",
    },
    {
      src: "/images/about/factory3.jpg",
      alt: "Kishangarh Factory",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Heading */}

        <div className="text-center mb-12 sm:mb-16">
          <p
            className={` uppercase tracking-[5px] text-[#72b2ff] text-xs sm:text-sm `}
          >
            Our Infrastructure
          </p>

          <h2
            className={` text-[52px] sm:text-[65px] lg:text-[75px]font-normal leading-none mt-5text-black`}
          >
            Manufacturing Excellence
          </h2>

          <div className="w-14 h-[1px] bg-[#72b2ff] mx-auto mt-6" />
        </div>

        {/* Images */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {images.map((image) => (
            <div
              key={image.alt}
              className="group overflow-hidden rounded-[24px] border border-black/10"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={350}
                className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
