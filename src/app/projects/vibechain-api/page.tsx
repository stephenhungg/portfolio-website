import Image from "next/image";
import { FeatureItem, ProjectLink, TechSection } from "../../../components/ProjectComponents";

export default function VibeChainAPIProject() {
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
            src="/images/vibechain.png"
            alt="vibechain-api screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">vibechain-api</h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          ML-powered playlist recommendation API that predicts what song you want to hear next
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-mauve mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
          Built with TypeScript, Express, and TensorFlow.js, VibeChain analyzes Spotify track features—like danceability, energy, and valence—
          to predict the vibe of the next track. Trained on 32K Spotify tracks for realistic recommendations.
        </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="REST API for music vibe prediction" />
              <FeatureItem text="Health check endpoint" />
              <FeatureItem text="Model training and retraining scripts" />
              <FeatureItem text="Optional Spotify integration via environment variables" />
        </ul>
          </section>

          {/* API Examples */}
          <section>
            <h2 className="text-2xl font-light text-blue mb-4">API Examples</h2>
            <pre className="bg-black/30 border border-white/10 p-4 rounded-xl text-sm text-gray-300 overflow-x-auto font-mono">
{`# Health check
curl http://localhost:8080/health

# Predict next track vibe
curl -X POST http://localhost:8080/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"tracks":[{"danceability":0.8,"energy":0.9,"valence":0.7}]}'`}
        </pre>
          </section>

          {/* Scripts */}
          <section>
            <h2 className="text-2xl font-light text-sapphire mb-4">Scripts</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="npm run dev – start dev server" />
              <FeatureItem text="npm run start – production build + run" />
              <FeatureItem text="npm run train – retrain the model" />
              <FeatureItem text="npm run health – check if api is up" />
        </ul>
          </section>

          {/* Config */}
          <section>
            <h2 className="text-2xl font-light text-peach mb-4">Configuration</h2>
            <pre className="bg-black/30 border border-white/10 p-4 rounded-xl text-sm text-gray-300 overflow-x-auto font-mono">
{`# .env (optional)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_secret
PORT=8080`}
        </pre>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>
          
          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://github.com/stephenhungg/vibechain-api" label="GitHub Repo" primary />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Language" items={["TypeScript"]} />
              <TechSection title="Framework" items={["Express"]} />
              <TechSection title="ML" items={["TensorFlow.js"]} />
              <TechSection title="Deployment" items={["Docker", "Vercel"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}