"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-left">
      <div className="max-w-3xl w-full mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About</h1>
        <p className="text-gray-400 leading-relaxed">
          EECS @ UC Berkeley • Full‑Stack & ML/AI developer • Chino Hills → Berkeley. I’m currently building with AI agents, scalable web apps, and whatever catches my interest.
        </p>

        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-2">What I'm up to</h2>
          <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
            <li>Software engineering intern @ OptiGenix — training AI models for clinical data extraction</li>
            <li>Sophomore @ Cal (EECS)</li>
            <li>Building full‑stack apps with AI integration and scalable backends</li>
            <li>Learning advanced ML techniques and cloud architecture</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Tech stack</h2>
          <div className="text-sm text-gray-300 grid gap-3">
            <div>
              <span className="text-gray-400">Languages:</span>
              <span className="ml-2">Python • JavaScript/TypeScript • Java • C++ • Go • SQL</span>
            </div>
            <div>
              <span className="text-gray-400">Frameworks & tools:</span>
              <span className="ml-2">React • Node.js • Express • LangChain • TensorFlow • PyTorch • MongoDB • PostgreSQL • Docker • AWS • GCP • Firebase</span>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Certifications</h2>
          <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
            <li>Stanford ML Specialization</li>
            <li>Google IT Automation with Python</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Recent projects</h2>
          <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
            <li>
              <a href="https://github.com/stephenhungg/vibechain-api" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-200">VibeChainAPI</a>
              <span className="text-gray-400"> — ML powered music recommendation API (TypeScript • TensorFlow.js • Express)</span>
            </li>
            <li>
              <a href="https://github.com/stephenhungg/spotifytui" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-200">SpotifyTUI</a>
              <span className="text-gray-400"> — terminal‑based Spotify client (Python • Textual • Spotify API)</span>
            </li>
            <li>
              <a href="https://github.com/stephenhungg" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-200">ClarifAI</a>
              <span className="text-gray-400"> — agent that breaks down research papers (FastAPI • LangChain • Google Cloud • Manim)</span>
            </li>
            <li>
              <a href="https://github.com/stephenhungg" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-200">myBackpack</a>
              <span className="text-gray-400"> — networking app for students with LLM guidance (Java • ChatGPT API • XML)</span>
            </li>
            <li>
              <a href="https://github.com/stephenhungg" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-200">InStephGram</a>
              <span className="text-gray-400"> — competition‑driven social platform (React • Node.js • MongoDB • AWS S3)</span>
            </li>
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <a href="/projects" className="underline underline-offset-4 hover:text-gray-300">Projects</a>
          <a href="/contact" className="underline underline-offset-4 hover:text-gray-300">Contact</a>
          <a href="https://github.com/stephenhungg" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-300">GitHub</a>
          <a href="https://www.linkedin.com/in/stephen-h-hung/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-300">LinkedIn</a>
          <a href="https://x.com/stpnhh" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-300">Twitter</a>
          <a href="mailto:stephenhung@berkeley.edu" className="underline underline-offset-4 hover:text-gray-300">Email</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-300">Resume (PDF)</a>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          Always down to collaborate on cool projects or chat about tech.
        </div>

        <div className="mt-6">
          <Link href="/" className="text-sm hover:text-gray-300">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}


