"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  {
    category: "Data Analysis & Querying",
    skills: [
      { name: "SQL", level: "Expert", description: "Complex CTEs, window functions, indexing, and query optimization." },
      { name: "Python", level: "Advanced", description: "Pandas, NumPy, Scikit-Learn, data cleaning, and statistical modeling." },
      { name: "Excel & VBA", level: "Advanced", description: "Pivot tables, array formulas, Power Query, and macro automation." }
    ]
  },
  {
    category: "Data Visualization & BI",
    skills: [
      { name: "Power BI", level: "Expert", description: "Interactive dashboard design, DAX modeling, and gateway setup." },
      { name: "Tableau", level: "Advanced", description: "Complex calculations, parameters, storyboards, and Tableau Server." },
      { name: "Streamlit", level: "Intermediate", description: "Rapid prototyping of interactive ML and analytical web apps." }
    ]
  },
  {
    category: "Data Infrastructure & Methods",
    skills: [
      { name: "PostgreSQL & ETL", level: "Advanced", description: "Database schema design, database administration, and ETL pipelines." },
      { name: "Statistics", level: "Advanced", description: "A/B testing, regression analysis, hypothesis testing, and probability." },
      { name: "Git / Version Control", level: "Advanced", description: "Collaborative project management, branch workflows, and code deployment." }
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML/CSS", level: "Advanced", description: "Building responsive websites with clean layouts, modern styling, and cross-browser compatibility." },
      { name: "JavaScript", level: "Intermediate", description: "Developing interactive web applications and dynamic functionality." },
      { name: "React", level: "Intermediate", description: "Creating component-based single-page applications." }
    ]
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Title reveal animation
    tl.fromTo(".skills-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Category card reveal
    tl.fromTo(".skills-category-card", 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative w-full min-h-screen bg-carbon flex flex-col justify-center overflow-hidden px-6 lg:px-16 py-24 z-10 border-t border-boneWhite/5"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col space-y-12">
        
        {/* Section Header */}
        <div className="skills-title flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-ember text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-ember rotate-45" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-boneWhite tracking-tight">
            Toolbox & <span className="font-light italic text-ember font-display">Expertise</span>.
          </h2>
          <p className="max-w-xl text-base text-boneWhite/60 font-body font-normal leading-relaxed">
            A comprehensive overview of libraries, frameworks, methodologies, and platforms I leverage to extract insight from raw datasets.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {SKILLS_DATA.map((cat, idx) => (
            <div 
              key={idx}
              className="skills-category-card h-full flex flex-col justify-between p-6 bg-graphite/40 border border-boneWhite/10 hover:border-ember/40 hover:bg-carbon/80 transition-all duration-300 group shadow-lg"
            >
              <div>
                <span className="text-[10px] font-mono text-ember uppercase tracking-wider block mb-4 border-b border-boneWhite/5 pb-2">
                  0{idx + 1} / {cat.category}
                </span>
                <div className="space-y-6">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex flex-col space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-lg font-mono font-semibold text-boneWhite group-hover:text-amberHighlight transition-colors duration-300">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] font-mono bg-ember/10 border border-ember/20 text-ember px-2 py-0.5 rounded-sm">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-boneWhite/60 font-body leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
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
