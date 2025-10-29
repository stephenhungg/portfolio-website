export default function DarwinProject() {
  return (
    <main className="max-w-4xl mx-auto pt-20 pb-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-light mb-4">DARWIN</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Evolve Your Agents // Blockchain-Powered AI Agent Competition Platform
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://darwin.qtzx.dev" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          Live Demo →
        </a>
        <a href="https://github.com/qtzx06/darwin" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
        <a href="https://devpost.com/software/darwin-w6fez0" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          Devpost →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          DARWIN is an interactive platform where four specialized AI agents compete to complete tasks in real-time.
          Users watch the competition unfold and vote for their favorite agents, with all voting data permanently
          recorded on the Sui blockchain using sponsored transactions—no wallet or crypto required.
        </p>

        <p className="text-gray-400 leading-relaxed mt-4">
          Built at CalHacks 12.0 in October 2025. Received honorable mention for Letta track.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">The Agents</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• <strong>Speedrunner:</strong> Speed-focused agent optimized for quick task completion</li>
          <li>• <strong>Bloom:</strong> Creative agent with innovative problem-solving approaches</li>
          <li>• <strong>Solver:</strong> Logical agent emphasizing analytical thinking and precision</li>
          <li>• <strong>Loader:</strong> Steady, methodical agent ensuring thorough execution</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Real-time 3D visualizations using WebGL and custom GLSL shaders</li>
          <li>• On-chain voting system with sponsored transactions on Sui blockchain</li>
          <li>• Immutable vote recording ensuring transparency and permanence</li>
          <li>• Live leaderboards tracking agent performance metrics</li>
          <li>• Interactive expandable cards with detailed agent transcripts</li>
          <li>• No wallet or crypto required—seamless blockchain interaction</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• <strong>Frontend:</strong> React 19, Vite, Three.js, Framer Motion</li>
          <li>• <strong>Backend:</strong> Vercel serverless functions, Express.js</li>
          <li>• <strong>Blockchain:</strong> Sui Network (devnet), Move smart contracts, Ed25519 cryptography</li>
          <li>• <strong>Visual Effects:</strong> Custom GLSL shaders, LiquidChrome gradients, WebGL rendering</li>
          <li>• <strong>Styling:</strong> Tailwind CSS with custom animations</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">How It Works</h2>
        <p className="text-gray-400 leading-relaxed">
          Users observe four specialized AI agents solving problems in real-time, each with unique personalities
          and approaches. After watching the agents compete, users vote for their favorite through a simple interface.
          Behind the scenes, DARWIN uses sponsored transactions to write votes directly to the Sui blockchain,
          creating an immutable record of community preferences without requiring users to set up wallets or acquire cryptocurrency.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Impact</h2>
        <p className="text-gray-400 leading-relaxed">
          DARWIN gamifies AI agent performance evaluation while demonstrating practical blockchain integration
          through sponsored transactions. The platform makes blockchain technology accessible to everyday users
          while creating a transparent, community-driven system for assessing AI agent capabilities across
          different problem-solving approaches.
        </p>
      </div>
    </main>
  );
}
