"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-left">
      <div className="max-w-3xl w-full mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About</h1>
        <p className="text-gray-400 leading-relaxed">
          EECS @ UC Berkeley. I enjoy building full‑stack apps, working with ML/AI, and shipping simple, fast interfaces.
        </p>

        <div className="mt-8 grid gap-2 text-sm text-gray-300">
          <div>• Full‑stack development, ML/AI, and systems</div>
          <div>• React, Next.js, TypeScript, Python</div>
          <div>• Cloud + databases when needed</div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <a href="/projects" className="underline underline-offset-4 hover:text-gray-300">Projects</a>
          <a href="/contact" className="underline underline-offset-4 hover:text-gray-300">Contact</a>
          <a href="https://github.com/stephenhungg" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-300">GitHub</a>
          <a href="https://linkedin.com/in/stephenhung" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-300">LinkedIn</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gray-300">Download Resume (PDF)</a>
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


