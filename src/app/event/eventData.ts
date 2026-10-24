import { EventApiResponse, EventPost } from "./event.types";

export const eventApiData: EventApiResponse = {
  count: 6,
  total_pages: 1,
  current_page: 1,
  page_size: 6,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      title: "Marmomac 2026 – The World's Premier Stone & Design Fair",
      slug: "marmomac-2026-stone-design-fair",
      excerpt:
        "Millenium Marbles returns to Verona, Italy for Marmomac 2026, showcasing our most exquisite Italian marble collections. Visit Hall 7, Booth B12 to experience our latest imports firsthand.",
      hero_image: "/assets/about/stock-banner.jpg",
      start_date: "2026-09-29",
      end_date: "2026-10-02",
      start_date_formatted: "MONDAY, 29 SEPTEMBER 2026",
      end_date_formatted: "THURSDAY, 2 OCTOBER 2026",
      location: "Verona, Italy",
      venue: "Veronafiere Exhibition Centre — Hall 7, Booth B12",
      category: { id: 1, name: "TRADE FAIR", slug: "trade-fair" },
      category_name: "TRADE FAIR",
      organizer: "Millenium Marbles",
      is_featured: true,
      registration_url: "https://www.marmomac.com/en/",
      url: "/event/marmomac-2026-stone-design-fair/",
      body: [
        { type: "heading" as const, value: "About Marmomac" },
        {
          type: "paragraph" as const,
          value:
            "<p>Marmomac is the leading global event for the natural stone industry, held annually in Verona, Italy. It brings together over 1,500 exhibitors and 50,000+ professional visitors from across the world — architects, designers, developers, and stone connoisseurs who shape the future of the industry.</p>",
        },
        {
          type: "paragraph" as const,
          value:
            "<p>For Millenium Marbles, Marmomac is more than an exhibition — it is the place where we hand-select each slab that eventually finds its way into India's most prestigious homes and commercial spaces. Our team spends weeks in the quarries before the show, curating only the blocks that meet our uncompromising standards.</p>",
        },
        { type: "heading" as const, value: "What to Expect at Our Booth" },
        {
          type: "paragraph" as const,
          value:
            "<p>This year we are unveiling twelve new marble varieties sourced directly from Carrara, Botticino, and Sicilian quarries. Each slab has been personally inspected by our senior procurement team.</p>",
        },
        {
          type: "paragraph" as const,
          value:
            "<p>We will also debut our interactive digital wall — a life-size installation that lets architects visualize our entire collection in real-world settings using augmented reality overlays.</p>",
        },
        { type: "heading" as const, value: "Exclusive Pre-Booking for Indian Clients" },
        {
          type: "paragraph" as const,
          value:
            "<p>Indian buyers and design firms attending Marmomac can pre-book slabs directly from the fair floor. These slabs will be shipped to our Silvassa and Shoolagiri warehouses within 45 days, at priority rates available only during the exhibition window.</p>",
        },
      ],
    },
    {
      id: 2,
      title: "Grand Launch – The Eterna Collection at Gurugram Showroom",
      slug: "eterna-collection-launch-gurugram",
      excerpt:
        "An evening of art, architecture, and the finest Italian marble. Join us at the Millenium Marbles Gurugram showroom for the exclusive unveiling of the Eterna Collection — a curated line of book-matched slabs for statement interiors.",
      hero_image: "/assets/about/factory1.jpg",
      start_date: "2026-11-15",
      end_date: "2026-11-15",
      start_date_formatted: "SATURDAY, 15 NOVEMBER 2026",
      end_date_formatted: "SATURDAY, 15 NOVEMBER 2026",
      location: "Gurugram, Haryana",
      venue: "Millenium Marbles Showroom, Sector 48, Gurugram",
      category: { id: 2, name: "COLLECTION LAUNCH", slug: "collection-launch" },
      category_name: "COLLECTION LAUNCH",
      organizer: "Millenium Marbles",
      is_featured: true,
      registration_url: "",
      url: "/event/eterna-collection-launch-gurugram/",
      body: [
        { type: "heading" as const, value: "Introducing the Eterna Collection" },
        {
          type: "paragraph" as const,
          value:
            "<p>After eighteen months of curation across quarries in Carrara, Siena, and Verona, we are proud to present the Eterna Collection — our most ambitious marble line to date. The collection features twelve book-matched slab pairs that create mirror-image veining patterns across expansive surfaces.</p>",
        },
        { type: "heading" as const, value: "Evening Programme" },
        {
          type: "paragraph" as const,
          value:
            "<p>The launch evening begins at 6:30 PM with a champagne reception, followed by a keynote from renowned Italian architect Marco Ferretti on 'The Language of Stone in Contemporary Indian Architecture.' The collection reveal takes place at 8:00 PM sharp.</p>",
        },
        { type: "heading" as const, value: "RSVP Information" },
        {
          type: "paragraph" as const,
          value:
            "<p>Attendance is by invitation only. If you are an architect, interior designer, or prospective client interested in attending, please email events@milleniummarbles.com.</p>",
        },
      ],
    },
    {
      id: 3,
      title: "India Design ID 2026 – Millenium Marbles Showcase",
      slug: "india-design-id-2026-showcase",
      excerpt:
        "We are proud to be the official natural stone partner for India Design ID 2026 in New Delhi. Visit our immersive pavilion constructed entirely from Italian marble.",
      hero_image: "/assets/about/factory2.jpg",
      start_date: "2026-02-13",
      end_date: "2026-02-16",
      start_date_formatted: "THURSDAY, 13 FEBRUARY 2026",
      end_date_formatted: "SUNDAY, 16 FEBRUARY 2026",
      location: "New Delhi, India",
      venue: "NSIC Grounds, Okhla — Pavilion A",
      category: { id: 3, name: "EXHIBITION", slug: "exhibition" },
      category_name: "EXHIBITION",
      organizer: "India Design ID",
      is_featured: false,
      registration_url: "https://www.indiadesignid.com/",
      url: "/event/india-design-id-2026-showcase/",
      body: [
        { type: "heading" as const, value: "Our Pavilion Concept" },
        {
          type: "paragraph" as const,
          value:
            "<p>For India Design ID 2026, we have built an immersive pavilion constructed entirely from natural Italian marble. The space demonstrates how stone can transcend its traditional role as flooring material and become the defining element of architectural storytelling.</p>",
        },
        { type: "heading" as const, value: "Masterclass Schedule" },
        {
          type: "paragraph" as const,
          value:
            "<p><strong>14 February, 3:00 PM</strong> — 'Specifying Natural Stone for Luxury Indian Interiors' with our Head of Design, Ananya Kapoor.</p>",
        },
      ],
    },
    {
      id: 4,
      title: "Exclusive Factory Walkthrough – Silvassa Processing Unit",
      slug: "factory-walkthrough-silvassa-2026",
      excerpt:
        "See where the magic happens. We are opening our Silvassa processing facility for a guided tour designed exclusively for architects and interior designers.",
      hero_image: "/assets/about/billboard.jpg",
      start_date: "2026-12-05",
      end_date: "2026-12-05",
      start_date_formatted: "FRIDAY, 5 DECEMBER 2026",
      end_date_formatted: "FRIDAY, 5 DECEMBER 2026",
      location: "Silvassa, Dadra & Nagar Haveli",
      venue: "Millenium Marbles Processing Facility, Silvassa",
      category: { id: 4, name: "FACTORY TOUR", slug: "factory-tour" },
      category_name: "FACTORY TOUR",
      organizer: "Millenium Marbles",
      is_featured: false,
      registration_url: "",
      url: "/event/factory-walkthrough-silvassa-2026/",
      body: [
        { type: "heading" as const, value: "Behind the Scenes at Silvassa" },
        {
          type: "paragraph" as const,
          value:
            "<p>Our Silvassa facility spans 80,000 square feet and houses state-of-the-art Italian machinery including a Breton CNC work centre and a multi-wire gangsaw from Pedrini.</p>",
        },
      ],
    },
    {
      id: 5,
      title: "Architect Roundtable – The Future of Natural Stone in Indian Architecture",
      slug: "architect-roundtable-natural-stone-2026",
      excerpt:
        "An intimate gathering of India's leading architects and designers to discuss the evolving role of natural stone in contemporary Indian architecture. Hosted at our Mumbai showroom.",
      hero_image: "/assets/about/stock-banner.jpg",
      start_date: "2026-07-18",
      end_date: "2026-07-18",
      start_date_formatted: "SATURDAY, 18 JULY 2026",
      end_date_formatted: "SATURDAY, 18 JULY 2026",
      location: "Mumbai, Maharashtra",
      venue: "Millenium Marbles Showroom, Lower Parel, Mumbai",
      category: { id: 5, name: "CONFERENCE", slug: "conference" },
      category_name: "CONFERENCE",
      organizer: "Millenium Marbles",
      is_featured: false,
      registration_url: "",
      url: "/event/architect-roundtable-natural-stone-2026/",
      body: [
        { type: "heading" as const, value: "The Roundtable" },
        {
          type: "paragraph" as const,
          value:
            "<p>The Architect Roundtable is our annual forum where fifteen of India's most respected architects gather to share insights, debate trends, and shape the conversation around natural stone usage in the subcontinent.</p>",
        },
      ],
    },
    {
      id: 6,
      title: "Virtual Stone Selection Workshop for Design Professionals",
      slug: "virtual-stone-selection-workshop-2026",
      excerpt:
        "Join our senior stone consultants for a live, interactive workshop on how to select, specify, and source the right marble for your project — entirely online.",
      hero_image: "/assets/about/factory1.jpg",
      start_date: "2026-08-22",
      end_date: "2026-08-22",
      start_date_formatted: "SATURDAY, 22 AUGUST 2026",
      end_date_formatted: "SATURDAY, 22 AUGUST 2026",
      location: "Online (Zoom)",
      venue: "Virtual — Zoom Webinar",
      category: { id: 6, name: "WORKSHOP", slug: "workshop" },
      category_name: "WORKSHOP",
      organizer: "Millenium Marbles",
      is_featured: false,
      registration_url: "https://zoom.us/webinar/register",
      url: "/event/virtual-stone-selection-workshop-2026/",
      body: [
        { type: "heading" as const, value: "Workshop Overview" },
        {
          type: "paragraph" as const,
          value:
            "<p>This workshop introduces our virtual slab inspection system, which uses three calibrated 4K cameras, controlled studio lighting, and real-time streaming to give you a near-physical viewing experience.</p>",
        },
      ],
    },
  ],
  sidebar: {
    upcoming_events: [
      {
        id: 1,
        title: "Marmomac 2026 – The World's Premier Stone & Design Fair",
        slug: "marmomac-2026-stone-design-fair",
        hero_image: "/assets/about/stock-banner.jpg",
        start_date: "2026-09-29",
        location: "Verona, Italy",
      },
      {
        id: 2,
        title: "Grand Launch – The Eterna Collection at Gurugram Showroom",
        slug: "eterna-collection-launch-gurugram",
        hero_image: "/assets/about/factory1.jpg",
        start_date: "2026-11-15",
        location: "Gurugram, Haryana",
      },
      {
        id: 5,
        title: "Architect Roundtable – The Future of Natural Stone",
        slug: "architect-roundtable-natural-stone-2026",
        hero_image: "/assets/about/stock-banner.jpg",
        start_date: "2026-07-18",
        location: "Mumbai, Maharashtra",
      },
      {
        id: 4,
        title: "Exclusive Factory Walkthrough – Silvassa",
        slug: "factory-walkthrough-silvassa-2026",
        hero_image: "/assets/about/billboard.jpg",
        start_date: "2026-12-05",
        location: "Silvassa",
      },
    ],
    categories: [
      { id: 1, name: "TRADE FAIR", slug: "trade-fair" },
      { id: 2, name: "COLLECTION LAUNCH", slug: "collection-launch" },
      { id: 3, name: "EXHIBITION", slug: "exhibition" },
      { id: 4, name: "FACTORY TOUR", slug: "factory-tour" },
      { id: 5, name: "CONFERENCE", slug: "conference" },
      { id: 6, name: "WORKSHOP", slug: "workshop" },
    ],
  },
};

export function getEventPostBySlug(slug: string): EventPost {
  const found = eventApiData.results.find((post) => post.slug === slug);
  return found || eventApiData.results[0];
}
