import Image from "next/image";

export default function Stats() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}

          <div>
            <p className="uppercase tracking-[5px] text-[#72b2ff] text-sm mb-4">
              The Millenium
            </p>

            <h2 className="text-[56px] sm:text-[70px] lg:text-[80px] font-normal leading-none text-black mb-8">
              Vision
            </h2>

            <div className="w-14 h-[1px] bg-[#72b2ff] mb-8"></div>

            <div className="space-y-6">
              <p className="text-[15px] sm:text-base leading-[2] font-light text-[#333333]">
                Our vision is to become the most trusted global brand in the
                natural stone industry by delivering products that combine
                elegance, innovation and sustainability.
              </p>

              <p className="text-[15px] sm:text-base leading-[2] font-light text-[#333333]">
                We aspire to inspire architects, designers and homeowners by
                offering premium marble, granite and engineered stone that
                transforms every space into a masterpiece.
              </p>

              <p className="text-[15px] sm:text-base leading-[2] font-light text-[#333333]">
                Through continuous innovation and customer satisfaction, we aim
                to build lasting relationships across the world.
              </p>
            </div>
          </div>

          {/* Right Image */}

          <div className="relative">
            <div className="overflow-hidden rounded-[30px]">
              <Image
                src="/images/about/vision.jpg"
                alt="Vision"
                width={700}
                height={500}
                className="
                  w-full 
                  h-[350px] 
                  sm:h-[420px] 
                  lg:h-[520px]
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
