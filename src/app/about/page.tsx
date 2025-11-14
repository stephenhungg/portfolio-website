"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../../components/ThemeToggle";
import GitHubActivity from "../../components/GitHubActivity";

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <main className={`flex flex-col items-center justify-start min-h-[70vh] text-left pt-20 transition-opacity duration-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-3xl w-full mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl sm:text-5xl font-light fade-in text-pink">about</h1>
          <ThemeToggle />
        </div>
        
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
          <div className="text-gray-400 leading-relaxed space-y-3">
            <p>
              hey! i&apos;m stephen, a sophomore at <span className="text-blue font-medium">uc berkeley</span> studying <span className="text-blue font-medium">eecs</span>. i specialize in building <span className="text-green">full-stack applications</span> and <span className="text-mauve">ai/ml systems</span> that solve real problems.
            </p>
            <p>
              what excites me most is <span className="text-green">rapid prototyping</span>—taking ideas from concept to deployed product by learning new frameworks quickly and iterating fast. whether it&apos;s building multi-agent ai systems, integrating blockchain, or training ml models for production, i thrive on projects that push technical boundaries.
            </p>
          </div>
        </div>

        {/* NEW: Recruiting CTA */}
        <div className="mt-6 p-4 border border-green/30 rounded-lg bg-green/5 fade-in">
          <p className="text-sm text-gray-300 mb-2">
            <span className="text-green font-semibold">🔍 Open to Summer 2026 SWE Internships</span>
          </p>
          <p className="text-xs text-gray-400">
            Interested in full-stack development, AI/ML engineering, or mobile development roles. 
            <a href="/resume.pdf" className="text-green underline ml-1" target="_blank">Download resume →</a>
          </p>
        </div>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-3">Currently Building</h2>
          <div className="text-gray-400 leading-relaxed space-y-3">
            <div>
              <p className="mb-1">
                <a href="https://darwin.qtzx.dev" target="_blank" rel="noreferrer" className="text-pink font-medium hover:underline">darwin.</a> — Multi-agent AI coding platform where 4 agents compete in real-time with blockchain voting and live voice commentary. Built at Cal Hacks with React, Gemini 2.5, Sui blockchain, and Three.js.
              </p>
            </div>
            <div>
              <p>
                <span className="text-sapphire font-medium">Replate with Blueprint</span> — Cross-platform mobile app (React Native) helping food rescue organizations digitize donation tracking, replacing manual systems for 50+ partner organizations nationwide.
              </p>
            </div>
            <div>
              <p>
                <span className="text-mauve font-medium">ClearPath Medical AI</span> — Building an AI agent to automate PFMEA analysis for medical device risk assessment.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-3">Experience</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-medium text-green">Software Developer</span>
                <span className="text-gray-400">@ <span className="text-sapphire">Blueprint</span></span>
                <span className="text-xs text-gray-500">Fall 2025 – Present</span>
              </div>
              <ul className="mt-1 text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>Building mobile apps for social good with React Native and Ruby on Rails</li>
                <li>Architected complete authentication system for Replate&apos;s food donation tracking app</li>
              </ul>
            </div>

            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-medium text-blue">Software Engineering Intern</span>
                <span className="text-gray-400">@ <span className="text-teal">OptiGenix</span></span>
                <span className="text-xs text-gray-500">Summer 2025</span>
              </div>
              <ul className="mt-1 text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>Trained AI models for clinical data extraction achieving <span className="text-green">92.3% accuracy</span></li>
                <li>Built HIPAA-compliant workflows on GCP supporting <span className="text-green">7,500+ monthly uploads</span></li>
                <li>Led backend migration reducing <span className="text-green">infrastructure costs by 35%</span></li>
              </ul>
            </div>

            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-medium text-peach">Professional Development Chair</span>
                <span className="text-gray-400">@ <span className="text-yellow">Theta Tau</span></span>
                <span className="text-xs text-gray-500">Spring 2025 – Present</span>
              </div>
              <ul className="mt-1 text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>Organize technical workshops and career development programming for 50+ engineering students</li>
                <li>Coordinate industry networking events and alumni mentorship opportunities</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-8 fade-in">
          <GitHubActivity />
        </section>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-3">Recent Projects</h2>
          <div className="text-sm text-gray-400 space-y-2">
            <p><a href="https://darwin.qtzx.dev" target="_blank" rel="noreferrer" className="text-pink hover:underline font-medium">darwin.</a> — 6-agent AI orchestration system with real-time code generation, voice interaction, and blockchain voting</p>
            <p><span className="text-mauve font-medium">ClarifAI</span> — AI research agent that generates animated video explanations using self-correcting agent pipeline</p>
            <p><a href="https://crakd.co" target="_blank" rel="noreferrer" className="text-blue hover:underline font-medium">crakd.co</a> — AI developer talent finder using GitHub metrics and LLM code analysis</p>
            <p><span className="text-green font-medium">InStephGram</span> — Full-stack social media platform with photo/video uploads and real-time features</p>
            <p><a href="/projects" className="text-peach hover:underline">View all projects →</a></p>
          </div>
        </section>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-3">Tech Stack</h2>
          <div className="text-sm text-gray-400 space-y-2">
            <p><span className="text-mauve font-medium">Languages:</span> Python, JavaScript/TypeScript, Java, C++, C, SQL</p>
            <p><span className="text-blue font-medium">Frontend:</span> React, React Native, Next.js, Three.js, Tailwind CSS</p>
            <p><span className="text-green font-medium">Backend:</span> Node.js, Express, FastAPI, Ruby on Rails</p>
            <p><span className="text-pink font-medium">AI/ML:</span> LangChain, Letta, Gemini API, TensorFlow.js, PyTorch</p>
            <p><span className="text-peach font-medium">Cloud & Infra:</span> AWS, GCP, Vercel, Sui Blockchain, Docker</p>
          </div>
        </section>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-3">What I&apos;m Learning</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Currently diving deeper into <span className="text-mauve">LLM fine-tuning</span>, <span className="text-green">agent orchestration frameworks</span> (Letta, LangChain), and building <span className="text-blue">reliable AI systems for production</span>. Always exploring new tools in the AI/ML space.
          </p>
        </section>

        {/* Moved personal stuff to bottom, made it shorter */}
        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-2">Beyond Code</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            When I&apos;m not coding, you&apos;ll find me exploring SF tech culture, attending meetups, or hunting for the best matcha spots around Berkeley. Always interested in discussing the latest AI research and where this technology is headed.
          </p>
        </section>

        <section className="mt-10 fade-in">
          <h2 className="text-lg font-semibold mb-3">Let&apos;s Connect</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Open to collaborating on interesting projects, chatting about AI/ML, or discussing internship opportunities. Feel free to reach out!
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="mailto:stephenhung@berkeley.edu" className="text-teal underline underline-offset-4 hover:opacity-80 font-medium">📧 Email</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="text-yellow underline underline-offset-4 hover:opacity-80 font-medium">📄 Resume</a>
            <a href="https://www.linkedin.com/in/stephen-h-hung/" target="_blank" rel="noreferrer" className="text-blue underline underline-offset-4 hover:opacity-80">LinkedIn</a>
            <a href="https://github.com/stephenhungg" target="_blank" rel="noreferrer" className="text-mauve underline underline-offset-4 hover:opacity-80">GitHub</a>
            <a href="/projects" className="text-green underline underline-offset-4 hover:opacity-80">Projects</a>
            <a href="https://devpost.com/stephenhungg" target="_blank" rel="noreferrer" className="text-red underline underline-offset-4 hover:opacity-80">Devpost</a>
            <a href="https://x.com/stpnhh" target="_blank" rel="noreferrer" className="text-sky underline underline-offset-4 hover:opacity-80">Twitter</a>
          </div>
        </section>

        <div className="mt-6 fade-in">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-300">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}