import Image from "next/image";
import { FeatureItem, ProjectLink, TechSection } from "../../../components/ProjectComponents";

export default function ClarifaiProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
            ← Back to Projects
          </a>
        </div>

        <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 mb-8">
          <Image
            src="/images/clarifai.png"
            alt="ClarifAI screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">ClarifAI</h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          AI Research Paper Analysis and Video Generation
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-blue mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
              Clarifai is a full-stack web application designed to deconstruct complex research papers into digestible concepts 
              and automatically generate video explanations in the style of 3blue1brown. It leverages a sophisticated, 
              self-correcting AI agent to create educational content directly from academic literature.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="PDF Upload & Analysis: Upload research papers in PDF format for comprehensive AI-powered analysis" />
              <FeatureItem text="Key Concept Extraction: Automatically identifies and extracts core concepts using Google's Gemini Flash" />
              <FeatureItem text="Agentic Video Generation: A LangChain agent uses Manim to generate high-quality, 3blue1brown-style animations" />
              <FeatureItem text="Self-Correcting Code Generation: The agent makes up to three attempts to generate and render Manim code" />
              <FeatureItem text="Intelligent Scene Splitting: AI intelligently splits complex concepts into multiple thematic scenes" />
              <FeatureItem text="Multi-Clip Video Stitching: Successfully rendered video clips are automatically stitched together using ffmpeg" />
              <FeatureItem text="Real-time Logging: WebSocket connection provides streaming of the agent's entire process" />
              <FeatureItem text="AI-Powered Code Implementation: Generate functional Python code examples for any extracted concept" />
            </ul>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>
          
          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://clarifai.stephenhung.me" label="Live Demo" primary />
              <ProjectLink href="https://github.com/stephenhungg/clarifai" label="GitHub Repo" />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Frontend" items={["Next.js", "React", "TypeScript", "Tailwind CSS"]} />
              <TechSection title="Backend" items={["FastAPI", "Python", "Uvicorn"]} />
              <TechSection title="AI/ML" items={["Google Gemini Flash", "LangChain"]} />
              <TechSection title="Video" items={["Manim Community", "ffmpeg"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}