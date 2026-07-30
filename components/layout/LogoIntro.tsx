// src/components/layout/LogoIntro.tsx
// Full-screen splash: logo fades + scales in, holds briefly, then fades out
// to reveal the homepage. Shows once per browser session (not on every
// page navigation) — remove the sessionStorage check if you want it on
// every single load instead.

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SHOW_DURATION_MS = 900; // how long the logo stays fully visible
const FADE_MS = 600; // fade in/out duration

export function LogoIntro() {
  const [hidden, setHidden] = useState(false); // fully removes the splash
  const [mounted, setMounted] = useState(false); // triggers logo fade+scale IN
  const [exiting, setExiting] = useState(false); // triggers whole overlay fade OUT

  useEffect(() => {
    // Skip if already shown this session
    if (typeof window !== "undefined" && sessionStorage.getItem("tp-intro-shown")) {
      setHidden(true);
      return;
    }

    // Double rAF: ensures the browser paints the initial (opacity:0) state
    // on one frame before we flip to opacity:1 on the next — this is what
    // makes the logo start fading in immediately, in sync with the
    // background appearing, instead of waiting on a timer.
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });

    const t1 = setTimeout(() => setExiting(true), FADE_MS + SHOW_DURATION_MS);
    const t2 = setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem("tp-intro-shown", "true");
    }, FADE_MS + SHOW_DURATION_MS + FADE_MS);

    // Lock scroll while intro is showing
    document.body.style.overflow = "hidden";
    const unlock = setTimeout(() => {
      document.body.style.overflow = "";
    }, FADE_MS + SHOW_DURATION_MS + FADE_MS);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(unlock);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-cream transition-opacity ease-in-out"
      style={{
        opacity: exiting ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: exiting ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <div
        className="transition-all ease-out"
        style={{
          transitionDuration: `${FADE_MS}ms`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(0.85)",
        }}
      >
        {/* IMPORTANT: this logo file must have a transparent background. */}
        <Image
          src="/images/logo-transparent.png"
          alt="Timberpark Pte. Ltd."
          width={220}
          height={140}
          priority
        />
      </div>
    </div>
  );
}

export default LogoIntro;
