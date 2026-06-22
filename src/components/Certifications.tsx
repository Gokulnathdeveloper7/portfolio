"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialId?: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    title: "Mobile Application Development",
    issuer: "George Academy",
    date: "2024",
    description: "Completed training in mobile application development, focusing on app design, UI/UX principles, mobile deployment, and application development fundamentals.",
    skills: ["Mobile Development", "UI/UX", "App Design", "Android Development"]
  },
  {
    title: "Game Development",
    issuer: "Inlustro",
    date: "2024",
    description: "Acquired hands-on experience in game design principles, game mechanics, and interactive application development.",
    skills: ["Game Development", "Game Design", "Problem Solving", "Programming"]
  },
  {
    title: "Blockchain Development",
    issuer: "Blockchain Training Program",
    date: "2025",
    description: "Gained knowledge of blockchain architecture, decentralized applications, smart contracts, and distributed ledger technologies.",
    skills: ["Blockchain", "Smart Contracts", "Web3", "Decentralized Systems"]
  },
  {
    title: "Generative AI",
    issuer: "Google Cloud",
    date: "2025",
    description: "Learned Generative AI concepts, Large Language Models (LLMs), prompt engineering, AI applications, and cloud-based AI solutions.",
    skills: ["Generative AI", "Prompt Engineering", "LLMs", "Google Cloud AI"]
  },
  {
    title: "AI/ML Internship",
    issuer: "Trios Technologies",
    date: "2025",
    description: "Worked on Machine Learning and Data Analytics projects involving data preprocessing, model development, visualization, and predictive analytics.",
    skills: ["Machine Learning", "Python", "Data Analytics", "Data Visualization", "Pandas"]
  },
  {
    title: "Cyber Security Analyst",
    issuer: "Tata STRIVE",
    date: "2025",
    description: "Completed practical training in cybersecurity, network security, vulnerability assessment, threat detection, and cyber defense techniques.",
    skills: ["Cybersecurity", "Network Security", "Threat Analysis", "Risk Assessment"]
  }
];

export default function Certifications() {
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
                {cert.credentialId && (
                  <div className="text-[9px] font-mono text-boneWhite/30">
                    CREDENTIAL ID: <span className="text-boneWhite/55">{cert.credentialId}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
