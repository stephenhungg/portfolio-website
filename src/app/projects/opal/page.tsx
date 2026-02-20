import Image from "next/image";
import { FeatureItem, ProjectLink, TechSection } from "../../../components/ProjectComponents";

export default function OpalProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
            &larr; Back to Projects
          </a>
        </div>

        <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 mb-8">
          <Image
            src="/images/opal.png"
            alt="opal screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">opal</h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          Voice-Controlled AI Agent That Browses the Web &amp; Plays Games Through Discord
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-peach mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
              Opal is a full-stack AI agent system that lets Discord users&mdash;via text or voice&mdash;command a real Chrome browser to do anything:
              browse the web, play browser games, search YouTube, fill forms, and more. Say <span className="text-peach font-medium">&ldquo;opal task go to YouTube and play lo-fi&rdquo;</span> in
              a voice channel, and it just does it.
            </p>
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400">
                Built at <span className="text-white font-medium">NexHacks</span> (Jan 2026).
              </p>
            </div>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="text-2xl font-light text-mauve mb-4">Architecture</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              The system uses a <span className="text-mauve font-medium">planner/navigator split agent</span> architecture. A strategic planner provides high-level reasoning every 3 steps,
              while a multimodal navigator executes DOM + vision actions every step. The Chrome extension streams live tab frames via WebRTC to a VLM relay for real-time screen understanding.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <ArchBlock title="Discord Bot" desc="Receives voice/text commands, queues goals, forwards to CUA backend" color="text-blue" />
              <ArchBlock title="CUA Backend" desc="FastAPI service orchestrating the planner/navigator agent loop" color="text-mauve" />
              <ArchBlock title="Chrome Extension" desc="CDP + WebRTC for DOM indexing, live streaming, and action execution" color="text-peach" />
              <ArchBlock title="LiveKit Voice Bridge" desc="Deepgram STT + ElevenLabs TTS for voice channel interaction" color="text-green" />
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Voice-to-browser control: speak a goal in Discord and opal executes it in a real Chrome browser" />
              <FeatureItem text="Real-time vision via Overshoot VLM — always-on screen understanding without polling" />
              <FeatureItem text="Tactical game mode: auto-detects browser games and switches to 100–300ms tick loop (Krunker, CS:GO, League, Minecraft)" />
              <FeatureItem text="3-layer memory system: working memory, episode compression every 8 steps, persistent session summaries" />
              <FeatureItem text="Spectator dashboard with live YOLO bounding box overlays, raycast visualization, and HUD stats" />
              <FeatureItem text="Persistent agent queue per Discord guild with goal preemption" />
            </ul>
          </section>

          {/* Game Mode */}
          <section>
            <h2 className="text-2xl font-light text-red mb-4">Tactical Game Mode</h2>
            <p className="text-gray-400 leading-relaxed">
              When the navigator detects a browser game, opal automatically switches to a fast tick loop (100&ndash;300ms) with game-specific tactical backends.
              It uses a visual observer combined with heuristic strategies to play games like Krunker, Skribbl.io, CS:GO browser mirrors, League of Legends, and Minecraft&mdash;all
              in real-time through the Chrome extension.
            </p>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>

          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://github.com/qtzx06/opal" label="GitHub Repo" primary />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Frontend" items={["React 19", "Vite", "Three.js", "WebGL", "GLSL"]} />
              <TechSection title="Backend" items={["Python", "FastAPI", "WebSocket", "PostgreSQL", "Redis"]} />
              <TechSection title="Discord" items={["discord.py", "LiveKit", "Deepgram", "ElevenLabs"]} />
              <TechSection title="AI / Vision" items={["Kimi K2.5", "Overshoot VLM", "xAI", "OpenAI"]} />
              <TechSection title="Browser" items={["Chrome DevTools Protocol", "WebRTC"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}

// Helper Components

function ArchBlock({ title, desc, color }: { title: string; desc: string; color: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <h3 className={`font-medium ${color} mb-2`}>{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}
