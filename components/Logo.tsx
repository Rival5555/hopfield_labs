import React from "react";

export type LogoProps = {
  variant?: "mark" | "horizontal" | "stacked" | "wordmark";
  size?: number; // height in px, default 32
  className?: string;
  title?: string; // renders <title> for a11y; omit => aria-hidden="true"
};

/**
 * Hopfield Labs — Production Vector Logo Component
 * Hand-authored pure SVG geometry based on Hopfield network recurrence.
 * Single-color currentColor inheritance, responsive auto-scaling, zero hardcoded hex.
 */
export function Logo({
  variant = "mark",
  size = 32,
  className = "",
  title,
}: LogoProps) {
  const commonSvgProps = {
    className,
    style: {
      height: `${size}px`,
      width: "auto",
      display: "inline-block",
      verticalAlign: "middle",
      flexShrink: 0,
    } as React.CSSProperties,
    role: title ? "img" : undefined,
    "aria-hidden": title ? undefined : (true as const),
  };

  // 1. Primary Mark Variant (48×48 viewBox)
  if (variant === "mark") {
    return (
      <svg viewBox="0 0 48 48" fill="none" {...commonSvgProps}>
        {title ? <title>{title}</title> : null}
        <g fill="currentColor" stroke="currentColor">
          {/* Recurrence Feedback Loop */}
          <path
            d="M 31,24.5 C 42,24.5 42,6.5 21,6.5 C 15,6.5 11,9 11,11.5"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Graph Edges / H Letterform Stems */}
          <line x1="11" y1="11.5" x2="11" y2="37.5" strokeWidth="2.75" strokeLinecap="round" />
          <line x1="31" y1="11.5" x2="31" y2="37.5" strokeWidth="2.75" strokeLinecap="round" />
          <line x1="11" y1="24.5" x2="31" y2="24.5" strokeWidth="2.75" strokeLinecap="round" />

          {/* Graph Vertices / Attractor States */}
          <circle cx="11" cy="11.5" r="3.75" stroke="none" />
          <circle cx="11" cy="24.5" r="3.25" stroke="none" />
          <circle cx="11" cy="37.5" r="3.25" stroke="none" />
          <circle cx="31" cy="11.5" r="3.25" stroke="none" />
          <circle cx="31" cy="24.5" r="3.25" stroke="none" />
          <circle cx="31" cy="37.5" r="3.25" stroke="none" />
        </g>
      </svg>
    );
  }

  // Outlined Wordmark Glyphs: "HOPFIELD LABS" (Zero font dependency)
  const OutlinedWordmarkGlyphs = (
    <g fill="currentColor" stroke="none">
      {/* H */}
      <path d="M 0,6 L 3,6 L 3,12.5 L 11,12.5 L 11,6 L 14,6 L 14,22 L 11,22 L 11,15.5 L 3,15.5 L 3,22 L 0,22 Z" />
      {/* O */}
      <path d="M 23,6 C 18,6 16,8.5 16,14 C 16,19.5 18,22 23,22 C 28,22 30,19.5 30,14 C 30,8.5 28,6 23,6 Z M 23,8.8 C 26,8.8 27,10.5 27,14 C 27,17.5 26,19.2 23,19.2 C 20,19.2 19,17.5 19,14 C 19,10.5 20,8.8 23,8.8 Z" />
      {/* P */}
      <path d="M 36,6 L 45,6 C 48.5,6 50,7.5 50,11 C 50,14.5 48.5,16 45,16 L 39,16 L 39,22 L 36,22 Z M 39,8.8 L 39,13.2 L 44.5,13.2 C 46.5,13.2 47.2,12.5 47.2,11 C 47.2,9.5 46.5,8.8 44.5,8.8 Z" />
      {/* F */}
      <path d="M 56,6 L 69,6 L 69,8.8 L 59,8.8 L 59,12.5 L 67,12.5 L 67,15.2 L 59,15.2 L 59,22 L 56,22 Z" />
      {/* I */}
      <path d="M 75,6 L 78,6 L 78,22 L 75,22 Z" />
      {/* E */}
      <path d="M 85,6 L 98,6 L 98,8.8 L 88,8.8 L 88,12.5 L 96,12.5 L 96,15.2 L 88,15.2 L 88,19.2 L 98,19.2 L 98,22 L 85,22 Z" />
      {/* L */}
      <path d="M 104,6 L 107,6 L 107,19.2 L 117,19.2 L 117,22 L 104,22 Z" />
      {/* D */}
      <path d="M 123,6 L 131,6 C 135.5,6 138,8.5 138,14 C 138,19.5 135.5,22 131,22 L 123,22 Z M 126,8.8 L 126,19.2 L 130.5,19.2 C 133.5,19.2 135,17.5 135,14 C 135,10.5 133.5,8.8 130.5,8.8 Z" />
      {/* L */}
      <path d="M 152,6 L 155,6 L 155,19.2 L 165,19.2 L 165,22 L 152,22 Z" />
      {/* A */}
      <path d="M 175.5,6 L 178.5,6 L 186,22 L 182.7,22 L 180.8,18 L 173.2,18 L 171.3,22 L 168,22 Z M 174.5,15.4 L 179.5,15.4 L 177,10 Z" />
      {/* B */}
      <path d="M 192,6 L 201,6 C 204.5,6 206,7.5 206,9.8 C 206,11.5 205,12.5 203.5,13 C 205.5,13.5 206.5,14.8 206.5,17 C 206.5,19.8 204.5,22 200.5,22 L 192,22 Z M 195,8.6 L 195,12.2 L 200,12.2 C 202,12.2 203,11.5 203,10.4 C 203,9.3 202,8.6 200,8.6 Z M 195,14.5 L 195,19.4 L 200.5,19.4 C 202.5,19.4 203.5,18.5 203.5,17 C 203.5,15.5 202.5,14.5 200.5,14.5 Z" />
      {/* S */}
      <path d="M 221,6 C 224,6 226,7.5 226,9.5 L 223,9.5 C 223,8.3 221.8,7.8 220.8,7.8 C 218.8,7.8 217.5,8.8 217.5,10.2 C 217.5,11.5 218.5,12.2 220.5,12.8 L 222,13.3 C 224.8,14.2 226.5,15.5 226.5,18 C 226.5,20.8 224,22 220.5,22 C 217,22 214.5,20.2 214.5,18 L 217.5,18 C 217.5,19.5 219,20.2 220.5,20.2 C 222.5,20.2 223.5,19.2 223.5,18 C 223.5,16.8 222.5,16 220.5,15.4 L 219,14.9 C 216.2,14 214.5,12.8 214.5,10.2 C 214.5,7.8 217,6 221,6 Z" />
    </g>
  );

  // 2. Wordmark Only Variant (280×28 viewBox)
  if (variant === "wordmark") {
    return (
      <svg viewBox="0 0 280 28" fill="currentColor" {...commonSvgProps}>
        {title ? <title>{title}</title> : null}
        {OutlinedWordmarkGlyphs}
      </svg>
    );
  }

  // 3. Horizontal Lockup (310×48 viewBox)
  if (variant === "horizontal") {
    return (
      <svg viewBox="0 0 310 48" fill="currentColor" {...commonSvgProps}>
        {title ? <title>{title}</title> : null}
        {/* Mark */}
        <g fill="currentColor" stroke="currentColor">
          <path
            d="M 31,24.5 C 42,24.5 42,6.5 21,6.5 C 15,6.5 11,9 11,11.5"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line x1="11" y1="11.5" x2="11" y2="37.5" strokeWidth="2.75" strokeLinecap="round" />
          <line x1="31" y1="11.5" x2="31" y2="37.5" strokeWidth="2.75" strokeLinecap="round" />
          <line x1="11" y1="24.5" x2="31" y2="24.5" strokeWidth="2.75" strokeLinecap="round" />
          <circle cx="11" cy="11.5" r="3.75" stroke="none" />
          <circle cx="11" cy="24.5" r="3.25" stroke="none" />
          <circle cx="11" cy="37.5" r="3.25" stroke="none" />
          <circle cx="31" cy="11.5" r="3.25" stroke="none" />
          <circle cx="31" cy="24.5" r="3.25" stroke="none" />
          <circle cx="31" cy="37.5" r="3.25" stroke="none" />
        </g>
        {/* Wordmark */}
        <g transform="translate(64, 10)">
          {OutlinedWordmarkGlyphs}
        </g>
      </svg>
    );
  }

  // 4. Stacked Lockup (260×120 viewBox)
  return (
    <svg viewBox="0 0 260 120" fill="currentColor" {...commonSvgProps}>
      {title ? <title>{title}</title> : null}
      {/* Mark Centered */}
      <g transform="translate(106, 16)" fill="currentColor" stroke="currentColor">
        <path
          d="M 31,24.5 C 42,24.5 42,6.5 21,6.5 C 15,6.5 11,9 11,11.5"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line x1="11" y1="11.5" x2="11" y2="37.5" strokeWidth="2.75" strokeLinecap="round" />
        <line x1="31" y1="11.5" x2="31" y2="37.5" strokeWidth="2.75" strokeLinecap="round" />
        <line x1="11" y1="24.5" x2="31" y2="24.5" strokeWidth="2.75" strokeLinecap="round" />
        <circle cx="11" cy="11.5" r="3.75" stroke="none" />
        <circle cx="11" cy="24.5" r="3.25" stroke="none" />
        <circle cx="11" cy="37.5" r="3.25" stroke="none" />
        <circle cx="31" cy="11.5" r="3.25" stroke="none" />
        <circle cx="31" cy="24.5" r="3.25" stroke="none" />
        <circle cx="31" cy="37.5" r="3.25" stroke="none" />
      </g>
      {/* Centered Wordmark */}
      <g transform="translate(17, 80)">
        {OutlinedWordmarkGlyphs}
      </g>
    </svg>
  );
}

export default Logo;
