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
    <main className={`flex flex-col items-center justify-start min-h-[70vh] text-left pt-24 pb-20 transition-opacity duration-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl w-full mx-auto px-6 sm:px-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 fade-in">
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-pink">about</h1>
          <div className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards_0.2s]">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content Column */}
          <div className="space-y-12">
            
            {/* Intro / Bio */}
            <section className="fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex flex-col sm:flex-row items-start gap-8">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/headshot.jpeg"
                    alt="Stephen Hung headshot"
                    fill
                    sizes="(max-width: 640px) 128px, 160px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="text-gray-300 leading-relaxed space-y-4 text-lg font-light">
                  <p>
                    hey! i&apos;m stephen, a sophomore at <span className="text-blue font-medium border-b border-blue/30">uc berkeley</span> studying <span className="text-blue font-medium border-b border-blue/30">eecs</span>. i specialize in building <span className="text-green font-medium">full-stack applications</span> and <span className="text-mauve font-medium">ai/ml systems</span> that solve real problems.
                  </p>
                  <p>
                    what excites me most is <span className="text-green font-medium">rapid prototyping</span>—taking ideas from concept to deployed product by learning new frameworks quickly and iterating fast. whether it&apos;s building multi-agent ai systems, integrating blockchain, or training ml models for production, i thrive on projects that push technical boundaries.
                  </p>
                </div>
              </div>
            </section>

            {/* Currently Building */}
            <section className="fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-light mb-6 text-pink">currently building</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <ProjectCard 
                  title="darwin."
                  href="https://darwin.qtzx.dev"
                  color="text-pink"
                  description="multi-agent AI coding platform with real-time blockchain voting."
                  tech={["React", "Gemini 2.5", "Sui", "Three.js"]}
                />
                <ProjectCard 
                  title="replate (blueprint)"
                  color="text-sapphire"
                  description="mobile app digitizing donation tracking for 50+ food rescue orgs."
                  tech={["React Native", "Ruby on Rails"]}
                />
                <ProjectCard 
                  title="clearpath medical ai"
                  color="text-mauve"
                  description="ai agent to automate PFMEA analysis for medical device risk assessment."
                  tech={["Python", "LangChain", "LLMs"]}
                />
                <ProjectCard 
                  title="freelance website development"
                  color="text-blue"
                  description="freelance portfolio website development for college students to showcase their projects and skills."
                  tech={["React", "Vite", "Tailwind", "TypeScript"]}
                />
              </div>
            </section>

            {/* Experience */}
            <section className="fade-in" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-light mb-6 text-blue">experience</h2>
              <div className="space-y-8 border-l-2 border-white/5 pl-8 relative">
                <ExperienceItem 
                  role="Software Developer"
                  company="Blueprint"
                  companyColor="text-sapphire"
                  period="Fall 2025 – Present"
                  bullets={[
                    "Building mobile apps for social good with React Native and Ruby on Rails",
                    "Architected complete authentication system for Replate's food donation tracking app"
                  ]}
                />
                <ExperienceItem 
                  role="Software Engineering Intern"
                  company="OptiGenix"
                  companyColor="text-teal"
                  period="Summer 2025"
                  bullets={[
                    "Trained AI models for clinical data extraction achieving 92.3% accuracy",
                    "Built HIPAA-compliant workflows on GCP supporting 7,500+ monthly uploads",
                    "Led backend migration reducing infrastructure costs by 35%"
                  ]}
                />
                <ExperienceItem 
                  role="Professional Development Chair"
                  company="Theta Tau"
                  companyColor="text-yellow"
                  period="Spring 2025 – Present"
                  bullets={[
                    "Organize technical workshops and career development programming for 50+ engineering students",
                    "Coordinate industry networking events and alumni mentorship opportunities"
                  ]}
                />
              </div>
            </section>

            {/* GitHub Activity */}
            <section className="fade-in" style={{ animationDelay: '400ms' }}>
              <GitHubActivity />
            </section>

            {/* Recent Projects */}
            <section className="fade-in" style={{ animationDelay: '500ms' }}>
              <h2 className="text-2xl font-light mb-6 text-green">recent projects</h2>
              <div className="grid gap-3">
                 <CompactProject 
                   name="darwin." 
                   href="https://darwin.qtzx.dev" 
                   desc="6-agent AI orchestration system with real-time code generation" 
                   color="text-pink"
                 />
             <CompactProject 
               name="ClarifAI" 
               href="https://clarif-ai-prod.vercel.app/papers"
               desc="AI research agent generating animated video explanations" 
               color="text-mauve"
             />
                 <CompactProject 
                   name="crakd.co" 
                   href="https://crakd.co" 
                   desc="AI developer talent finder using GitHub metrics" 
                   color="text-blue"
                 />
                 <CompactProject 
                   name="InStephGram" 
                   desc="Full-stack social media platform with real-time features" 
                   color="text-green"
                 />
                 
                 <Link href="/projects" className="mt-2 inline-block text-peach hover:text-white transition-colors text-sm group">
                   View all projects <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                 </Link>
              </div>
            </section>

          </div>

          {/* Sidebar Column */}
          <aside className="space-y-8 fade-in h-fit lg:sticky lg:top-24" style={{ animationDelay: '200ms' }}>
            
            {/* Recruiting CTA */}
            <div className="p-5 border border-green/20 rounded-2xl bg-gradient-to-r from-green/5 to-transparent backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-green/20 transition-all duration-500"></div>
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-green animate-pulse"></span>
                    <p className="text-xs font-semibold text-green tracking-wide uppercase">Summer 2026 Internships</p>
                 </div>
                <p className="text-gray-400 text-sm mb-3">
                  Actively looking for roles in Full-Stack, AI/ML, or Mobile Dev.
                </p>
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  className="inline-flex items-center text-sm text-white hover:text-green transition-colors border-b border-transparent hover:border-green/50"
                >
                  Download Resume 
                  <span className="ml-1">→</span>
                </a>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h2 className="text-lg font-light mb-4 text-yellow">Tech Stack</h2>
              <div className="space-y-5">
                <SkillGroup title="Languages" skills={["Python", "TypeScript", "Java", "C++", "C", "SQL"]} color="bg-mauve/10 text-mauve border-mauve/20" />
                <SkillGroup title="Frontend" skills={["React", "React Native", "Next.js", "Three.js", "Tailwind"]} color="bg-blue/10 text-blue border-blue/20" />
                <SkillGroup title="Backend" skills={["Node.js", "Express", "FastAPI", "Rails"]} color="bg-green/10 text-green border-green/20" />
                <SkillGroup title="AI / ML" skills={["LangChain", "Letta", "Gemini", "PyTorch"]} color="bg-pink/10 text-pink border-pink/20" />
                <SkillGroup title="Cloud" skills={["AWS", "GCP", "Vercel", "Sui", "Docker"]} color="bg-peach/10 text-peach border-peach/20" />
              </div>
            </div>

            {/* Learning */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h2 className="text-lg font-light mb-3 text-gray-200">What I&apos;m Learning</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Currently diving deeper into <span className="text-mauve">LLM fine-tuning</span>, <span className="text-green">agent orchestration</span>, and building <span className="text-blue">production AI systems</span>.
              </p>
            </div>

            {/* Connect */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h2 className="text-lg font-light mb-4">Let&apos;s Connect</h2>
              <div className="grid grid-cols-2 gap-2">
                <SocialLink href="mailto:stephenhung@berkeley.edu" label="Email" color="hover:border-teal hover:text-teal" />
                <SocialLink href="/resume.pdf" label="Resume" color="hover:border-yellow hover:text-yellow" />
                <SocialLink href="https://www.linkedin.com/in/stephen-h-hung/" label="LinkedIn" color="hover:border-blue hover:text-blue" />
                <SocialLink href="https://github.com/stephenhungg" label="GitHub" color="hover:border-mauve hover:text-mauve" />
                <SocialLink href="https://devpost.com/stephenhungg" label="Devpost" color="hover:border-red hover:text-red" />
                <SocialLink href="https://x.com/stpnhh" label="Twitter" color="hover:border-sky hover:text-sky" />
              </div>
            </div>

          </aside>
        </div>

        <div className="mt-16 fade-in text-center" style={{ animationDelay: '1000ms' }}>
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}

// Sub-components for cleaner code

function ProjectCard({ title, href, color, description, tech }: { title: string, href?: string, color: string, description: string, tech: string[] }) {
  const Wrapper = href ? Link : 'div';
  const props = href ? { href, target: "_blank" as const } : {};

  return (
    // @ts-expect-error - Link component type doesn't match div type
    <Wrapper {...props} className="block group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-base font-medium ${color} group-hover:underline decoration-1 underline-offset-4`}>{title}</h3>
        {href && <span className="text-gray-500 group-hover:text-white transition-colors text-xs">↗</span>}
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-3 flex-1">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tech.map(t => (
          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-gray-400 border border-white/5">
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}

function ExperienceItem({ role, company, companyColor, period, bullets }: { role: string, company: string, companyColor: string, period: string, bullets: string[] }) {
  return (
    <div className="relative group">
      {/* Timeline Dot */}
      <div className="absolute -left-[41px] top-1.5 h-5 w-5 rounded-full border-4 border-black bg-gray-700 group-hover:bg-white transition-colors duration-300"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
        <div>
          <h3 className="text-lg font-medium text-gray-200">{role}</h3>
          <div className={`text-base ${companyColor} font-medium`}>@ {company}</div>
        </div>
        <span className="text-xs text-gray-500 font-mono mt-1 sm:mt-0 bg-white/5 px-2 py-1 rounded">{period}</span>
      </div>
      <ul className="text-sm text-gray-400 space-y-1.5 list-disc pl-4 marker:text-gray-600">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function CompactProject({ name, href, desc, color }: { name: string, href?: string, desc: string, color: string }) {
  return (
    <div className="flex items-baseline gap-2 text-sm">
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={`${color} font-medium hover:underline hover:opacity-80 shrink-0`}>{name}</a>
      ) : (
        <span className={`${color} font-medium shrink-0`}>{name}</span>
      )}
      <span className="text-gray-500 hidden sm:inline">—</span>
      <span className="text-gray-400 truncate">{desc}</span>
    </div>
  );
}

function SkillGroup({ title, skills, color }: { title: string, skills: string[], color: string }) {
  return (
    <div className="group">
      <h3 className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 group-hover:text-gray-300 transition-colors">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map(skill => (
          <span 
            key={skill} 
            className={`text-[10px] sm:text-xs px-2 py-1 rounded border ${color} bg-opacity-10 hover:bg-opacity-20 transition-all cursor-default`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function SocialLink({ href, label, color }: { href: string, label: string, color: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className={`flex items-center justify-center px-3 py-2 rounded-lg border border-white/10 bg-white/5 ${color} hover:bg-white/10 transition-all duration-300 text-xs text-gray-300 hover:text-white font-medium`}
    >
      {label}
    </a>
  );
}
