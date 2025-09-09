"use client";

import { useState, useEffect } from "react";
import VisitorCount from "../components/VisitorCount";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <main className={`flex flex-col items-center justify-center min-h-[80vh] text-center transition-opacity duration-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 fade-in">
          Stephen Hung
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8 leading-relaxed fade-in">
          Sophomore studying <strong>EECS at UC Berkeley</strong>. Passionate about <strong>full-stack development</strong>, <strong>machine learning</strong>, and <strong>artificial intelligence</strong>.
        </p>
        <div className="flex gap-6 justify-center fade-in">
          <a href="/projects" className="text-sm hover:text-gray-400 transition-colors">Projects</a>
          <a href="/contact" className="text-sm hover:text-gray-400 transition-colors">Contact</a>
        </div>
        <div className="mt-8 fade-in">
          <VisitorCount />
        </div>

        <section className="mt-14 text-left fade-in">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-gray-400 leading-relaxed">
            EECS @ UC Berkeley. I build full‑stack products with AI, scalable backends,
            and clean, fast UIs. Recently: interning at OptiGenix training models for
            clinical data extraction, shipping projects with LLMs, and exploring ML systems.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-gray-400">
            <div>• Full‑Stack & ML/AI Developer</div>
            <div>• React, Node/Express, TypeScript, Python, TensorFlow/PyTorch</div>
            <div>• Cloud: AWS, GCP, Docker; DB: Postgres, MongoDB</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a href="/projects" className="underline underline-offset-4 hover:text-gray-300">See projects</a>
            <a href="https://github.com/stephenhungg" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-300">GitHub</a>
            <a href="https://linkedin.com/in/stephenhung" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-300">LinkedIn</a>
          </div>
        </section>
      </div>
    </main>
  );
}
