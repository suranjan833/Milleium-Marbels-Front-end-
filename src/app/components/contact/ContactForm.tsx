"use client";

import React, { useState } from "react";
import { TextField } from "@mui/material";
import { sendContactMessage } from "../../Utils/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // Clear messages when user starts typing again
      if (submitted || error) {
        setSubmitted(false);
        setError(null);
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await sendContactMessage({
        ...formData,
        subject: formData.subject.trim() || "General Inquiry",
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const muiTextFieldStyle = {
    backgroundColor: "#ffffff",
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      "& fieldset": {
        borderColor: "#d1d5db",
      },
      "&:hover fieldset": {
        borderColor: "#9ca3af",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0f2d4a",
        borderWidth: "1px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "13px 16px",
      fontSize: "14px",
      color: "#374151",
      fontFamily: "var(--font-primary, sans-serif)",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#9ca3af",
      opacity: 1,
    },
  };

  return (
    <section className="bg-[#f8f9fa] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px]">
        <div className="grid grid-cols-1 lg:grid-cols-[27%_68%] gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading section */}
          <div>
            <span className="text-[#60a5fa] text-xs sm:text-sm font-bold uppercase tracking-wider block mb-3">
              CONTACT US
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] text-[#112233] leading-tight font-normal mb-6">
              Send us a<br className="hidden sm:inline" /> message
            </h2>
            <div className="w-12 h-[2px] bg-gray-300"></div>
          </div>

          {/* Right Column: Form inputs section */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  placeholder="Your Name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange("name")}
                  required
                  disabled={submitting}
                  sx={muiTextFieldStyle}
                />
                <TextField
                  fullWidth
                  type="email"
                  placeholder="Your Email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                  disabled={submitting}
                  sx={muiTextFieldStyle}
                />
              </div>

              {/* Row 2: Phone */}
              <div>
                <TextField
                  fullWidth
                  placeholder="Phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  required
                  disabled={submitting}
                  sx={muiTextFieldStyle}
                />
              </div>

              {/* Row 3: Subject */}
              <div>
                <TextField
                  fullWidth
                  placeholder="Subject"
                  variant="outlined"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                  disabled={submitting}
                  sx={muiTextFieldStyle}
                />
              </div>

              {/* Row 4: Message */}
              <div>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Message"
                  variant="outlined"
                  value={formData.message}
                  onChange={handleChange("message")}
                  required
                  disabled={submitting}
                  sx={{
                    ...muiTextFieldStyle,
                    "& .MuiInputBase-root": {
                      padding: 0,
                    },
                    "& .MuiInputBase-input": {
                      padding: "14px 16px",
                    },
                  }}
                />
              </div>

              {/* Success Alert */}
              {submitted && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-medium">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0f2d4a] hover:bg-[#18426c] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wider uppercase px-7 py-3.5 transition-colors duration-200 shadow-sm cursor-pointer"
                >
                  {submitting ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}