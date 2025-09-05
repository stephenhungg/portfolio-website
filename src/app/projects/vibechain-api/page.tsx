export default function VibeChainAPIProject() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">vibechain-api</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          ML-powered playlist recommendation API that predicts what song you want to hear next.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://github.com/stephenhungg/vibechain-api" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          Built with TypeScript, Express, and TensorFlow.js, VibeChain analyzes Spotify track features—like danceability, energy, and valence—
          to predict the vibe of the next track. Trained on 32K Spotify tracks for realistic recommendations.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• REST API for music vibe prediction</li>
          <li>• Health check endpoint</li>
          <li>• Model training and retraining scripts</li>
          <li>• Optional Spotify integration via environment variables</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">API Examples</h2>
        <pre className="bg-gray-800 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto">
{`# Health check
curl http://localhost:8080/health

# Predict next track vibe
curl -X POST http://localhost:8080/analyze \
  -H "Content-Type: application/json" \
  -d '{"tracks":[{"danceability":0.8,"energy":0.9,"valence":0.7}]}'`}
        </pre>

        <h2 className="text-xl font-semibold mt-8 mb-4">Scripts</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• npm run dev – start dev server</li>
          <li>• npm run start – production build + run</li>
          <li>• npm run train – retrain the model</li>
          <li>• npm run health – check if api is up</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Config</h2>
        <pre className="bg-gray-800 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto">
{`# .env (optional)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_secret
PORT=8080`}
        </pre>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• TypeScript, Express</li>
          <li>• TensorFlow.js for ML</li>
          <li>• Docker, Vercel for deploy</li>
        </ul>
      </div>
    </main>
  );
}
