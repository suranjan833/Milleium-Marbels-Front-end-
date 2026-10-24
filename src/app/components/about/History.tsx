import downarrow from "../../../../public/assets/about/about-down-arrow.png";
import Image from "next/image";

export default function History() {
  return (
    <>
      {/* =========================
          History / Section 1: The power of persistence
      ========================== */}
      <section className="relative overflow-hidden bg-[#0b0b0b] text-[#f2f2f2] pt-10 sm:pt-12 pb-16 sm:pb-20">
        {/* Glow Background Effect */}
        <div className="absolute -top-52 right-0 h-[220px] w-[220px] rounded-full bg-[#3d7cf7]/10 blur-[140px] pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_120px] gap-10 lg:gap-16 items-start">
            {/* Left Content */}
            <div>
              <h2 className="text-[32px] sm:text-[34px] leading-tight tracking-tight text-[#f2f2f2] max-w-[850px]">
                The power of persistence
              </h2>

              {/* Horizontal Divider Line */}
              <div className="w-12 h-[1px] bg-gray-500 my-5 sm:my-6" />

              {/* Paragraphs */}
              <div className="space-y-5 sm:space-y-6 max-w-[950px]">
                {[
                  `Where mountains whisper secrets old, we tread with tales of stone untold. For more than two decades, 25 years to be precise, we have been our country's trusted partners for marble. We believe ourselves to be not just stone merchants, but sculptors of dreams.  We don't just source marble; we translate nature's artistry into breathtaking creations.`,

                  `Architects, homeowners and interior designers consistently bestow their trust in us, a testament to our unwavering commitment to quality and variety in our stone. We are weavers of a story in our stone, and with our art, we make sure that your spaces tell your story as beautifully and passionately as you do.`,

                  `We are the silent muse, the foundation upon which countless sanctuaries of beauty have been built. Each of our collections is a curated masterpiece, whispering tales of distant quarries and the sun-drenched landscapes they hail from.`,

                  `So, let Millenium Marbles etch its legacy into your space and witness the exquisite craftsmanship that transforms raw elegance into everlasting whispers of nature's artistry.`,
                ].map((text, index) => (
                  <p
                    key={index}
                    className="text-[14px] sm:text-[15px] md:text-base leading-relaxed text-[#ffffff] font-light"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Down Arrow Section */}
            <div className="flex flex-col items-center justify-center pt-0 lg:pt-28">
              <Image
                src={downarrow}
                alt="down-arrow"
                className="w-[50%] md:w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
    Timeline Section (Premium Responsive)
========================== */}
      <section className="bg-white py-20 sm:py-28 md:py-36 border-b-[3px] border-[#7BA7F5]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-8">
          {/* Mobile View */}
          <div className="flex flex-col items-center text-center md:hidden py-6">
            <h3 className="text-[22px] sm:text-2xl font-normal tracking-[0.02em] leading-tight text-[#090909] mb-12">
              Beyond stone, Beyond time
            </h3>

            <h2 className="text-[72px] sm:text-[90px] italic font-normal leading-none tracking-tight text-[#7BA7F5] mb-16">
              1998
            </h2>

            <p className="text-[13px] sm:text-sm leading-[2] text-[#333333] font-light max-w-sm">
              In the vibrant heart of Mumbai&apos;s Vile Parle, a seed was sown.
              A yearning to capture nature&apos;s artistry in stone, to
              transform the raw beauty of marble into enduring masterpieces.
              This was the year our quest for imported marble commenced, the
              first brushstroke upon our canvas.
            </p>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-[40%_55%] lg:grid-cols-[35%_58%] gap-12 lg:gap-20 items-center">
            {/* Year */}
            <div className="flex justify-center">
              <h2 className="text-8xl lg:text-[96px] xl:text-[104px] italic font-normal leading-none tracking-tight text-[#7BA7F5]">
                1998
              </h2>
            </div>

            {/* Content */}
            <div className="relative">
              <h3 className="text-3xl lg:text-[42px] font-normal tracking-tight leading-tight text-[#020202] mb-6">
                Beyond stone, Beyond time
              </h3>

              <div className="w-14 h-[1px] bg-[#7BA7F5] mb-6"></div>

              <p className="text-sm lg:text-[15px] leading-[2] text-[#333333] font-light max-w-xl">
                In the vibrant heart of Mumbai&apos;s Vile Parle, a seed was
                sown. A yearning to capture nature&apos;s artistry in stone, to
                transform the raw beauty of marble into enduring masterpieces.
                This was the year our quest for imported marble commenced, the
                first brushstroke upon our canvas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
