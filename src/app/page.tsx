import Image from "next/image";
import mainsectionimg from "../../public/assets/homepage/0001.jpg";
import mainsectionimgmobile from "../../public/assets/homepage/0001-mobile.jpg";
import sectiontwobg from "../../public/assets/homepage/new-ng-mount-scaled-1.jpg";
import ringwitharrow from "../../public/assets/homepage/ringwith-arrow.png";
import ringbluedot from "../../public/assets/homepage/ringbluedotrightbottom.png";
import section3 from "../../public/assets/homepage/sectionthreebg.jpg";
import section4img from "../../public/assets/homepage/rightarrowringwithimg.png";
import HomepageSlider, {
  SlideData,
} from "./components/homepageslider/homepageslider";
import section5img from "../../public/assets/homepage/arrowleftwithimg.png";
import ContactSection from "./components/home/ContactSection";
import OurClients from "./components/home/OurClients";
import ringarrowdownmobile from "../../public/assets/homepage/ringarrowdownformobile.png";
import LazySection from "./components/common/LazySection";

export default function Home() {
  return (
    <main className="bg-[#101010]">
      <section className="relative flex items-center justify-center min-h-[400px] sm:min-h-[480px] md:min-h-[600px] xl:min-h-[98vh] overflow-hidden">
        <div className="imagebackground">
          {/* LCP image */}
          <Image
            src={mainsectionimg}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="hidden md:block object-cover object-center"
          />
          <Image
            src={mainsectionimgmobile}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="md:hidden object-cover object-center"
          />

          {/* Background video */}
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="/assets/homepage/IMG_2362.MP4"
            poster={mainsectionimg.src}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="relative z-20 px-4 sm:px-6">
          <h4 className="text-[38px]  md:text-[42px] 2xl:text-[55px] font-normal text-center text-white text-shadow-[1px_1px_0] text-shadow-black/50 leading-tight uppercase">
            <span className="text-primary">INFINITE BEAUTY </span>
            <br className="md:hidden" />
            FROM THE
            <br />
            DEPTHS OF TIME
          </h4>
        </div>
      </section>

      {/* SECTION 2 */}
      {/* <LazySection animation="fade-up"> */}
      <section className="relative pt-[50px] pb-[100px]">
        {/* Ring Arrow */}
        <span className="absolute z-1 top-0 left-[50%] -translate-x-[50%] mt-[40px] md:mt-[20px] lg:mt-[20px] inline-block w-[90%] md:w-[70%] xl:w-[42%] 2xl:w-[35%] 3xl:w-[30%] mx-auto">
          <Image
            src={ringwitharrow}
            width={800}
            height={800}
            alt=""
            className="w-[90%] lg:w-full mx-auto"
          />
        </span>

        {/* Background */}
        <div className="imagebackground">
          <Image
            src={sectiontwobg}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="container relative z-10 md:px-[10px]">
          {/* FIRST CIRCLE CONTENT */}
          <div className="relative mx-auto w-full md:w-[70%] xl:w-[42%] aspect-square flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center lg:w-full">
              <h4 className="text-[18px] lg:text-[40px] 3xl:text-[55px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 leading-tight">
                They <span className="text-primary">came.</span>
              </h4>

              <h4 className="text-[18px] lg:text-[40px] 3xl:text-[55px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 leading-tight">
                They <span className="text-primary">observed.</span>
              </h4>

              <h4 className="text-[18px] lg:text-[40px] 3xl:text-[55px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 leading-tight">
                They <span className="text-primary">created.</span>
              </h4>

              <p className="text-center text-[11px] 3xl:text-[15px] mt-3 leading-relaxed text-white w-[80%] lg:w-full">
                Loving what we do as we continue to hone our craft for more than
                25 years now, our passion for finding inspiration from nature
                and giving it our own personal touch has enabled us to create
                something more exquisite than the last creation each time. Let's
                take you on this beautiful journey with us.
              </p>
            </div>
          </div>

          {/* NATURE'S BOOK MATCH */}
          <div className="lx:w-[60%] mx-auto pt-[350px] pb-[300px] sm:pt-[60px] sm:pb-[100px] md:pt-[80px] md:pb-[120px] lg:pt-[423px] lg:pb-[175px]">
            <h2
              className="text-[25px] md:text-[30px] lg:text-[40px] 2xl:text-[60px] font-normal text-center text-white break-normal
      [text-shadow:1px_1px_2px_rgba(0,0,0,0.6)]
      [-webkit-box-reflect:below_-20px_linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.001)_15%,rgba(0,0,0,0.55)_100%)]
      md:[-webkit-box-reflect:below_-35px_linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.001)_15%,rgba(0,0,0,0.55)_100%)]"
            >
              <span className="text-primary">NATURE'S</span> BOOK MATCH
            </h2>
          </div>

          {/* BLUE CIRCLE */}
          <div className="w-full  md:w-[70%] lg:w-[50%] 2xl:w-[50%] mx-auto">
            <div
              className="relative aspect-square flex items-center justify-center bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${ringbluedot.src})` }}
            >
              <div className="flex flex-col items-center justify-center text-center w-[95%] md:w-full px-[15px] sm:px-[70px] md:px-[100px] xl:px-[115px] lg:py-[213px] mt-[-20px] md:mt-[50px]  xl:mt-[150px]">
                <h4 className="text-[25px] md:text-[38px] lg:text-[40px] 2xl:text-[55px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 leading-tight mt-[30px] line-height-[1.1]">
                  It <span className="text-primary">takes one</span>{" "}
                  <br className="block" /> to{" "}
                  <span className="text-primary">know one</span>
                </h4>

                <p className="text-center text-[13px] lg:text-[15px] mt-3 leading-relaxed text-white">
                  There is symmetry to everything around, because anything
                  that's beautiful can't exist in isolation , you just have to
                  find the pair. With an eye for impeccable art, we are on a
                  quest to discover nature's perfect bookmatch and translate it
                  uniquely in our creations through the finest craftsmanship and
                  attention to the smallest of details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </LazySection> */}

      {/* Section 3 */}
      <LazySection animation="fade-up">
        <section className="relative">
          <div className="imagebackground">
            <Image
              src={section3}
              alt=""
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="bg-[rgba(0,11,22,0.75)] imagebackground"></div>
          </div>

          <div className="relative z-10 pt-[100px] sm:pt-[160px] md:pt-[260px] lg:pt-[500px] pb-[35px]">
            <div className="container">
              <div className="w-full sm:w-[75%] md:w-[55%] lg:w-[35%]">
                <div className="text-left">
                  <h4 className="text-[38px] lg:text-[40px] 2xl:text-[55px] font-normal text-white leading-tight text-left uppercase text-shadow-[1px_1px_0] text-shadow-black/50">
                    It's all in the{" "}
                    <span className="text-primary">Journey</span>
                  </h4>

                  <p className="text-[14px] sm:text-[15px] mt-3 text-left">
                    Every masterpiece begins with a journey—a journey that
                    starts deep within the earth, where nature's artistry takes
                    form over centuries. From raw, untouched earth to a refined
                    work of art, we honor this journey, searching for nature's
                    rare beauty and crafting it with skill and precision,
                    bringing the timeless elegance of the natural world into
                    spaces that inspire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Section 4 */}
      <LazySection animation="fade-up">
        <section className="hidden lg:block relative bg-[#101010] pt-[20px] pb-[100px] lg:py-[200px]">
          <div className="flex items-center flex-col lg:flex-row">
            {/* side 1 */}
            <div className="">
              <Image src={ringarrowdownmobile} alt="" className="lg:hidden" />
              <Image src={section4img} alt="" className="hidden lg:block" />
              <div className="w-[85%] mx-auto text-center lg:text-left lg:w-[25%] absolute top-0 right-[6%] lg:right-auto lg:top-[32%] lg:left-[15%]">
                <h4 className="uppercase text-[35px] xl:text-[40px] 2xl:text-[55px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50">
                  Beautiful <br />
                  <span className="text-primary inline-block">Collections</span>
                </h4>
                <q className="text-[20px] uppercase">
                  It's the destination that makes the journey all the more meaningful
                </q>
                <p className="text-[15px]">
                  From the rugged cliffs of Italy to the sun-kissed shores of
                  Brazil, our curated collection of marbles showcases the coming
                  together of Earth's geological marvels.
                </p>
              </div>
            </div>
            {/* side 2 */}
            <div className="w-[100%] mt-[10px] lg:mt-0 lg:w-1/2">
              <HomepageSlider slides={sectionfour} />
            </div>
          </div>
        </section>

        {/* section 4 mobile */}
        <section className="lg:hidden relative bg-[#101010] pt-[20px] pb-[80px] sm:pb-[100px]">
          <div className="flex items-center flex-col">
            {/* side 1 */}
            <div className="">
              <div className="relative w-[85%] min-h-[300px] sm:min-h-[380px] md:min-h-[450px] mx-auto text-center">
                <div className="imagebackground">
                  <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${ringarrowdownmobile.src})`,
                    }}
                  ></div>
                </div>
                <div className="pb-[140px] sm:pb-[170px] md:pb-[200px]">
                  <h4 className="uppercase text-[28px] sm:text-[36px] md:text-[42px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 leading-tight">
                    Beautiful <br />
                    <span className="text-primary inline-block">
                      Collections
                    </span>
                  </h4>
                  <q className="text-[16px] sm:text-[18px] md:text-[20px] uppercase block mt-2">
                    It's the destination that makes the journey all the more meaningful
                  </q>
                  <p className="text-[14px] sm:text-[15px] mt-2">
                    From the rugged cliffs of Italy to the sun-kissed shores of
                    Brazil, our curated collection of marbles showcases the
                    coming together of Earth's geological marvels.
                  </p>
                </div>
              </div>
            </div>
            {/* side 2 */}
            <div className="w-[90%] mt-[10px]">
              <HomepageSlider slides={sectionfour} />
            </div>
          </div>
        </section>
      </LazySection>

      {/* Section 5 */}
      <LazySection animation="fade-up">
        <section className="hidden lg:block relative bg-[#101010] lg:py-[200px]">
          <div className="flex items-center flex-col-reverse lg:flex-row">
            {/* side 2 */}
            <div className="w-[100%] mt-[10px] lg:mt-0 lg:w-1/2">
              <HomepageSlider slides={sectionfive} />
            </div>
            {/* side 1 */}
            <div className="">
              <Image src={ringarrowdownmobile} alt="" className="lg:hidden" />
              <Image src={section5img} alt="" className="hidden lg:block" />
              <div className="w-[85%] mx-auto text-center lg:w-[27%] absolute top-0 right-[6%] lg:top-[30%] lg:right-[15%] lg:text-right">
                <h4 className="hidden lg:block text-[35px] xl:text-[40px] 2xl:text-[55px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 uppercase">
                  Our <br />{" "}
                  <span className="text-primary inline-block">Projects</span>
                </h4>
                <h4 className="lg:hidden text-[35px] xl:text-[40px] 2xl:text-[55px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 uppercase">
                  Our <br />
                  <span className="text-primary inline-block">Projects</span>
                </h4>
                <q className="text-[20px] uppercase">
                  Artistry over details pays off
                </q>
                <p className="text-[15px]">
                  With craftsmanship honed over the years, the marbles are
                  created by practised hands and discerning eyes who take care
                  of everything down to the last detail. Capturing nature's
                  beauty and carving it into each stone results in breathtaking
                  creations, cherished by our partners and patrons alike.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 mobile  */}
        <section className="lg:hidden relative bg-[#101010] pt-[20px] pb-[80px] sm:pb-[100px]">
          <div className="flex items-center flex-col-reverse">
            {/* side 2 */}
            <div className="w-[90%] mt-[10px]">
              <HomepageSlider slides={sectionfive} />
            </div>
            {/* side 1 */}
            <div className="">
              <div className="relative w-[85%] min-h-[300px] sm:min-h-[380px] md:min-h-[450px] mx-auto text-center">
                <div className="imagebackground">
                  <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${ringarrowdownmobile.src})`,
                    }}
                  ></div>
                </div>
                <div className="pb-[140px] sm:pb-[170px] md:pb-[200px]">
                  <h4 className="text-[28px] sm:text-[36px] md:text-[42px] font-normal text-white text-shadow-[1px_1px_0] text-shadow-black/50 uppercase leading-tight">
                    Our <br />
                    <span className="text-primary inline-block">Projects</span>
                  </h4>
                  <q className="text-[16px] sm:text-[18px] md:text-[20px] uppercase block mt-2">
                    Artistry over details pays off
                  </q>
                  <p className="text-[14px] sm:text-[15px] mt-2">
                    With craftsmanship honed over the years, the marbles are
                    created by practised hands and discerning eyes who take care
                    of everything down to the last detail. Capturing nature's
                    beauty and carving it into each stone results in
                    breathtaking creations, cherished by our partners and
                    patrons alike.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Section 6 */}
      <LazySection animation="fade-up">
        <OurClients />
      </LazySection>

      {/* Section 7 */}
      <LazySection animation="fade-up">
        <ContactSection />
      </LazySection>
    </main>
  );
}

const sectionfour: SlideData[] = [
  {
    id: 1,
    image: "/assets/homepage/Home-oage-6.webp",
    mobileimage: "/assets/homepage/Home-oage-6-mobile.webp",
    alt: "Millenium Marbles - Main Section",
  },
  {
    id: 2,
    image: "/assets/homepage/Home-oage-2.jpg.jpg.webp",
    mobileimage: "/assets/homepage/Home-oage-2-mobile.webp",
    alt: "Millenium Marbles - NG Mount",
  },
  {
    id: 3,
    image: "/assets/homepage/IMG_3671.webp",
    mobileimage: "/assets/homepage/IMG_3671-mobile.webp",
    alt: "Millenium Marbles - Home Page 6",
  },
  {
    id: 4,
    image: "/assets/homepage/Home-oage-3.webp",
    mobileimage: "/assets/homepage/Home-oage-3-mobile.webp",
    alt: "Millenium Marbles - Section Three",
  },
];

const sectionfive: SlideData[] = [
  {
    id: 1,
    image: "/assets/homepage/IMG_3683.webp",
    mobileimage: "/assets/homepage/IMG_3683-mobile.webp",
    alt: "Millenium Marbles - Main Section",
  },
  {
    id: 2,
    image: "/assets/homepage/Home-oage-4.jpg.jpg.webp",
    mobileimage: "/assets/homepage/Home-oage-4-mobile.webp",
    alt: "Millenium Marbles - NG Mount",
  },
  {
    id: 3,
    image: "/assets/homepage/IMG_3678.jpg.webp",
    mobileimage: "/assets/homepage/IMG_3678-mobile.webp",
    alt: "Millenium Marbles - Home Page 6",
  },
  {
    id: 4,
    image: "/assets/homepage/Home-oage.webp",
    mobileimage: "/assets/homepage/Home-oage-mobile.webp",
    alt: "Millenium Marbles - Section Three",
  },
];
