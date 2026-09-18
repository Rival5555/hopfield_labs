"use client";

import * as React from "react";

export function ScrollRestoration() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent browser from automatically restoring previous scroll position down the page on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Unless a specific anchor hash is present, ensure the page starts at the hero section
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
