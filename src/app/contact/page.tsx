import Link from "next/link";
import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Space */}
      <div
        className="
          bg-[#101010]
          text-white
          h-0
          lg:h-40
        "
      ></div>

      {/* Contact Title */}
      <div
        className="
          bg-[#101010]
          text-white
          mb-0
          lg:mb-10
        "
      >
        <div
          className="
            container
            mx-auto
            px-5
            sm:px-8
            max-w-[1240px]
            flex
            justify-center
            items-center
            py-2
            lg:py-3
          "
        >
          <h4
            className="
              text-[32px]
              sm:text-[36px]
              lg:text-[42px]
              font-serif
              tracking-wider
              font-light
              text-center
            "
          >
            Contact
          </h4>
        </div>
      </div>

      {/* Locations Section */}
      <section
        className="
          py-8
          sm:py-10
          lg:py-10
        "
      >
        <div
          className="
            container
            mx-auto
            px-5
            sm:px-8
            max-w-[1240px]
          "
        >
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
              lg:gap-x-20
              lg:gap-y-16
            "
          >
            {locations.map((item, index) => (
              <div
                key={index}
                className="
                  min-h-[330px]
                  flex
                  flex-col
                  justify-between
                  rounded-sm

                  sm:border
                  sm:border-gray-100
                  sm:p-6

                  lg:border-0
                  lg:p-0

                  transition-all
                  duration-300

                  sm:hover:-translate-y-1
                "
              >
                <div>
                  <h4
                    className="
                      text-[21px]
                      lg:text-[22px]
                      text-[#121232]
                      font-semibold
                      mb-3
                    "
                  >
                    {item.title}
                  </h4>

                  <span
                    className="
                      inline-block
                      h-[1px]
                      w-[40px]
                      bg-[#133661]
                    "
                  ></span>
                </div>

                <div
                  className="
                    mt-5
                    text-[14px]
                    sm:text-[15px]
                    text-[#535353]
                    leading-relaxed
                    space-y-1
                  "
                >
                  {item.address.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}

                  <ul className="pt-3">
                    {item.phones.map((phone, idx) => (
                      <li
                        key={idx}
                        className="
                          font-semibold
                          text-[#333]
                        "
                      >
                        {phone}
                      </li>
                    ))}
                  </ul>

                  {item.email && (
                    <p
                      className="
                        mt-2
                        font-semibold
                        text-[#333]
                        break-all
                      "
                    >
                      {item.email}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <Link
                    href={item.directionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      bg-[#133661]
                      text-white
                      text-[11px]
                      font-bold
                      px-[22px]
                      py-[10px]
                      uppercase
                      tracking-[0.15em]
                      hover:bg-[#1a4478]
                      transition-colors
                      duration-300
                    "
                  >
                    Get Directions
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />
    </main>
  );
}

const locations = [
  {
    id: 1,
    title: "Silvassa Factory",
    address: [
      "Survey No. 269/1/1/1/1/3,",
      "Village Athal,",
      "PO Naroli, U.T. of Dadra & Nagar Haveli,",
      "Silvassa - 396235",
    ],
    phones: ["+91 7069014000"],
    email: "silvassaqueries@millenniummarbles.com",
    directionUrl: "https://maps.app.goo.gl/rNPytKgDubGWnJsm6",
  },
  {
    id: 2,
    title: "Shoolagiri Factory",
    address: [
      "Log Hub N.H. 7,",
      "Kasturiba School Backside Gollapali Post",
      "Shoolagiri Village, District Krishnagiri Hosur,",
      "Tamil Nadu - 635117",
    ],
    phones: ["+91 9731005920"],
    email: "sourabh@milleniummarbles.com",
    directionUrl: "https://maps.app.goo.gl/X5LqEp7hqdtLWgdv9",
  },
  {
    id: 3,
    title: "Kishangarh Factory",
    address: [
      "Plot no. 14,",
      "Shree Vinayak Industrial Area, Village Khatoli,",
      "Makarana Road, Kishangarh",
      "Rajasthan - 305801",
    ],
    phones: ["+91 7550768888"],
    email: "milleniummarblekishangarh@gmail.com",
    directionUrl: "https://maps.app.goo.gl/aBWRdCcDu5yVtMEM7",
  },
  {
    id: 4,
    title: "Mumbai Showroom",
    address: [
      "Airport Service Road,",
      "Western Express Highway",
      "Vile Parle (East),",
      "Mumbai - 400099",
    ],
    phones: ["+91 9022758688"],
    email: "",
    directionUrl: "https://maps.app.goo.gl/7WJZGBWz7TsPQEVu5",
  },

  {
    id: 5,
    title: "Gurugram Showroom",
    address: [
      "MUSTIL NoO. 7, KILA NO. 13/2, Near Petrol Pump,",
      "Baliawas, Gurugram, Bandhwari,",
      "Haryana - 122101",
    ],
    phones: ["+91 9266626626"],
    email: "infoggn@milleniummarbles.com",
    directionUrl: "https://maps.app.goo.gl/UEsn2g34T2nHWufA9",
  },
  {
    id: 6,
    title: "Indore Showroom",
    address: [
      "Infront of, Vistara Twp",
      "Millenium marble, near sheraton grand",
      "Indore",
      "Madhya Pradesh - 452010",
    ],
    phones: ["+91 9893888885"],
    email: "",
    directionUrl: "https://maps.app.goo.gl/62Qd6N2P3t1eEbEu6",
  },
];
