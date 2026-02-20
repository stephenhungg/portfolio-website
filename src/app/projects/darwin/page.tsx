import Image from "next/image";
import { FeatureItem, ProjectLink, TechSection } from "../../../components/ProjectComponents";

export default function DarwinProject() {
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
            src="/images/darwin.png"
            alt="darwin. screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">darwin.</h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          Evolve Your Agents // Blockchain-Powered AI Agent Competition Platform
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-pink mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
          DARWIN is an interactive platform where four specialized AI agents compete to complete tasks in real-time.
          Users watch the competition unfold and vote for their favorite agents, with all voting data permanently
              recorded on the <span className="text-blue font-medium">Sui blockchain</span> using sponsored transactions—no wallet or crypto required.
        </p>
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400">
                Built at <span className="text-white font-medium">CalHacks 12.0</span> (Oct 2025). Received honorable mention for Letta track.
        </p>
            </div>
          </section>

          {/* The Agents */}
          <section>
             <h2 className="text-2xl font-light text-mauve mb-6">The Agents</h2>
             <div className="grid sm:grid-cols-2 gap-4">
                <AgentCard name="Speedrunner" color="text-yellow" desc="Optimized for quick task completion" />
                <AgentCard name="Bloom" color="text-pink" desc="Creative & innovative problem solving" />
                <AgentCard name="Solver" color="text-blue" desc="Analytical thinking & precision" />
                <AgentCard name="Loader" color="text-green" desc="Methodical & thorough execution" />
             </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Real-time 3D visualizations using WebGL and custom GLSL shaders" />
              <FeatureItem text="On-chain voting system with sponsored transactions on Sui blockchain" />
              <FeatureItem text="Immutable vote recording ensuring transparency and permanence" />
              <FeatureItem text="Live leaderboards tracking agent performance metrics" />
              <FeatureItem text="Interactive expandable cards with detailed agent transcripts" />
        </ul>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-light text-sapphire mb-4">How It Works</h2>
        <p className="text-gray-400 leading-relaxed">
          Users observe four specialized AI agents solving problems in real-time, each with unique personalities
          and approaches. After watching the agents compete, users vote for their favorite through a simple interface.
          Behind the scenes, DARWIN uses sponsored transactions to write votes directly to the Sui blockchain,
          creating an immutable record of community preferences without requiring users to set up wallets or acquire cryptocurrency.
        </p>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>
          
          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://darwin.qtzx.dev" label="Live Demo" primary />
              <ProjectLink href="https://github.com/qtzx06/darwin" label="GitHub Repo" />
              <ProjectLink href="https://devpost.com/software/darwin-w6fez0" label="Devpost" />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Frontend" items={["React 19", "Vite", "Three.js", "Framer Motion"]} />
              <TechSection title="Backend" items={["Vercel Functions", "Express.js"]} />
              <TechSection title="Blockchain" items={["Sui Network", "Move", "Ed25519"]} />
              <TechSection title="Visuals" items={["GLSL Shaders", "WebGL", "LiquidChrome"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}

// Helper Components

function AgentCard({ name, color, desc }: { name: string, color: string, desc: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <h3 className={`font-medium ${color} mb-2`}>{name}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}
