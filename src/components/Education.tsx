"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const EDUCATION_DATA = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering with specialization in Artificial Intelligence and Machine Learning.",
    institution: "Vels Institute of Science, Technology & Advanced Studies (VISTAS)",
    period: "2022 - 2026",
    grade: "GPA: 7.8 / 10.0",
    description: "Focus on statistical modeling, computational algorithms, and database management systems. Completed honors projects in data classification systems.",
    highlights: ["Applied Statistics & Probability", "Database Management Systems (RDBMS)", "Data Mining & Warehousing", "Algorithms & Data Structures"]
  },
  {
    degree: "Higher Secondary Certificate (HSC) - Bio & Mathematics",
    institution: "Sri Saravana Vidhyalaya Higher Secondary School",
    period: "2020 - 2022",
    grade: "Percentage: 73%",
    description: "Acquired deep fundamentals in advanced algebra, calculus, statistical methods, and structured programming paradigms.",
    highlights: ["Advanced Mathematics (Calculus & Statistics)", "Botany", "Zoology", "Chemistry", "Physics"]
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Title reveal animation
    gsap.from(".edu-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".edu-title",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Timeline item reveal
    gsap.from(".edu-timeline-item", {
      opacity: 0,
      x: -30,
      duration: 1,
      stagger: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".edu-timeline",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative w-full min-h-screen bg-carbon flex flex-col justify-center overflow-hidden px-6 lg:px-16 py-24 z-10 border-t border-boneWhite/5"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col space-y-12">

        {/* Section Header */}
        <div className="edu-title flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-ember text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-ember rotate-45" />
            <span>Academic Foundation</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-boneWhite tracking-tight">
            Academic <span className="font-light italic text-ember font-display">Pathways</span>.
          </h2>
          <p className="max-w-xl text-base text-boneWhite/60 font-body font-normal leading-relaxed">
            Educational background and core theoretical structures that form the basis of my analytical skills.
          </p>
        </div>

        {/* Timeline Structure */}
        <div className="edu-timeline relative border-l border-boneWhite/15 pl-6 lg:pl-10 space-y-12 ml-3">
          {EDUCATION_DATA.map((edu, index) => (
            <div
              key={index}
              className="edu-timeline-item relative flex flex-col space-y-3 group"
            >
              {/* Timeline marker */}
              <div className="absolute left-[-31px] lg:left-[-47px] top-1.5 w-4 h-4 bg-carbon border border-ember group-hover:bg-ember transition-colors duration-300 rotate-45" />

              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                <h3 className="text-2xl font-display font-bold text-boneWhite group-hover:text-amberHighlight transition-colors duration-300">
                  {edu.degree}
                </h3>
                <span className="text-xs font-mono text-ember font-medium px-2 py-1 bg-ember/5 border border-ember/15">
                  {edu.period}
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-sm font-mono text-boneWhite/70 font-semibold">{edu.institution}</span>
                <span className="text-[11px] font-mono text-boneWhite/40">{edu.grade}</span>
              </div>

              <p className="text-sm text-boneWhite/60 font-body max-w-3xl leading-relaxed">
                {edu.description}
              </p>

              <div className="pt-2">
                <span className="text-[9px] font-mono text-ember uppercase tracking-wider block mb-2">Key Coursework</span>
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 bg-graphite border border-boneWhite/5 text-[10px] font-mono text-boneWhite/45"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
