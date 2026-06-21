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
    title: "Retail Sales Intelligence Dashboard",
    category: "Business Intelligence & ETL",
    description: "An interactive Power BI and Tableau dashboard analyzing multi-year retail transactions to reveal sales seasonality, identify regional revenue leaks, and project next-quarter performance.",
    tags: ["SQL", "Power BI", "Tableau", "Python"],
    link: "#"
  },
  {
    id: 2,
    title: "Predictive Customer Churn Model",
    category: "Machine Learning & Analytics",
    description: "An end-to-end predictive analysis pipeline utilizing Python to clean raw behavioral datasets, perform feature engineering, and train XGBoost models to forecast high-risk customer churn.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    link: "#"
  },
  {
    id: 3,
    title: "Financial Sentiment ETL Pipeline",
    category: "Data Engineering & Analytics",
    description: "Automated ingestion pipeline scraping financial news portals daily, executing NLP sentiment analysis, and storing structured metrics in PostgreSQL for live charting.",
    tags: ["Python", "PostgreSQL", "BeautifulSoup", "NLTK"],
    link: "#"
  },
  {
    id: 4,
    title: "Financial Sentiment ETL Pipeline",
    category: "Data Engineering & Analytics",
    description: "Automated ingestion pipeline scraping financial news portals daily, executing NLP sentiment analysis, and storing structured metrics in PostgreSQL for live charting.",
    tags: ["Python", "PostgreSQL", "BeautifulSoup", "NLTK"],
    link: "#"
  },
  {
    id: 5,
    title: "Financial Sentiment ETL Pipeline",
    category: "Data Engineering & Analytics",
    description: "Automated ingestion pipeline scraping financial news portals daily, executing NLP sentiment analysis, and storing structured metrics in PostgreSQL for live charting.",
    tags: ["Python", "PostgreSQL", "BeautifulSoup", "NLTK"],
    link: "#"
  },
  {
    id: 6,
    title: "Financial Sentiment ETL Pipeline",
    category: "Data Engineering & Analytics",
    description: "Automated ingestion pipeline scraping financial news portals daily, executing NLP sentiment analysis, and storing structured metrics in PostgreSQL for live charting.",
    tags: ["Python", "PostgreSQL", "BeautifulSoup", "NLTK"],
    link: "#"
  },
  {
    id: 7,
    title: "Financial Sentiment ETL Pipeline",
    category: "Data Engineering & Analytics",
    description: "Automated ingestion pipeline scraping financial news portals daily, executing NLP sentiment analysis, and storing structured metrics in PostgreSQL for live charting.",
    tags: ["Python", "PostgreSQL", "BeautifulSoup", "NLTK"],
    link: "#"
  },
  {
    id: 8,
    title: "Financial Sentiment ETL Pipeline",
    category: "Data Engineering & Analytics",
    description: "Automated ingestion pipeline scraping financial news portals daily, executing NLP sentiment analysis, and storing structured metrics in PostgreSQL for live charting.",
    tags: ["Python", "PostgreSQL", "BeautifulSoup", "NLTK"],
    link: "#"
  }
];

export default function Projects() {
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
