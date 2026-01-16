"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  color: string;
  link?: string;
  inProgress?: boolean;
  image?: string;
  tech?: string[];
}

const projects: Project[] = [
  {
    id: "flow",
    title: "flow",
    date: "january 2026",
    description: "speak a concept, step inside it in 3d. voice-controlled spatial learning platform that converts speech into explorable 3d gaussian splat environments with educational overlays. sb hacks xii winner.",
    color: "text-blue",
    link: "/projects/flow",
    image: "/images/flow.png",
    tech: ["React", "Three.js", "Gaussian Splatting", "Gemini", "Deepgram", "ElevenLabs"],
  },
  {
    id: "freelance-portfolios",
    title: "Freelance Portfolio Development",
    date: "November 2025",
    description: "freelance portfolio website development for college students to showcase their projects and skills.",
    color: "text-lavender",
    inProgress: true,
    image: "/images/freelance.png",
    tech: ["React", "Vite", "Tailwind", "TypeScript"],
  },
  {
    id: "darwin",
    title: "darwin.",
    date: "october 2025",
    description: "interactive platform where specialized ai agents compete to complete tasks in real-time, with blockchain-based voting on sui network. calhacks 12.0 winner.",
    color: "text-pink",
    link: "/projects/darwin",
    image: "/images/darwin.png",
    tech: ["React", "Three.js", "Sui", "AI Agents"],
  },
  {
    id: "clearpath",
    title: "ClearPath Medical AI",
    date: "october 2025",
    description: "pfmea analysis agent for clearpath medical. in collaboration with theta tau professional engineering fraternity.",
    color: "text-yellow",
    link: "/projects/clearpath",
    image: "/images/clearpath.png",
    tech: ["Python", "FastAPI", "Ollama", "LLaMA"],
  },
  {
    id: "replate",
    title: "Replate",
    date: "october 2025",
    description: "mobile app for food rescue partners to instantly log donation data, replacing manual pen-and-paper systems. built with cal blueprint.",
    color: "text-green",
    inProgress: true,
    image: "/images/replate.png",
    tech: ["React Native", "Ruby on Rails"],
  },
  {
    id: "crakd",
    title: "crakd.co",
    date: "september 2025",
    description: "ensemble model-powered ai/ml system for talent identification, designed to identify \"cracked\" developers using hybrid quantitative and qualitative analysis.",
    color: "text-red",
    link: "/projects/crakd",
    image: "/images/crackd.png",
    tech: ["Python", "ML", "Gemini API"],
  },
  {
    id: "clarifai",
    title: "ClarifAI",
    date: "august 2025",
    description: "web app that breaks down complex research papers into easy-to-understand concepts, 3blue1brown-style video explanations, and code examples using ai.",
    color: "text-blue",
    link: "/projects/clarifai",
    image: "/images/clarifai.png",
    tech: ["Next.js", "Python", "Manim", "LangChain"],
  },
  {
    id: "vibechain-api",
    title: "vibechain-api",
    date: "august 2025",
    description: "ml-powered playlist recommendation api built with typescript, express, and tensorflow.js; predicts next track vibes from spotify features.",
    color: "text-mauve",
    link: "/projects/vibechain-api",
    image: "/images/vibechain.png",
    tech: ["TypeScript", "TensorFlow.js", "Spotify API"],
  },
  {
    id: "spotifytui",
    title: "spotifytui",
    date: "august 2025",
    description: "beautiful and feature-rich terminal user interface for spotify built with python and textual, featuring playback control, playlist management, and lyrics display.",
    color: "text-peach",
    link: "/projects/spotifytui",
    image: "/images/spotifytui.JPG",
    tech: ["Python", "Textual", "Spotify API"],
  },
  {
    id: "portfolio-website",
    title: "portfolio website",
    date: "june 2025",
    description: "modern, responsive portfolio website built with next.js and tailwind css, featuring project showcases, contact information, and clean design.",
    color: "text-pink",
    link: "/projects/portfolio-website",
    image: "/images/portfolio.png",
    tech: ["Next.js", "Tailwind CSS"],
  },
  {
    id: "instephgram",
    title: "InStephGram",
    date: "april 2025",
    description: "competition based instagram-style full-stack web app built using react.js, express.js, node.js, mongodb, and aws s3.",
    color: "text-lavender",
    link: "/projects/instephgram",
    image: "/images/instephgram.png",
    tech: ["MERN Stack", "AWS S3"],
  },
  {
    id: "world-generator",
    title: "2D World Generator",
    date: "april 2025",
    description: "simple 2d world generator built using java's stddraw library, with ray tracing based lighting and saving/loading functionality.",
    color: "text-teal",
    link: "/projects/world-generator",
    image: "/images/world-generator.png",
    tech: ["Java", "StdDraw"],
  },
  {
    id: "ngordnet",
    title: "ngordnet",
    date: "march 2025",
    description: "ngram-based word frequency analyzer built using java replicating core features of google ngram viewer and princeton wordnet.",
    color: "text-sapphire",
    link: "/projects/ngordnet",
    image: "/images/ngordnet.png",
    tech: ["Java", "Algorithms"],
  },
  {
    id: "vendi",
    title: "Vendi",
    date: "february 2025",
    description: "smart vending machine project for uc berkeley theta tau professional engineering fraternity alpha lambda class.",
    color: "text-yellow",
    link: "/projects/vendi",
    image: "/images/vendi.JPG",
    tech: ["Arduino", "C++", "IoT"],
  },
  {
    id: "mybackpack",
    title: "MyBackpack",
    date: "april 2024",
    description: "professional networking mobile app helping high schoolers track and manage their academic and extracurricular activities.",
    color: "text-maroon",
    link: "/projects/fuzzy-school",
    image: "/images/mybackpack.png",
    tech: ["Java", "Android", "Firebase"],
  },
];

function ImagePreview({ image, title, isHovered }: { image: string; title: string; isHovered: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setShowPreview(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setShowPreview(false);
    }
  }, [isHovered]);

  if (!mounted) return null;

  const previewContent = (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 transition-opacity duration-300 pointer-events-none hidden lg:block ${
          showPreview ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 99998 }}
      />
      <div 
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl h-[80vh] max-h-[600px] transition-all duration-300 pointer-events-none transform hidden lg:block ${
          showPreview ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ zIndex: 99999 }}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={`${title} screenshot - expanded`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 90vw, 768px"
          />
        </div>
      </div>
    </>
  );

  return createPortal(previewContent, document.body);
}

export default function Projects() {
  const [hoveredImage, setHoveredImage] = useState<{ image: string; title: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<{ image: string; title: string } | null>(null);

  useEffect(() => {
    if (hoveredImage) {
      setPreviewImage(hoveredImage);
    } else {
      const timer = setTimeout(() => {
        setPreviewImage(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [hoveredImage]);

  return (
    <main className="max-w-6xl mx-auto pt-24 pb-16 px-6">
      <div className="text-center mb-16 fade-in">
        <h1 className="text-4xl sm:text-5xl font-light mb-6 text-green tracking-tight">projects</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          A collection of my work, ranging from hackathon winners to long-term engineering projects.
        </p>
        </div>

      {previewImage && (
        <ImagePreview 
          image={previewImage.image} 
          title={previewImage.title} 
          isHovered={!!hoveredImage}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            onMouseEnter={project.image ? () => setHoveredImage({ image: project.image!, title: project.title }) : undefined}
            onMouseLeave={project.image ? () => setHoveredImage(null) : undefined}
          />
        ))}
               </div>
    </main>
  );
}

function ProjectCard({ 
  project, 
  index, 
  onMouseEnter, 
  onMouseLeave 
}: { 
  project: Project, 
  index: number,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void
}) {
  const Wrapper = project.link ? Link : 'div';
  const props = project.link ? { href: project.link } : {};

  return (
    // @ts-expect-error - Link component type doesn't match div type
    <Wrapper
      {...props}
      className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div 
        className="relative w-full aspect-video overflow-hidden bg-gray-900"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-700">
            <span className="text-4xl">⚡</span>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between mb-3">
          <h2 className={`text-xl font-medium ${project.color} group-hover:underline decoration-1 underline-offset-4`}>
                      {project.title}
                    </h2>
          {project.inProgress && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow/10 text-yellow px-2 py-1 rounded-full border border-yellow/20">
              WIP
              </span>
          )}
            </div>
        
        <div className="text-xs text-gray-500 font-mono mb-3 uppercase tracking-wide">{project.date}</div>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3 group-hover:line-clamp-none transition-all">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech?.slice(0, 3).map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-black/20 border border-white/5 text-gray-400 group-hover:border-white/10 transition-colors">
              {t}
                      </span>
                    ))}
          {project.tech && project.tech.length > 3 && (
             <span className="text-xs px-2 py-1 text-gray-600">+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
