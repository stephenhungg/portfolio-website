"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../../components/ThemeToggle";

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <main className={`flex flex-col items-center justify-start min-h-[70vh] text-left pt-20 transition-opacity duration-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-3xl w-full mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-light mb-4 fade-in text-pink">about</h1>
        <div className="mt-2 flex items-start gap-6 fade-in">
          <div className="relative w-28 h-28 aspect-square rounded-full overflow-hidden border border-white/10 shrink-0">
            <Image
              src="/images/headshot.jpeg"
              alt="Stephen Hung headshot"
              fill
              sizes="112px"
              className="object-cover object-center"
              priority
            />
          </div>
          <p className="text-gray-400 leading-relaxed">
            eecs @ uc berkeley • full‑stack & ml/ai developer • chino hills → berkeley. currently building with AI agents, scalable web apps, and whatever catches my interest.
          </p>
        </div>


        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          <div className="space-y-4">
          <div>
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-green">developer</span>
                <span className="text-gray-400">@ <span className="text-sapphire">cal blueprint</span></span>
                <span className="text-xs text-gray-500">fall 2025</span>
              </div>
              <ul className="mt-1 text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>build web/mobile apps for nonprofits for social change</li>
                <li>working on replate, a food donation tracking app</li>
              </ul>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-blue">software engineering intern</span>
                <span className="text-gray-400">@ <span className="text-teal">optigenix</span></span>
                <span className="text-xs text-gray-500">summer 2025</span>
              </div>
              <ul className="mt-1 text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>trained ai models for clinical data extraction and evaluation</li>
                <li>ml model training for optimized supplement recommendation</li>
              </ul>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-peach">professional development chair</span>
                <span className="text-gray-400">@ <span className="text-yellow">cal theta tau</span></span>
                <span className="text-xs text-gray-500">spring 2025</span>
              </div>
              <ul className="mt-1 text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>organized workshops and events for professional development</li>
                <li>resume, projects, and career advice for new members</li>
              </ul>
            </div>
            
          </div>
        </section>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-2">when I&apos;m not coding</h2>
          <div className="text-sm flex flex-wrap gap-2">
            <span className="text-pink">league of legends</span> •
            <span className="text-peach">fashion</span> •
            <span className="text-blue">sf tech culture</span> •
            <span className="text-mauve">llms</span> •
            <span className="text-lavender">edm</span> •
            <span className="text-green">matcha</span>
          </div>
        </section>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-3">theme</h2>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-sm text-gray-400">i use this catppuccin macchiato theme for everything lol</span>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 text-sm fade-in">
          <a href="/projects" className="text-green underline underline-offset-4 hover:opacity-80">Projects</a>
          <a href="/contact" className="text-peach underline underline-offset-4 hover:opacity-80">Contact</a>
          <a href="https://github.com/stephenhungg" target="_blank" rel="noreferrer" className="text-mauve underline underline-offset-4 hover:opacity-80">GitHub</a>
          <a href="https://www.linkedin.com/in/stephen-h-hung/" target="_blank" rel="noreferrer" className="text-blue underline underline-offset-4 hover:opacity-80">LinkedIn</a>
          <a href="https://x.com/stpnhh" target="_blank" rel="noreferrer" className="text-sky underline underline-offset-4 hover:opacity-80">Twitter</a>
          <a href="mailto:stephenhung@berkeley.edu" className="text-teal underline underline-offset-4 hover:opacity-80">Email</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="text-yellow underline underline-offset-4 hover:opacity-80">Resume (PDF)</a>
        </div>

        <div className="mt-12 text-sm text-gray-500 fade-in">
          always down to collaborate on cool projects or chat about tech.
        </div>

        <div className="mt-6 fade-in">
          <Link href="/" className="text-sm hover:text-gray-300">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}


