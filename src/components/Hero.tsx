"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const DIALOGUE_LINES = [
  "Hey! I'm Gokul Nath J",
  "Aspiring Data Analyst searching for opportunities.",
  "I uncover key patterns and tell stories through complex datasets.",
  "I build interactive BI dashboards in Tableau and Power BI.",
  "I design efficient SQL queries and Python analytical pipelines.",
  "Let's collaborate to build data-driven solutions."
];

// Custom 3D WebGL Data Network / Constellation component
function DataNetwork() {
  const count = 60;
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  // Initialize random particle positions and velocity vectors
  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 10
        ),
        dir: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006
        ),
      });
    }
    return temp;
  });

  const [initialPositions] = useState(() => {
    return new Float32Array(count * 3);
  });

  useFrame((state) => {
    if (!pointsRef.current || !lineRef.current) return;
    const time = state.clock.getElapsedTime();
    const pointsGeo = pointsRef.current.geometry;
    const posAttr = pointsGeo.attributes.position;
    const positions = posAttr.array as Float32Array;

    // Update point positions
    particles.forEach((p, idx) => {
      p.pos.add(p.dir);

      // Boundaries bouncing
      if (Math.abs(p.pos.x) > 8) p.dir.x *= -1;
      if (Math.abs(p.pos.y) > 5) p.dir.y *= -1;
      if (Math.abs(p.pos.z) > 6) p.dir.z *= -1;

      // Assign position in buffer array
      positions[idx * 3] = p.pos.x + Math.sin(time * 0.5 + idx) * 0.15;
      positions[idx * 3 + 1] = p.pos.y + Math.cos(time * 0.5 + idx) * 0.15;
      positions[idx * 3 + 2] = p.pos.z;
    });
    posAttr.needsUpdate = true;

    // Calculate line coordinates between close points
    const linePositions: number[] = [];
    const maxDistance = 2.5;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = particles[i].pos.distanceTo(particles[j].pos);
        if (dist < maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    const lineGeo = lineRef.current.geometry;
    const linePosAttr = new THREE.BufferAttribute(new Float32Array(linePositions), 3);
    lineGeo.setAttribute("position", linePosAttr);
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#F37512"
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#F37512"
          transparent
          opacity={0.25}
        />
      </lineSegments>
    </group>
  );
}

export default function Hero() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Set isMounted to true on client-side to safely render WebGL Canvas
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let index = 0;
    let currentText = "";
    const fullText = DIALOGUE_LINES[currentLine];
    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText.charAt(index);
        setDisplayedText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [currentLine]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLine((prev) => (prev + 1) % DIALOGUE_LINES.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentLine]);

  const toggleAudio = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    
    if (videoRef.current) {
      videoRef.current.muted = isDesktop ? newState : true;
      if (!newState && isDesktop) {
        videoRef.current.play().catch(err => console.log("Desktop audio play blocked:", err));
      }
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.muted = !isDesktop ? newState : true;
      if (!newState && !isDesktop) {
        mobileVideoRef.current.play().catch(err => console.log("Mobile audio play blocked:", err));
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-carbon flex flex-col justify-between overflow-hidden px-6 lg:px-16 pt-32 pb-12 z-10">
      {/* FULL-BLEED INTERACTIVE BACKGROUND BACKDROP LAYER */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted || !isDesktop}
          playsInline
          className="hidden md:block absolute right-0 bottom-0 min-w-full min-h-full object-cover opacity-65 lg:opacity-85 mix-blend-normal pointer-events-auto"
          style={{ objectPosition: "85% center" }}
        >
          <source src="/Man_speaking_in_studio_202606152134.mp4" type="video/mp4" />
        </video>
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted={isMuted || isDesktop}
          playsInline
          className="block md:hidden absolute right-0 bottom-0 min-w-full min-h-full object-cover opacity-65 mix-blend-normal pointer-events-auto"
          style={{ objectPosition: "center" }}
        >
          <source src="/Man_speaking_in_studio_202606301852.mp4" type="video/mp4" />
        </video>

        {isMounted && (
          <div className="absolute inset-0 w-full h-full mix-blend-screen opacity-45">
            <Canvas camera={{ position: [0, 0, 8] }}>
              <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                <DataNetwork />
              </Float>
            </Canvas>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-carbon/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/20 to-transparent" />
      </div>

      {/* FOREGROUND HERO CONTENT WRAPPER */}
      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 my-auto">
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <div className="flex items-center space-x-2 text-ember text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-ember rotate-45" />
            <span>Data Analytics / Business Intelligence / Predictive Modeling</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-boneWhite tracking-tight leading-[0.95]">
            Extracting <br />
            <span className="font-light italic text-ember font-display">Actionable</span> <br />
            Insights.
          </h1>
          <p className="max-w-lg text-base md:text-lg text-boneWhite/60 font-body font-normal leading-relaxed">
            Translating complex, raw datasets into interactive business intelligence dashboards, statistical insights, and automated data pipelines to drive strategic growth.
          </p>
          <div className="flex items-center flex-wrap gap-4 pt-4">
            <a href="#projects" className="px-6 py-3 bg-ember text-carbon font-body font-medium hover:bg-amberHighlight transition-all duration-300">View Projects</a>
            <a href="#contact" className="px-6 py-3 border border-boneWhite/20 text-boneWhite font-body font-medium hover:bg-boneWhite hover:text-carbon transition-all duration-300">Contact Me</a>
            <a href="/GOKULNATH_J_Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-boneWhite/20 text-boneWhite font-body font-medium hover:bg-boneWhite hover:text-carbon transition-all duration-300 flex items-center space-x-2">
              <span>Resume</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </a>
          </div>
        </div>

        {/* GLASS SPEECH BUBBLE & AUDIO CONTROLLER */}
        <div className="lg:col-span-5 flex justify-start lg:justify-end items-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLine}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm backdrop-blur-md bg-graphite/40 border border-boneWhite/10 p-5 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${!isMuted ? 'bg-cyan-400 animate-pulse' : 'bg-ember'}`} />
                  <span className="text-[10px] font-mono uppercase text-boneWhite/40">
                    {!isMuted ? "Live Audio Streaming" : "Audio Track Suspended"}
                  </span>
                </div>
                <button
                  onClick={toggleAudio}
                  suppressHydrationWarning
                  className="px-2 py-0.5 border border-ember/30 text-[9px] font-mono rounded bg-ember/10 text-ember hover:bg-ember hover:text-carbon transition-all duration-200 pointer-events-auto uppercase"
                >
                  {isMuted ? "Unmute Voice" : "Mute Track"}
                </button>
              </div>
              <p className="text-sm font-mono text-boneWhite/90 min-h-[48px] leading-relaxed">
                {displayedText}
                <span className="animate-ping ml-0.5 text-ember">|</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* METRICS DISCOVERY SECTION */}
      <div className="relative w-full grid grid-cols-3 gap-4 border-t border-boneWhite/10 pt-8 mt-12 z-10 font-mono">
        <div>
          <div className="text-2xl md:text-4xl font-bold text-boneWhite">15+</div>
          <div className="text-[10px] text-boneWhite/40 uppercase mt-1">Analytical Case Studies</div>
        </div>
        <div>
          <div className="text-2xl md:text-4xl font-bold text-boneWhite">10K+</div>
          <div className="text-[10px] text-boneWhite/40 uppercase mt-1">Rows Cleaned & Modeled</div>
        </div>
        <div>
          <div className="text-2xl md:text-4xl font-bold text-boneWhite">98%</div>
          <div className="text-[10px] text-boneWhite/40 uppercase mt-1">Model Accuracy & Query Speed</div>
        </div>
      </div>
    </section>
  );
}
