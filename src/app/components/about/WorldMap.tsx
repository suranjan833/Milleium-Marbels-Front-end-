export default function WorldMap() {
  const stats = [
    {
      number: "25+",
      title: "Years of Experience",
      description: "Delivering premium marble and granite since 1998.",
    },
    {
      number: "1000+",
      title: "Stone Varieties",
      description: "A wide range of marble, granite and engineered stone.",
    },
    {
      number: "5000+",
      title: "Completed Projects",
      description: "Trusted by architects, builders and homeowners.",
    },
    {
      number: "30+",
      title: "Countries Served",
      description: "Supplying natural stone to customers worldwide.",
    },
  ];

  return (
    <section className="bg-[#f8f8f8] py-20 sm:py-24 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Heading */}

        <div className="text-center mb-12 sm:mb-16">
          <p className="uppercase tracking-[5px] text-[#72b2ff] text-sm">
            What Sets Us Apart
          </p>

          <h2 className="text-[55px] sm:text-[65px] lg:text-[75px] font-normal leading-none mt-5 text-black">
            By The Numbers
          </h2>
        </div>

        {/* Stats */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white text-center px-6 py-10 border border-black/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <h3 className="text-[60px] sm:text-[65px] lg:text-[70px] font-normal leading-none text-[#72b2ff] mb-5">
                {item.number}
              </h3>

              <h4 className="text-[15px] uppercase tracking-[1.5px] font-medium text-black mb-4">
                {item.title}
              </h4>

              <p className="text-[13px] sm:text-sm text-[#555] leading-[1.9] font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
