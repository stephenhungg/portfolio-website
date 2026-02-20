import Image from "next/image";
import { FeatureItem, ProjectLink, TechSection } from "../../../components/ProjectComponents";

export default function CrakdProject() {
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
            src="/images/crackd.png"
            alt="crakd.co screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">crakd.co</h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          AI-Powered Talent Identification for Developers
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-red mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
          Crakd identifies talented developers by combining GitHub metrics with LLM analysis. 
          The system uses ensemble models to score developers based on natural language queries, 
          balancing quantitative code metrics with qualitative profile assessment.
        </p>
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400">
                Built at <span className="text-white font-medium">B.E.L.L.E&apos;s SF AI hackathon</span> (September 2025).
        </p>
            </div>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="text-2xl font-light text-mauve mb-4">Architecture</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Ensemble models combine multiple ML algorithms for developer scoring" />
              <FeatureItem text="GitHub API integration for repository metrics and commit analysis" />
              <FeatureItem text="Gemini LLM processes natural language queries and profile text" />
              <FeatureItem text="Hybrid scoring weighs quantitative metrics with qualitative insights" />
              <FeatureItem text="Semantic search enables descriptive developer queries" />
              <FeatureItem text="Real-time dashboard for ranking visualization" />
              <FeatureItem text="Local analysis tools for detailed profile examination" />
        </ul>
          </section>

          {/* Impact */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Impact</h2>
        <p className="text-gray-400 leading-relaxed">
          Moves beyond resume screening by analyzing actual code contributions and GitHub activity. 
          Natural language queries make technical talent search accessible to non-technical recruiters 
          while maintaining analytical depth for accurate assessment.
        </p>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>
          
          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://crakd.co" label="Live Demo" primary />
              <ProjectLink href="https://github.com/qtzx06/crakd" label="GitHub Repo" />
              <ProjectLink href="https://docs.google.com/presentation/d/1BpHcg1xGJRs0n8QMZO2NZ-OzX1LANCFfSVIV0zRcYII/edit?usp=sharing" label="Slideshow" />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Frontend" items={["React.js", "Vite", "Tailwind CSS", "Framer Motion", "Three.js"]} />
              <TechSection title="Backend" items={["Python FastAPI", "Docker", "Render"]} />
              <TechSection title="APIs" items={["Google Gemini API", "GitHub GraphQL"]} />
              <TechSection title="Deployment" items={["Vercel", "Render"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}