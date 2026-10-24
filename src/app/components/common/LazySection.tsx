"use client";

import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animation?: "fade-up" | "fade-in" | "scale-up";
  delay?: number;
}

export default function LazySection({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "100px 0px",
  animation = "fade-up",
  delay = 0,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, delay]);

  const getAnimationStyles = () => {
    const base = "transition-all duration-1000 ease-out";
    if (animation === "fade-up") {
      return isVisible
        ? `${base} opacity-100 translate-y-0`
        : `${base} opacity-0 translate-y-12`;
    }
    if (animation === "scale-up") {
      return isVisible
        ? `${base} opacity-100 scale-100`
        : `${base} opacity-0 scale-95`;
    }
    // default fade-in
    return isVisible ? `${base} opacity-100` : `${base} opacity-0`;
  };

  return (
    <div
      ref={sectionRef}
      className={`${className} ${getAnimationStyles()}`}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
}
