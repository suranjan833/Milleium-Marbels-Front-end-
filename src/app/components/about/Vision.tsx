export default function Vision() {
  return (
    <section className="relative overflow-hidden bg-white py-[75px]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sub-heading */}
        <div className="pb-[55px]">
          <p
            className={`font-poppins text-[#72b2ff] text-[18px] sm:text-[24px] lg:text-[30px] font-normal tracking-[0.2em] uppercase mb-0`}
          >
            The Millenium
          </p>

          {/* Main Title */}
          <h2
            className={`text-[55px] sm:text-[75px] lg:text-[100px] font-normal leading-none text-[#72b2ff] mb-12 lg:mb-26 tracking-wide`}
          >
            Vision
          </h2>
        </div>

        {/* Description Paragraphs */}
        <div className="space-y-6 sm:space-y-8 max-w-[300px] sm:max-w-xl md:max-w-3xl mx-auto">
          <p className="text-[14px] sm:text-[15px] md:text-base leading-relaxed font-light text-black">
            We at Millenium Marbles envision a world where homes are transformed
            into sanctuaries, each imbued with the enduring elegance of our
            imported stones. These are not mere walls, but canvases upon which
            legacies of beauty and sophistication are etched.
          </p>

          <p className="text-[14px] sm:text-[15px] md:text-base leading-relaxed font-light text-black">
            Our guiding star is a constellation of three: innovation, integrity,
            and excellence. We push the boundaries of the known, seeking ever
            more breathtaking creations. Integrity is the sculptor's chisel,
            shaping trust with every interaction. And excellence, the artist's
            fire, fuels our passion to exceed expectations.
          </p>

          <p className="text-[14px] sm:text-[15px] md:text-base leading-relaxed font-light text-black">
            With each curated piece, we redefine the very language of luxury.
            These are not just stones, but fragments of distant stories, waiting
            to inspire a world where opulence knows no bounds.
          </p>
        </div>
      </div>
    </section>
  );
}
