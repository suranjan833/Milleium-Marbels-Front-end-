import Image from "next/image";

export default function TeamImage() {
  return (
    <section className="bg-[#0b0b0b] pb-20">

      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        <div
          className="
            relative
            w-full
            h-[350px]
            sm:h-[500px]
            md:h-[620px]
            lg:h-[650px]
            overflow-hidden
            rounded-[24px]
            md:rounded-[40px]
          "
        >

          <Image
            src="/assets/team/team-banner.jpg"
            alt="Millenium Marbles Team"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />

        </div>

      </div>

    </section>
  );
}