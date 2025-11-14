"use client";

import Image from "next/image";
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
    id: "darwin",
    title: "darwin",
    date: "october 2025",
    description: "interactive platform where four specialized ai agents compete to complete tasks in real-time, with blockchain-based voting on sui network. built for calhacks 12.0.",
    color: "white",
    link: "/projects/darwin",
    image: "/images/darwin.png",
    tech: ["React + Vite", "Tailwind CSS", "WebGL", "Sui", "AI Agents", "Letta"],
  },
  {
    id: "clearpath",
    title: "clearpath medical ai agent",
    date: "october 2025",
    description: "pfmea analysis agent for clearpath medical. in collaboration with theta tau professional engineering fraternity.",
    color: "yellow",
    inProgress: true,
    image: "/images/clearpath.png",
    tech: ["Python", "LLMs", "AI Agents"],
  },
  {
    id: "replate",
    title: "replate",
    date: "october 2025",
    description: "mobile app for food rescue partners to instantly log donation data, replacing manual pen-and-paper systems. built with cal blueprint.",
    color: "green",
    inProgress: true,
    image: "/images/replate.png",
    tech: ["React Native", "Expo", "Ruby on Rails", "Mobile"],
  },
  {
    id: "crakd",
    title: "crakd",
    date: "september 2025",
    description: "ensemble model-powered ai/ml system for talent identification, designed to identify \"cracked\" developers using hybrid quantitative and qualitative analysis.",
    color: "red",
    link: "/projects/crakd",
    image: "/images/crackd.png",
    tech: ["Python", "ML", "Ensemble Models", "Google Gemini API", "GitHub GraphQL"],
  },
  {
    id: "clarifai",
    title: "clarifai",
    date: "august 2025",
    description: "web app that breaks down complex research papers into easy-to-understand concepts and creates 3blue1brown-style video explanations using ai.",
    color: "blue",
    link: "/projects/clarifai",
    image: "/images/clarifai.png",
    tech: ["Next.js", "Python", "Manim", "ffmpeg", "Google Gemini API", "LangChain"],
  },
  {
    id: "vibechain-api",
    title: "vibechain-api",
    date: "august 2025",
    description: "ml-powered playlist recommendation api built with typescript, express, and tensorflow.js; predicts next track vibes from spotify features.",
    color: "mauve",
    link: "/projects/vibechain-api",
    image: "/images/vibechain.png",
    tech: ["TypeScript", "Express", "TensorFlow.js", "Spotify API"],
  },
  {
    id: "spotifytui",
    title: "spotifytui",
    date: "august 2025",
    description: "beautiful and feature-rich terminal user interface for spotify built with python and textual, featuring playback control, playlist management, and lyrics display.",
    color: "peach",
    link: "/projects/spotifytui",
    image: "/images/spotifytui.JPG",
    tech: ["Python", "Textual", "Spotify API", "Genius API"],
  },
  {
    id: "portfolio-website",
    title: "portfolio website",
    date: "june 2025",
    description: "modern, responsive portfolio website built with next.js and tailwind css, featuring project showcases, contact information, and clean design.",
    color: "pink",
    link: "/projects/portfolio-website",
    image: "/images/portfolio.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Vercel"],
  },
  {
    id: "instephgram",
    title: "instephgram",
    date: "april 2025",
    description: "competition based instagram-style full-stack web app built using react.js, express.js, node.js, mongodb, and aws s3.",
    color: "lavender",
    link: "/projects/instephgram",
    image: "/images/instephgram.png",
    tech: ["React", "Express", "Node.js", "MongoDB", "AWS S3"],
  },
  {
    id: "world-generator",
    title: "2d world generator",
    date: "april 2025",
    description: "simple 2d world generator built using java's stddraw library, with ray tracing based lighting and saving/loading functionality.",
    color: "teal",
    link: "/projects/world-generator",
    image: "/images/world-generator.png",
    tech: ["Java", "StdDraw"],
  },
  {
    id: "ngordnet",
    title: "ngordnet",
    date: "march 2025",
    description: "ngram-based word frequency analyzer built using java replicating core features of google ngram viewer and princeton wordnet.",
    color: "sapphire",
    link: "/projects/ngordnet",
    image: "/images/ngordnet.png",
    tech: ["Java", "Data Structures", "Algorithms"],
  },
  {
    id: "vendi",
    title: "vendi",
    date: "february 2025",
    description: "smart vending machine project for uc berkeley theta tau professional engineering fraternity alpha lambda class, integrating mechanical, electrical, and software systems with arduino control.",
    color: "yellow",
    link: "/projects/vendi",
    image: "/images/vendi.JPG",
    tech: ["Arduino", "C++", "Hardware", "IoT"],
  },
  {
    id: "mybackpack",
    title: "mybackpack",
    date: "april 2024",
    description: "professional networking mobile app helping high schoolers track and manage their academic and extracurricular activities, with ai powered feedback and resume building. built using java and xml.",
    color: "maroon",
    link: "/projects/fuzzy-school",
    image: "/images/mybackpack.png",
    tech: ["Java", "XML", "Android", "ChatGPT API", "Firebase"],
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
      // Add a small delay before showing the preview for smoother animation
      const timer = setTimeout(() => {
        setShowPreview(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // Start fade-out animation immediately
      setShowPreview(false);
    }
  }, [isHovered]);

  if (!mounted) return null;

  const previewContent = (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 transition-opacity duration-300 pointer-events-none hidden lg:block ${
          showPreview ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 99998 }}
      />
      {/* Expanded Preview */}
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

  // Keep preview mounted during fade-out animation
  useEffect(() => {
    if (hoveredImage) {
      setPreviewImage(hoveredImage);
    } else {
      // Delay unmounting to allow fade-out animation
      const timer = setTimeout(() => {
        setPreviewImage(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [hoveredImage]);

  return (
    <main className="max-w-4xl mx-auto pt-20 pb-12 px-4">
      <h1 className="text-3xl font-light mb-4 text-center fade-in text-green">Projects</h1>
      <p className="text-gray-400 text-center mb-12 fade-in">
        Some of the projects are from school and some are on my own time.
      </p>

      {previewImage && (
        <ImagePreview 
          image={previewImage.image} 
          title={previewImage.title} 
          isHovered={!!hoveredImage}
        />
      )}

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group p-6 border border-${project.color} rounded-lg hover:border-${project.color}/80 hover:bg-gray-900-theme/50 transition-all duration-300 transform hover:scale-[1.02] fade-in relative z-0`}
          >
            <div className="flex gap-6">
              {/* Project Image */}
              {project.image ? (
                <div 
                  className="relative w-48 h-32 flex-shrink-0"
                  onMouseEnter={() => setHoveredImage({ image: project.image!, title: project.title })}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 flex items-center justify-center cursor-pointer bg-gray-900-theme/30">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-contain transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 bg-gray-900-theme/30 hidden sm:flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
               </div>
              )}

              {/* Project Content */}
              <div className="flex-1 min-w-0">
                <div className="flex gap-4 mb-3">
                  <div className="text-sm text-gray-500 w-24 flex-shrink-0">{project.date}</div>
            <div className="flex-1">
                    <h2 className={`text-xl font-semibold text-${project.color} mb-2`}>
                      {project.title}
                    </h2>
            </div>
          </div>
                <p className="text-gray-400 mb-3 leading-relaxed">{project.description}</p>

                {/* Tech Stack Badges */}
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.inProgress ? (
                  <span className="text-sm text-gray-500 italic">In progress...</span>
                ) : project.link ? (
                  <a
                    href={project.link}
                    className="text-sm text-gray-500 hover:text-gray-400 transition-colors group/link"
                  >
                    Read more{" "}
                    <span className="group-hover/link:translate-x-1 inline-block transition-transform">
                      →
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
