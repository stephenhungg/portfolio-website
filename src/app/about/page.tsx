"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-left">
      <div className="max-w-3xl w-full mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About</h1>
        <div className="mt-2 flex items-start gap-6">
          <div className="w-28 h-28 aspect-square rounded-full overflow-hidden border border-white/10 shrink-0">
            <img
              src="/images/headshot.jpeg"
              alt="Stephen Hung headshot"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <p className="text-gray-400 leading-relaxed">
            eecs @ uc berkeley • full‑stack & ml/ai developer • chino hills → berkeley. currently building with AI agents, scalable web apps, and whatever catches my interest.
          </p>
        </div>


        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-2">When I'm not coding</h2>
          <p className="text-sm text-gray-300">
            league of legends • fashion • sf tech culture • geometry dash • edm • matcha
          </p>
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


