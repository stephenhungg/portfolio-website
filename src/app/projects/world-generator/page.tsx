import Image from "next/image";

export default function WorldGeneratorProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 mb-16 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
            ← Back to Projects
          </a>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-light mb-6 text-white tracking-tight">2D World Generator</h1>
        <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          Procedural 2D world generation with ray tracing based lighting
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-teal mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
              A procedural 2D world generator that creates unique landscapes using algorithmic generation techniques. 
              The project features advanced lighting simulation using ray tracing principles and allows users to save 
              and load generated worlds.
            </p>
          </section>

          {/* Project Image */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-gray-900">
            <Image
              src="/images/world-generator.png"
              alt="2D World Generator Screenshot"
              fill
              className="object-contain p-4"
              priority
            />
          </div>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Pseudorandom room and hallway generation" />
              <FeatureItem text="Ray tracing based lighting system" />
              <FeatureItem text="World saving and loading functionality" />
              <FeatureItem text="Interactive world exploration" />
              <FeatureItem text="Customizable generation seeds" />
            </ul>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>
          
          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="#" label="GitHub Repo" primary />
              <ProjectLink href="#" label="Demo" />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Language" items={["Java"]} />
              <TechSection title="Graphics" items={["StdDraw"]} />
              <TechSection title="File I/O" items={["Custom Serialization"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}

// Helper Components

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-green mt-1.5 text-xs">●</span>
      <span>{text}</span>
    </li>
  );
}

function ProjectLink({ href, label, primary }: { href: string, label: string, primary?: boolean }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
        primary 
          ? 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02]' 
          : 'bg-black/20 text-gray-300 hover:bg-black/40 hover:text-white border border-white/10 hover:border-white/20'
      }`}
    >
      <span>{label}</span>
      {!primary && <span className="ml-auto text-gray-600 text-sm">↗</span>}
    </a>
  );
}

function TechSection({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-2">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
