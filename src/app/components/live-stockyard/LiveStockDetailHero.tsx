"use client";

import { useRef, useState, FormEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Navigation } from "swiper/modules";
import { Dialog, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Link from "next/link";
import { sendGetInTouch } from "../../Utils/api";
import type { MarbleSlab, StoneMedia } from "./stockyard.types";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

interface LiveStockDetailHeroProps {
  data: MarbleSlab;
}

const modalFieldStyles = {
  "& .MuiInputLabel-root": {
    color: "#6B635B",
    fontSize: "0.85rem",
    letterSpacing: "0.05em",
    fontWeight: 600,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#8C6D46",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    "& fieldset": {
      borderColor: "#E5DFD7",
    },
    "&:hover fieldset": {
      borderColor: "#D4C9BD",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8C6D46",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#1C1815",
    fontSize: "0.95rem",
  },
};

export default function LiveStockDetailHero({ data }: LiveStockDetailHeroProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Enquiry Popup State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hello, I am interested in inquiring about ${data.name}${data.lot_number ? ` (Lot: ${data.lot_number})` : ""}.`,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const colorsText = data.colors?.map((c) => c.name).join(" / ") || "N/A";
  const originText = data.origin
    ? `${data.origin.city}, ${data.origin.country}`
    : "N/A";

  const mediaList: StoneMedia[] =
    data.media && data.media.length > 0
      ? data.media
      : [
          {
            id: 0,
            file_name: data.name,
            url: data.main_image,
            is_primary: true,
            sort_order: 1,
            media_type: "IMAGE",
            content_type: "image/jpeg",
          },
        ];

  const isVideo = (mediaItem: StoneMedia) =>
    mediaItem.media_type === "VIDEO" ||
    mediaItem.content_type?.startsWith("video/");

  const handleEnquirySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await sendGetInTouch({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEnquiryModalOpen(false);
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Details, Buttons & Features Box */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-serif text-[#1C1815] font-normal leading-tight mb-2">
              {data.name}
            </h1>

            {/* Location / Category */}
            {data.origin && (
              <div className="flex items-center gap-1.5 text-lg font-semibold text-[#6B635B] tracking-wider uppercase mb-6">
                <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "#6B635B" }} />
                <span>
                  {data?.stone_category?.name || "N/A"} - {data?.stone_type?.name || "N/A"}
                </span>
              </div>
            )}

            <div className="h-[1px] w-full bg-[#E5DFD7] my-6" />

            {/* Description */}
            <p className="text-base italic text-[#5C544C] leading-relaxed mb-6 font-light">
              {data.description || data.short_description}
            </p>

            <div className="h-[1px] w-full bg-[#E5DFD7] my-6" />

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Enquire Now */}
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full py-3.5 px-4 bg-[#B5956A] hover:bg-[#A38257] text-white text-lg font-bold tracking-widest uppercase transition-colors rounded-none text-center cursor-pointer"
              >
                ENQUIRE NOW
              </button>

              {/* WhatsApp */}
              <Link
                href={
                  data.whatsapp_number
                    ? `https://wa.me/${data.whatsapp_number}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-white border border-[#E5DFD7] text-[#25D366] hover:bg-[#F9F7F4] text-lg font-bold tracking-widest uppercase transition-colors rounded-none flex items-center justify-center gap-2 text-center"
              >
                <WhatsAppIcon sx={{ fontSize: 18, color: "#25D366" }} />
                <span>WHATSAPP</span>
              </Link>
            </div>
          </div>

          {/* Features Box */}
          <div className="border border-[#E5DFD7] p-6 lg:p-7 bg-white rounded-none">
            <h3 className="text-xl font-serif font-normal text-[#1C1815] mb-4">
              Features
            </h3>
            <div className="h-[1px] w-full bg-[#E5DFD7] mb-6" />

            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {/* Color */}
              <div>
                <span className="block text-[14px] font-bold text-[#8C847B] tracking-wider uppercase">
                  COLOR
                </span>
                <span className="text-[14px] font-semibold text-[#1C1815]">
                  {colorsText}
                </span>
              </div>

              {/* Origin */}
              <div>
                <span className="block text-[14px] font-bold text-[#8C847B] tracking-wider uppercase">
                  ORIGIN
                </span>
                <span className="text-[14px] font-semibold text-[#1C1815]">
                  {originText}
                </span>
              </div>

              {/* Stone Type */}
              <div>
                <span className="block text-[14px] font-bold text-[#8C847B] tracking-wider uppercase">
                  Stone Type
                </span>
                <span className="text-[14px] font-semibold text-[#1C1815]">
                  {data.stone_type?.name || "N/A"}
                </span>
              </div>

              {/* Thickness */}
              <div>
                <span className="block text-[14px] font-bold text-[#8C847B] tracking-wider uppercase">
                  THICKNESS
                </span>
                <span className="text-[14px] font-semibold text-[#1C1815]">
                  {data.thickness}
                </span>
              </div>

              {/* Dimensions */}
              <div>
                <span className="block text-[14px] font-bold text-[#8C847B] tracking-wider uppercase">
                  DIMENSIONS
                </span>
                <span className="text-[14px] font-semibold text-[#1C1815]">
                  {data.dimensions}
                </span>
              </div>

              {/* Lot Number */}
              <div>
                <span className="block text-[14px] font-bold text-[#8C847B] tracking-wider uppercase">
                  LOT NUMBER
                </span>
                <span className="text-[14px] font-semibold text-[#1C1815]">
                  {data.lot_number}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Swiper Media Slider & Thumbnails */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative w-full h-full min-h-[450px] lg:min-h-[580px] bg-[#F2ECE4] overflow-hidden group">
            {/* Swiper Main Slider */}
            <Swiper
              modules={[Navigation]}
              onSwiper={setMainSwiper}
              onSlideChange={(s) => setActiveIndex(s.activeIndex)}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (
                  typeof swiper.params.navigation !== "boolean" &&
                  swiper.params.navigation
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              className="w-full h-full min-h-[450px] lg:min-h-[580px]"
            >
              {mediaList.map((media, idx) => (
                <SwiperSlide key={media.id || idx}>
                  <div className="w-full h-full min-h-[450px] lg:min-h-[580px] relative overflow-hidden bg-[#F2ECE4] flex items-center justify-center">
                    {isVideo(media) ? (
                      <video
                        src={media.url}
                        controls
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover rounded-none max-h-[650px]"
                      />
                    ) : (
                      <Image
                        src={media.url}
                        alt={media.file_name || data.name}
                        className="w-full h-full object-cover rounded-none max-h-[650px]"
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Swiper Custom Navigation Arrow Buttons */}
            {mediaList.length > 1 && (
              <>
                <button
                  ref={prevRef}
                  aria-label="Previous Media"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white text-[#1C1815] shadow-md flex items-center justify-center transition-colors rounded-full"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  ref={nextRef}
                  aria-label="Next Media"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white text-[#1C1815] shadow-md flex items-center justify-center transition-colors rounded-full"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails row for multiple media items */}
          {mediaList.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto py-2 pr-2 scrollbar-thin">
              {mediaList.map((item, idx) => {
                const isActive = activeIndex === idx;
                const itemIsVideo = isVideo(item);
                return (
                  <button
                    key={item.id || idx}
                    onClick={() => {
                      setActiveIndex(idx);
                      mainSwiper?.slideTo(idx);
                    }}
                    className={`relative w-20 h-20 shrink-0 overflow-hidden bg-[#F2ECE4] border-2 transition-all ${
                      isActive
                        ? "border-[#8C6D46] opacity-100 scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    {itemIsVideo ? (
                      <div className="relative w-full h-full flex items-center justify-center bg-black/30">
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <PlayCircleIcon sx={{ color: "#ffffff", fontSize: 28 }} />
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={item.url}
                        alt={item.file_name}
                        className="w-full h-full object-cover"
                        fill
                        sizes="80px"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Popup Dialog */}
      <Dialog
        open={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#FAF8F5",
              borderRadius: "8px",
              p: { xs: 2.5, sm: 4 },
              border: "1px solid #E8E2D9",
            },
          },
        }}
      >
        <div className="flex justify-between items-center pb-3 border-b border-[#E8E2D9] mb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif text-[#1C1815] uppercase tracking-wider font-normal">
              ENQUIRE ABOUT {data.name}
            </h3>
            <p className="text-xs text-[#8C847B] mt-0.5">
              Fill in your details and our stone specialist will contact you shortly.
            </p>
          </div>
          <IconButton onClick={() => setEnquiryModalOpen(false)} size="small">
            <CloseIcon className="text-[#3D352E]" fontSize="small" />
          </IconButton>
        </div>

        <form onSubmit={handleEnquirySubmit} className="space-y-4">
          <div className="mt-6">
          <TextField
            fullWidth
            variant="outlined"
            label="NAME"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={modalFieldStyles}
          />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <TextField
              fullWidth
              variant="outlined"
              label="EMAIL"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              sx={modalFieldStyles}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="PHONE"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              sx={modalFieldStyles}
            />
          </div>
        <div className="mt-6">
          <TextField
            fullWidth
            variant="outlined"
            label="MESSAGE"
            multiline
            minRows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            sx={modalFieldStyles}
          />
          </div>

          {submitted && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-800 text-xs rounded">
              Thank you! Your enquiry has been sent successfully.
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-800 text-xs rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                backgroundColor: "#B5956A",
                px: 4,
                py: 1.2,
                color: "#ffffff",
                fontWeight: 700,
                letterSpacing: "0.1em",
                borderRadius: 0,
                "&:hover": { backgroundColor: "#A38257" },
                "&.Mui-disabled": { backgroundColor: "#B5956A", opacity: 0.6, color: "#ffffff" },
              }}
            >
              {submitting ? "SENDING..." : "SUBMIT ENQUIRY"}
            </Button>
          </div>
        </form>
      </Dialog>
    </section>
  );
}
