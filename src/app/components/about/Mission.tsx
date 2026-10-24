export default function Mission() {
  return (
    <section className="bg-[#72b2ff] py-16 sm:py-20 lg:py-[75px]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 text-center">
        {/* Sub-heading */}
        <div className="pb-10 sm:pb-12 lg:pb-[55px]">
          <p className="text-white text-sm sm:text-lg lg:text-[30px] font-normal tracking-[0.18em] lg:tracking-[0.2em] uppercase">
            The Millenium
          </p>

          {/* Main Title */}
          <h2 className="text-[56px] sm:text-[72px] lg:text-[100px] font-normal leading-none text-white mt-2 lg:mt-0 mb-8 lg:mb-12 tracking-wide">
            Mission
          </h2>
        </div>

        {/* Description Paragraphs */}
        <div className="space-y-5 sm:space-y-6 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-3xl mx-auto">
          <p className="text-[14px] sm:text-[15px] lg:text-[15px] leading-7 lg:leading-relaxed font-light text-white">
            We at Millenium Marbles yearn to be a guiding light, a steady flame
            in the ever-shifting landscape of imported stone. We seek not just
            to be a source, but a haven for those who crave ethereal beauty.
          </p>

          <p className="text-[14px] sm:text-[15px] lg:text-[15px] leading-7 lg:leading-relaxed font-light text-white">
            Through our relentless research into over 500 stone types, we have
            become the earth&apos;s echo, bringing whispers of distant quarries
            to uplift your spaces. Each piece, meticulously chosen, is a vow to
            deliver only the purest gem the earth can offer.
          </p>

          <p className="text-[14px] sm:text-[15px] lg:text-[15px] leading-7 lg:leading-relaxed font-light text-white">
            By fostering trusted relationships and providing unparalleled
            support, we aim to empower our clients and enrich their spaces with
            the exceptional beauty of our hand-selected marble.
          </p>
        </div>
      </div>
    </section>
  );
}
