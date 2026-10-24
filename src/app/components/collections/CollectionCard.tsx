import { CollectionItem } from "./collections.types";
import Image from "next/image";

interface CollectionCardProps {
  item: CollectionItem;
}

export default function CollectionCard({ item }: CollectionCardProps) {
  const isRightAligned = item.align === "right";

  return (
    <div
      className={`w-full lg:w-[88%] xl:w-[82%] mb-20 lg:mb-32 ${
        isRightAligned ? "ml-auto" : "mr-auto"
      }`}
    >
      {/* Top Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 lg:gap-8 mb-6">
        {/* Left Texture Detail Image */}
        <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl lg:rounded-[36px] bg-[#1A1A1A] transition-transform duration-1000 ease-in-out hover:scale-110">
          <Image
            src={item.textureImage}
            alt={`${item.title} texture`}
            className="w-full h-full object-cover"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        {/* Left Intro Block */}
        <div className="pt-6 md:pt-14">
          <h3 className="text-3xl lg:text-[34px] font-normal text-white mb-3">
            {item.title}
          </h3>
          <span className="block w-8 h-[1px] bg-white mb-4"></span>
          <p className="text-[15px] text-white font-light leading-relaxed max-w-sm">
            {item.intro}
          </p>
        </div>
        </div>

        {/* Right Block Image */}
        <div>
        <div className="relative aspect-[1.3/1] w-full overflow-hidden rounded-3xl lg:rounded-[36px] bg-[#1A1A1A] transition-transform duration-1000 ease-in-out hover:scale-110">
          <Image
            src={item.blockImage}
            alt={`${item.title} block`}
            className="w-full h-full object-cover"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        {/* Right Detailed Description Block */}
        <div className="pt-6 md:pt-14">
          <p className="text-[15px] text-white font-light leading-relaxed">
            {item.description}
          </p>
        </div>
        </div>
      </div>

      {/* Bottom Text Content Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 lg:gap-8 items-start">
        

        
      </div> */}
    </div>
  );
}
