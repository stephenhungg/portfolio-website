import Image from "next/image";
import { FeatureItem, ProjectLink, TechSection } from "../../../components/ProjectComponents";

export default function NgordnetProject() {
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
            src="/images/ngordnet.png"
            alt="ngordnet screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">ngordnet</h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          Ngram-based word frequency analyzer replicating Google Ngram Viewer and Princeton WordNet
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-sapphire mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
          Ngordnet is a sophisticated word frequency analysis tool that combines the power of Google&apos;s Ngram Viewer 
          with Princeton&apos;s WordNet semantic database. The application allows users to analyze word usage patterns 
          over time and explore semantic relationships between words.
        </p>
          </section>
        
          {/* Project Image */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-gray-900">
              <Image
                src="/images/ngordnet.png"
                alt="Ngordnet Word Frequency Analyzer Screenshot"
                fill
                className="object-contain p-4"
                priority
              />
            </div>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Historical word frequency analysis using ngram data" />
              <FeatureItem text="Semantic word relationships from WordNet" />
              <FeatureItem text="Interactive time-series visualization" />
              <FeatureItem text="Word similarity and synonym detection" />
              <FeatureItem text="Custom date range analysis" />
            </ul>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>
          
          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="#" label="Demo" primary />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Language" items={["Java"]} />
              <TechSection title="Data Processing" items={["Custom Algorithms"]} />
              <TechSection title="Data Structures" items={["Graphs", "Trees"]} />
          </div>
        </div>
        
        </aside>

      </div>
    </main>
  );
} 