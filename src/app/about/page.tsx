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
          <div className="text-gray-400 leading-relaxed space-y-3">
            <p>
              hey! i&apos;m stephen, a sophomore at uc berkeley studying eecs. i grew up in chino hills and moved to berkeley to chase the intersection of code, ml/ai, and building things that actually matter.
            </p>
            <p>
              my journey into tech started with curiosity—wanting to understand how things work under the hood. now i&apos;m deep into full-stack development and machine learning, building everything from ai agents that compete in real-time to food donation apps that help nonprofits scale their impact.
            </p>
            <p>
              what excites me most is <span className="text-green">rapid prototyping</span>—taking an idea from concept to deployed product, learning new frameworks on the fly, and iterating fast. whether it&apos;s integrating blockchain voting systems for hackathons or training models for clinical data extraction, i love projects that push me to learn something new.
            </p>
          </div>
        </div>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-2">Currently</h2>
          <div className="text-gray-400 leading-relaxed space-y-2">
            <p>
              <span className="text-sapphire">building:</span> replate with cal blueprint—a mobile app helping food rescue partners digitize their donation tracking. also working on an ai agent for clearpath medical to automate pfmea analysis.
            </p>
            <p>
              <span className="text-mauve">learning:</span> diving deeper into llm fine-tuning, agent orchestration frameworks, and exploring how to make ai systems more reliable in production environments.
            </p>
            <p>
              <span className="text-pink">exploring:</span> sf tech culture, attending meetups, and connecting with builders who are shipping real products. always looking for interesting projects to collaborate on.
            </p>
          </div>
        </section>


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
          <h2 className="text-lg font-semibold mb-2">Philosophy</h2>
          <p className="text-gray-400 leading-relaxed">
            i believe the best way to learn is by building. every project is an opportunity to solve real problems, experiment with new technologies, and push beyond my comfort zone. i value <span className="text-green">shipping over perfection</span>—getting something out into the world, gathering feedback, and iterating is how you build products people actually use.
          </p>
        </section>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-2">when I&apos;m not coding</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            you&apos;ll find me grinding ranked in <span className="text-pink">league of legends</span>, exploring <span className="text-peach">streetwear and fashion</span>, discovering new <span className="text-lavender">edm</span> artists, or hunting for the best <span className="text-green">matcha</span> spots around berkeley and sf.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            i&apos;m also deeply interested in <span className="text-mauve">llms and ai</span> beyond just the code—following the latest research, thinking about alignment and safety, and discussing where this technology is headed with anyone who&apos;ll talk about it.
          </p>
        </section>

        <section className="mt-8 fade-in">
          <h2 className="text-lg font-semibold mb-3">theme</h2>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-sm text-gray-400">i use this catppuccin macchiato theme for everything lol</span>
          </div>
        </section>

        <section className="mt-10 fade-in">
          <h2 className="text-lg font-semibold mb-3">Let&apos;s connect</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            i&apos;m always down to collaborate on interesting projects, chat about ai/ml, or just talk tech over coffee (or matcha). if you&apos;re working on something cool or want to bounce ideas around, don&apos;t hesitate to reach out.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="/projects" className="text-green underline underline-offset-4 hover:opacity-80">Projects</a>
            <a href="/contact" className="text-peach underline underline-offset-4 hover:opacity-80">Contact</a>
            <a href="https://github.com/stephenhungg" target="_blank" rel="noreferrer" className="text-mauve underline underline-offset-4 hover:opacity-80">GitHub</a>
            <a href="https://www.linkedin.com/in/stephen-h-hung/" target="_blank" rel="noreferrer" className="text-blue underline underline-offset-4 hover:opacity-80">LinkedIn</a>
            <a href="https://devpost.com/stephenhungg" target="_blank" rel="noreferrer" className="text-red underline underline-offset-4 hover:opacity-80">Devpost</a>
            <a href="https://x.com/stpnhh" target="_blank" rel="noreferrer" className="text-sky underline underline-offset-4 hover:opacity-80">Twitter</a>
            <a href="mailto:stephenhung@berkeley.edu" className="text-teal underline underline-offset-4 hover:opacity-80">Email</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="text-yellow underline underline-offset-4 hover:opacity-80">Resume (PDF)</a>
          </div>
        </section>

        <div className="mt-6 fade-in">
          <Link href="/" className="text-sm hover:text-gray-300">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}


