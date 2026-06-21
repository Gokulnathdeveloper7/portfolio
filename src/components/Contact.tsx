"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Reveal header
    tl.fromTo(".contact-header", 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Reveal form card
    tl.fromTo(".contact-form", 
      { opacity: 0, scale: 0.95, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message simulation complete. Form connection successful!");
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative w-full min-h-screen bg-carbon flex flex-col justify-center overflow-hidden px-6 lg:px-16 py-24 z-10 border-t border-boneWhite/5"
    >
      {/* Visual background elements */}
      <div className="absolute right-[-10%] top-[20%] w-[35rem] h-[35rem] bg-ember/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[10%] w-[30rem] h-[30rem] bg-amberHighlight/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Info Column */}
        <div className="contact-header md:col-span-5 flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-2 text-ember text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-ember rotate-45" />
            <span>Connection Portal</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-boneWhite tracking-tight">
            Start a <br />
            <span className="font-light italic text-ember font-display">Dialogue</span>.
          </h2>
          <p className="text-sm md:text-base text-boneWhite/60 font-body leading-relaxed">
            Looking for an analytical mind to join your team, or have a dataset that needs processing, visualization, or predictive modeling? Let's connect.
          </p>
          <div className="pt-4 flex flex-col space-y-3 text-xs font-mono text-boneWhite/70">
            <div>
              <span className="text-ember block text-[9px] uppercase tracking-wider mb-1">Direct Contact</span>
              <a href="mailto:gokulnathj.analyst@gmail.com" className="hover:text-amberHighlight transition-colors duration-200">gokulnathj.analyst@gmail.com</a>
            </div>
            <div>
              <span className="text-ember block text-[9px] uppercase tracking-wider mb-1">Digital Coordinates</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-amberHighlight transition-colors duration-200">GitHub</a>
                <a href="#" className="hover:text-amberHighlight transition-colors duration-200">LinkedIn</a>
                <a href="#" className="hover:text-amberHighlight transition-colors duration-200">Tableau Public</a>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form md:col-span-7 flex items-center">
          <form 
            onSubmit={handleSubmit}
            className="w-full backdrop-blur-md bg-graphite/40 border border-boneWhite/10 p-6 md:p-8 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="name" className="text-[10px] font-mono text-boneWhite/45 uppercase">Name</label>
                <input 
                  id="name"
                  type="text" 
                  required
                  suppressHydrationWarning
                  placeholder="Your Name"
                  className="px-4 py-3 bg-carbon/50 border border-boneWhite/10 focus:border-ember outline-none text-sm font-body text-boneWhite placeholder-boneWhite/20 transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-[10px] font-mono text-boneWhite/45 uppercase">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  suppressHydrationWarning
                  placeholder="you@example.com"
                  className="px-4 py-3 bg-carbon/50 border border-boneWhite/10 focus:border-ember outline-none text-sm font-body text-boneWhite placeholder-boneWhite/20 transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="subject" className="text-[10px] font-mono text-boneWhite/45 uppercase">Subject</label>
              <input 
                id="subject"
                type="text" 
                required
                suppressHydrationWarning
                placeholder="Job Opportunity / Collaboration"
                className="px-4 py-3 bg-carbon/50 border border-boneWhite/10 focus:border-ember outline-none text-sm font-body text-boneWhite placeholder-boneWhite/20 transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="message" className="text-[10px] font-mono text-boneWhite/45 uppercase">Details</label>
              <textarea 
                id="message"
                rows={4}
                required
                suppressHydrationWarning
                placeholder="Describe the role, dataset project details, or timelines..."
                className="px-4 py-3 bg-carbon/50 border border-boneWhite/10 focus:border-ember outline-none text-sm font-body text-boneWhite placeholder-boneWhite/20 transition-colors duration-200 resize-none"
              />
            </div>

            <button 
              type="submit"
              suppressHydrationWarning
              className="w-full py-3 bg-ember hover:bg-amberHighlight text-carbon font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
            >
              Dispatch Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
