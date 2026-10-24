"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface RichTextProps {
  content: string;
  className?: string;
  as?: React.ElementType;
}

export default function RichText({
  content,
  className = "",
  as: Component = "div",
}: RichTextProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>("");

  useEffect(() => {
    setSanitizedHtml(DOMPurify.sanitize(content));
  }, [content]);

  // Keep the server and first client render identical (raw content), then
  // sanitize once on the client after mount. This avoids a hydration mismatch
  // and removes the previous render-time double sanitization.
  const safeContent = sanitizedHtml || content;

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: safeContent }}
    />
  );
}
