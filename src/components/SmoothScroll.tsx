"use client";
import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ScrollConnector() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Register GSAP ScrollTrigger plugin on client-side
    gsap.registerPlugin(ScrollTrigger);

    // Update GSAP ScrollTrigger whenever Lenis scrolls
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Synchronize Lenis RAF loop with the GSAP ticker
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000); // lenis expects time in ms
    };
    gsap.ticker.add(updateRaf);

    // Disable lag smoothing for synchronized updates
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(updateRaf);
      ScrollTrigger.killAll();
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.1,
        duration: 1.2,
      }}
    >
      <ScrollConnector />
      {children}
    </ReactLenis>
  );
}
