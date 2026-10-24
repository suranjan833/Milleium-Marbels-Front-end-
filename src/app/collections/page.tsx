import Link from "next/link";
import { getPageMetadata } from "../seo.config";
import { COLLECTIONS_DATA } from "../components/collections/collectionsData";
import CollectionCard from "../components/collections/CollectionCard";

export const metadata = getPageMetadata("collections");

export default function Collections() {
  return (
    <main className="bg-[#101010] text-white min-h-screen">
      {/* Spacer only for desktop */}
      <div className="hidden lg:block h-[120px] mb-10"></div>

      {/* Section 1: Hero / Collections Filter Header */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row justify-between gap-8">
          {/* <div className="w-full lg:w-[48%]">
            <h5 className="text-[14px] font-bold tracking-widest text-[#8C847B] uppercase mb-4">
              COLLECTIONS
            </h5>

            <ul className="flex flex-wrap items-center justify-between gap-4 text-[16px] text-[#A0A0A0]">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Exotic
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Granite
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Lime Stone
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Marbles
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Onyx
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Quartzite
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Travertine
                </Link>
              </li>
            </ul>
          </div> */}

          <div className="w-full text-center">
            <h4 className="text-[34px] font-normal mb-[10px] text-white">
              Our Collections
            </h4>

            <span className="inline-block w-[34px] h-[1px] bg-white mb-4"></span>

            <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
              We transform marble and natural stone into quality products for
              design and architecture. It is what we do best: we have had many
              years of practice.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Dynamic Collections List */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {COLLECTIONS_DATA.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}