import Link from "next/link";

export default function TeamHero() {
  return (
    <section className="bg-[#0b0b0b] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Left */}

          <div>
            <p
              className={`text-xs uppercase tracking-[0.2em] text-gray-400 mb-10`}
            >
              Company
            </p>

            <div className="space-y-4">
              <Link
                href="/about"
                className={`flex items-center gap-3 text-gray-300 hover:text-white transition text-[15px] font-light `}
              >
                <span className="text-[#6EA7F7]">—</span>
                About Us
              </Link>

              <Link
                href="/team"
                className={` flex items-center gap-3 text-white text-[15px] font-light `}
              >
                <span className="text-[#6EA7F7]">—</span>
                Team
              </Link>
            </div>
          </div>

          {/* Right */}

          <div>
            <h2
              className={` text-[38px] md:text-[44px] font-normal mb-2 tracking-wide `}
            >
              Team
            </h2>

            <span className="w-[35px] h-[1px] bg-white inline-block"></span>

            <p
              className={`uppercase text-[13px] tracking-[0.1em] text-gray-400 mb-2 font-light`}
            >
              They Saw It Before It Was Made
            </p>

            <div
              className={` space-y-5 text-gray-300 leading-7 text-[13px] font-light `}
            >
              <p>
                It's in the projects we bring to life, the spaces we transform,
                where our passion truly shines. And we couldn't do it
                alone—behind every masterpiece stands our trusted team, sharing
                our dream and vision to build a place that reflects commitment
                to the craft etched in every stone, every marble.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
