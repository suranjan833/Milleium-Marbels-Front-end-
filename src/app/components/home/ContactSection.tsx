"use client";

import { FormEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import { sendGetInTouch } from "../../Utils/api";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormState>(initialFormState);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      await sendGetInTouch(formData);

      setSubmitted(true);
      setFormData(initialFormState);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#4f88d2] px-5 py-16 sm:px-8 md:px-10 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1220px] flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
        {/* Heading */}

        <div className="w-full text-left lg:w-[28%]">
          <h2 className="font-[var(--font-open-sans)] text-[38px]  lg:text-[55px] font-light uppercase leading-[0.95] tracking-[0.04em] text-white">
            LET'S
            <br />
            GET IN
            <br />
            TOUCH
          </h2>
        </div>

        {/* Form */}

        <div className="w-full max-w-[600px] mx-auto lg:mx-0 lg:w-[62%]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <TextField
              fullWidth
              variant="standard"
              label="NAME"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              sx={textFieldStyles}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <TextField
                fullWidth
                variant="standard"
                label="EMAIL"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                variant="standard"
                label="PHONE"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                sx={textFieldStyles}
              />
            </div>

            <TextField
              fullWidth
              variant="standard"
              label="MESSAGE"
              multiline
              minRows={1}
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              sx={textFieldStyles}
            />

            {submitted && (
              <div className="p-3 bg-green-500/20 border border-green-400 text-white text-xs">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-400 text-white text-xs">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={submitting}
              sx={{
                minWidth: 140,
                width: "100%",
                borderRadius: 1,
                backgroundColor: "#133a70",
                px: 3,
                py: 1.5,
                fontFamily: "var(--font-open-sans)",
                fontSize: "0.95rem",
                fontWeight: 700,
                marginTop: "20px",

                "@media (min-width:640px)": {
                  width: "auto",
                },

                "&:hover": {
                  backgroundColor: "#0f2d56",
                },

                "&.Mui-disabled": {
                  backgroundColor: "#133a70",
                  opacity: 0.6,
                  color: "white",
                },
              }}
            >
              {submitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

const textFieldStyles = {
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.9)",
    fontFamily: "var(--font-open-sans)",
    fontSize: "0.95rem",
    letterSpacing: "0.06em",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#ffffff",
  },

  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    color: "#ffffff",
  },

  "& .MuiInputBase-root": {
    color: "#ffffff",
    fontFamily: "var(--font-open-sans)",
  },

  "& .MuiInputBase-input": {
    paddingTop: "4px",
    paddingBottom: "10px",
  },

  "& .MuiInput-underline:before": {
    borderBottomColor: "rgba(255,255,255,0.75)",
  },

  "& .MuiInput-underline:hover:not(.Mui-disabled,.Mui-error):before": {
    borderBottomColor: "#ffffff",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "#ffffff",
  },

  "& .MuiInput-underline:before,& .MuiInput-underline:after": {
    borderBottomWidth: "1px",
  },
};
