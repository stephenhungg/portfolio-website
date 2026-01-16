export default function FlowProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 mb-16 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
          ← Back to Projects
        </a>
      </div>

        <h1 className="text-5xl sm:text-6xl font-light mb-6 text-white tracking-tight">flow</h1>
        <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          speak a concept, step inside it in 3d // spatial learning platform powered by gaussian splatting
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-blue mb-4">Overview</h2>
        <p className="text-gray-300 leading-relaxed text-lg font-light">
              flow converts voice commands into explorable 3D gaussian splat environments. say &quot;show me ancient rome&quot;
              and walk around inside it. after a ~5-minute generation pipeline chaining 6 APIs, you can first-person
              explore photorealistic spaces with educational overlays at 60fps. press &apos;t&apos; mid-exploration to ask questions
              about what you&apos;re seeing and get voice responses.
        </p>
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400">
                Built at <span className="text-white font-medium">SB Hacks XII</span> (Jan 2026). Won <span className="text-yellow font-medium">President&apos;s Pick</span> and <span className="text-lavender font-medium">Best Use of ElevenLabs</span>.
        </p>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-light text-sapphire mb-4">How It Works</h2>
            <div className="space-y-4">
              <PipelineStep
                number="1"
                title="Voice Capture"
                desc="Deepgram captures your voice command in real-time using streaming STT with Flux model"
              />
              <PipelineStep
                number="2"
                title="Content Orchestration"
                desc="Gemini orchestrates educational content and generates a cinematic image via 2.0-flash-exp-image-generation"
              />
              <PipelineStep
                number="3"
                title="3D Conversion"
                desc="Marble API converts the generated image into a 3D gaussian splat environment"
              />
              <PipelineStep
                number="4"
                title="Real-time Rendering"
                desc="SparkJS renders the .spz file at 60fps with collision detection for immersive exploration"
              />
              <PipelineStep
                number="5"
                title="Interactive Q&A"
                desc="Screenshot your view, Gemini Vision analyzes it, ElevenLabs provides voice narration"
              />
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Voice-controlled world generation with Deepgram streaming STT" />
              <FeatureItem text="Photorealistic 3D gaussian splat rendering at 60fps using SparkJS" />
              <FeatureItem text="Real-time pipeline updates via WebSocket with 6-API integration" />
              <FeatureItem text="Sphere-based collision detection with smooth wall sliding" />
              <FeatureItem text="Scene library system: checks local files → MongoDB → generates new" />
              <FeatureItem text="Contextual voice Q&A using Gemini Vision and ElevenLabs TTS" />
              <FeatureItem text="Rate limiting and admin bypass for production-ready deployment" />
        </ul>
          </section>

          {/* Challenges */}
          <section>
            <h2 className="text-2xl font-light text-maroon mb-4">Challenges Overcome</h2>
            <ul className="space-y-3 text-gray-300">
              <ChallengeItem
                challenge="Deepgram WebSocket dying instantly"
                solution="Explicitly declared linear16 PCM at 48kHz mono"
              />
              <ChallengeItem
                challenge="Gemini model compatibility issues"
                solution="Built backend proxy with fallback model chain"
              />
              <ChallengeItem
                challenge="Marble API CORS blocked client calls"
                solution="Created Express proxy for full async workflow"
              />
              <ChallengeItem
                challenge="Collision detection needed refinement"
                solution="Implemented multiple raycasts for smooth wall sliding"
              />
        </ul>
          </section>

          {/* Future Plans */}
          <section>
            <h2 className="text-2xl font-light text-peach mb-4">What&apos;s Next</h2>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-peach mt-1.5 text-xs">□</span>
                <span>Improve collision mesh processing for more accurate interactions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-peach mt-1.5 text-xs">□</span>
                <span>Multi-user collaborative exploration in shared 3D environments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-peach mt-1.5 text-xs">□</span>
                <span>VR/AR support for fully immersive spatial learning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-peach mt-1.5 text-xs">□</span>
                <span>AI tutoring guide that follows you through scenes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-peach mt-1.5 text-xs">□</span>
                <span>Educator tools for creating custom learning experiences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-peach mt-1.5 text-xs">□</span>
                <span>Community marketplace for user-generated worlds</span>
              </li>
            </ul>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>

          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://flow.stephenhung.me" label="Live Demo" primary />
              <ProjectLink href="https://github.com/stephenhung06/flow" label="GitHub Repo" />
              <ProjectLink href="https://devpost.com/software/flow-8jz4t1" label="Devpost" />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Frontend" items={["React", "TypeScript", "Three.js", "SparkJS"]} />
              <TechSection title="Backend" items={["Express.js", "Socket.IO", "Node.js"]} />
              <TechSection title="APIs" items={["Deepgram", "Gemini", "Marble", "ElevenLabs"]} />
              <TechSection title="Storage" items={["MongoDB Atlas", "Vultr Object Storage"]} />
              <TechSection title="Other" items={["Firebase", "Vite", "Tailwind", "Framer Motion"]} />
            </div>
          </div>

          {/* Awards */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Awards</h3>
            <div className="space-y-3">
              <AwardBadge title="President's Pick" event="SB Hacks XII" />
              <AwardBadge title="Best Use of ElevenLabs" event="SB Hacks XII" />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}

// Helper Components

function PipelineStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue/20 border border-blue/40 flex items-center justify-center text-blue font-medium text-sm">
        {number}
      </div>
      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-green mt-1.5 text-xs">●</span>
      <span>{text}</span>
    </li>
  );
}

function ChallengeItem({ challenge, solution }: { challenge: string, solution: string }) {
  return (
    <li className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="text-red font-medium mb-2 text-sm">⚠ {challenge}</div>
      <div className="text-green text-sm">✓ {solution}</div>
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

function AwardBadge({ title, event }: { title: string, event: string }) {
  return (
    <div className="p-3 rounded-lg bg-yellow/10 border border-yellow/20">
      <div className="text-yellow font-medium text-sm mb-1">🏆 {title}</div>
      <div className="text-xs text-gray-400">{event}</div>
    </div>
  );
}
