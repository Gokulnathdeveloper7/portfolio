"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Netflix Analytics Dashboard",
    category: "Business Intelligence & ETL",
    description: "Developed an interactive Netflix Analytics Dashboard using Power BI to analyze and visualize Netflix's content library. The dashboard provides valuable insights into content distribution, genre popularity, ratings, release trends, and global content availability.",
    tags: ["SQL", "Power BI", "Tableau", "Python"],
    link: "#"
  },
  {
    id: 2,
    title: "Sales Performance Dashboard",
    category: "Data Analytics",
    description: "An interactive dashboard designed to monitor sales KPIs, revenue growth, regional performance, and product profitability. Enables businesses to make informed decisions through real-time insights.",
    tags: ["Power BI", "DAX", "Excel", "Business Intelligence"],
    link: "https://github.com/Gokulnathdeveloper7/Sales-Performance-Dashboard"
  },
  {
    id: 3,
    title: "Customer Insights Dashboard",
    category: "Data Analytics",
    description: "A customer-focused dashboard that analyzes customer demographics, purchasing patterns, and engagement metrics to support data-driven marketing and retention strategies.",
    tags: ["Power BI", "Customer Analytics", "Data Visualization"],
    link: "https://github.com/Gokulnathdeveloper7/-Customer-insights"

  },
  {
    id: 4,
    title: "Amazon Sales Analytics Dashboard",
    category: "Data Analytics",
    description: "A comprehensive sales analytics dashboard that tracks revenue, orders, product performance, and customer purchasing behavior. Helps identify sales trends and business growth opportunities.",
    tags: ["Power BI", "Excel", "Business Intelligence", "Analytics"],
    link: "https://github.com/Gokulnathdeveloper7/amazon-dataset"
  },
  {
    id: 5,
    title: "IPL 2026 Analytics Dashboard",
    category: "Sports Analytics",
    description: "A dynamic IPL analytics dashboard that explores team performance, player statistics, match outcomes, and tournament insights. Provides a data-driven view of the IPL 2026 season.",
    tags: ["Power BI", "Sports Analytics", "Data Visualization"],
    link: "https://github.com/Gokulnathdeveloper7/Ipl-dataset"
  },
  {
    id: 6,
    title: "Phishing Message Detection System",
    category: "Machine Learning & Cybersecurity",
    description: "An intelligent phishing message detection system developed using Machine Learning to identify and classify fraudulent SMS and email messages. The project leverages Natural Language Processing (NLP) techniques for text preprocessing, feature extraction, and predictive modeling to protect users from phishing attacks. The solution provides real-time message analysis through an interactive Streamlit application.",
    tags: ["Python", "Machine Learning", "NLP", "Scikit-Learn", "Streamlit", "Cybersecurity"],
    link: "https://github.com/Gokulnathdeveloper7/PHISH-LENS-master"
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current!,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Title reveal animation
    tl.fromTo(".projects-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Card reveal animation with stagger
    tl.fromTo(".project-card",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full min-h-screen bg-graphite flex flex-col justify-center overflow-hidden px-6 lg:px-16 py-24 z-10 border-t border-boneWhite/5"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col space-y-12">

        {/* Section Header */}
        <div className="projects-title flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-ember text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-ember rotate-45" />
            <span>Curated Case Studies</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-boneWhite tracking-tight">
            Selected <span className="font-light italic text-ember font-display">Creations</span>.
          </h2>
          <p className="max-w-xl text-base text-boneWhite/60 font-body font-normal leading-relaxed">
            A hand-picked index of statistical modeling, automated ETL pipelines, and interactive business intelligence dashboards.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-card h-full flex flex-col justify-between p-6 bg-carbon/50 border border-boneWhite/10 hover:border-ember/40 hover:bg-carbon/80 transition-all duration-300 group shadow-lg"
            >
              <div>
                <span className="text-[10px] font-mono text-ember uppercase tracking-wider">{project.category}</span>
                <h3 className="text-2xl font-display font-bold text-boneWhite mt-2 group-hover:text-amberHighlight transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-boneWhite/65 font-body mt-4 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-graphite border border-boneWhite/5 text-[10px] font-mono text-boneWhite/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center space-x-2 text-xs font-mono text-boneWhite/90 hover:text-ember transition-colors duration-200"
                >
                  <span>Explore Case Study</span>
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
