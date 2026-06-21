"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  {
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft (PL-300)",
    date: "May 2026",
    credentialId: "MS-PL300-109283",
    description: "Validates expertise in data preparation, statistical modeling, DAX query optimization, dashboard layout design, and workspace administration.",
    skills: ["Power BI", "DAX", "Data Modeling", "ETL"]
  },
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    date: "June 2026",
    credentialId: "G-DA-PROF-928374",
    description: "Rigorous 8-course track covering spreadsheets, SQL query execution, Tableau visualization, R programming, and analytical problem-solving.",
    skills: ["SQL", "Tableau", "R Programming", "Spreadsheets"]
  },
  {
    title: "SQL for Data Science",
    issuer: "UC Davis / Coursera",
    date: "March 2026",
    credentialId: "UC-DAVIS-SQL-47392",
    description: "Advanced data wrangling, table joins, subqueries, filtering, and query execution optimizations for large relational databases.",
    skills: ["SQL", "Relational Databases", "Query Optimization"]
  },
  {
    title: "Python for Data Science and Machine Learning",
    issuer: "Udemy",
    date: "April 2026",
    credentialId: "UDEMY-PY-ML-739210",
    description: "Practical bootcamp covering NumPy, Pandas, Seaborn, Matplotlib, and predictive models using Scikit-Learn (regression, classification, clustering).",
    skills: ["Python", "Pandas", "Scikit-Learn", "Machine Learning"]
  }
];

export default function Certifications() {
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
    tl.fromTo(".cert-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Card reveal animation
    tl.fromTo(".cert-card", 
      { opacity: 0, scale: 0.95, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section 
      id="certifications" 
      ref={containerRef}
      className="relative w-full min-h-screen bg-graphite flex flex-col justify-center overflow-hidden px-6 lg:px-16 py-24 z-10 border-t border-boneWhite/5"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col space-y-12">
        
        {/* Section Header */}
        <div className="cert-title flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-ember text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-ember rotate-45" />
            <span>Validated Credentials</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-boneWhite tracking-tight">
            Professional <span className="font-light italic text-ember font-display">Certifications</span>.
          </h2>
          <p className="max-w-xl text-base text-boneWhite/60 font-body font-normal leading-relaxed">
            Industry-standard certifications demonstrating technical depth in data analytics, data modeling, visualization, and databases.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="cert-grid grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {CERTIFICATIONS.map((cert, index) => (
            <div 
              key={index}
              className="cert-card h-full flex flex-col justify-between p-6 bg-carbon/50 border border-boneWhite/10 hover:border-ember/40 hover:bg-carbon/80 transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono text-ember uppercase tracking-wider">{cert.issuer}</span>
                  <span className="text-[10px] font-mono text-boneWhite/40">{cert.date}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-boneWhite mt-3 group-hover:text-amberHighlight transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-xs text-boneWhite/60 font-body mt-3 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 border-t border-boneWhite/5 pt-4">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-0.5 bg-graphite border border-boneWhite/5 text-[9px] font-mono text-boneWhite/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="text-[9px] font-mono text-boneWhite/30">
                  CREDENTIAL ID: <span className="text-boneWhite/55">{cert.credentialId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
