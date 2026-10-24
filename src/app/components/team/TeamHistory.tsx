export default function TeamHistory() {
  return (
    <section className="bg-[#0b0b0b] text-white pb-28">

      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_140px] gap-12 lg:gap-16">

          {/* Left Content */}

          <div>

            <h2
              className="
                text-[30px]
                sm:text-[34px]
                md:text-[40px]
                font-light
                font-[Calibri]
                leading-tight
                mb-5
                tracking-wide
              "
            >
              The artisans of elegance
            </h2>


            {/* Small Line */}

            <div className="w-12 h-[2px] bg-white mb-8"></div>



            <div
              className="
                space-y-6
                text-gray-300
                text-[14px]
                md:text-[15px]
                leading-7
                font-[Calibri]
              "
            >

              <p className="text-[14px] sm:text-[15px]">
                Millenium Marbles is more than just a company; it's a family united by a shared vision. 
                We are driven by a deep respect for the timeless artistry of marble and a relentless pursuit of excellence.
                Our team, vast and ever-growing, represents the very foundation of our success.
              </p>


              <p className="text-[14px] sm:text-[15px]">
                From the explorers who source breathtaking marbles from distant lands to the artisans whose meticulous craftsmanship
                breathes life into raw beauty, every individual in our team contributes their unique talent and expertise.
              </p>


              <p className="text-[14px] sm:text-[15px]">
                This isn't just a well-maintained team; it's a family, united by a fervent respect for craftsmanship.
                We foster a collaborative spirit, where open communication and mutual respect pave the way for innovation.
              </p>


            </div>


          </div>





          {/* Right Arrow - Desktop Only */}

          <div
            className="
              hidden
              lg:flex
              items-center
              justify-center
              mt-[1.5in]
            "
          >

            <svg
              width="52"
              height="180"
              viewBox="0 0 52 180"
              fill="none"
            >

              <path
                d="M26 0V145L5 125M26 145L47 125"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>


          </div>


        </div>





        {/* Bottom Divider */}

        <div className="border-t-2 border-white/60 mt-16 sm:mt-20"></div>


      </div>

    </section>
  );
}