export default function CrakdProject() {
  return (
    <main className="max-w-4xl mx-auto pt-20 pb-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-4">Crakd</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          AI-Powered Talent Identification for Developers
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://crakd.co" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          Live Demo →
        </a>
        <a href="https://github.com/qtzx06/crakd" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
        <a href="https://docs.google.com/presentation/d/1BpHcg1xGJRs0n8QMZO2NZ-OzX1LANCFfSVIV0zRcYII/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          Slideshow →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          Crakd identifies talented developers by combining GitHub metrics with LLM analysis. 
          The system uses ensemble models to score developers based on natural language queries, 
          balancing quantitative code metrics with qualitative profile assessment.
        </p>
        
        <p className="text-gray-400 leading-relaxed mt-4">
          Built at B.E.L.L.E&apos;s SF AI hackathon in September 2025.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Architecture</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Ensemble models combine multiple ML algorithms for developer scoring</li>
          <li>• GitHub API integration for repository metrics and commit analysis</li>
          <li>• Gemini LLM processes natural language queries and profile text</li>
          <li>• Hybrid scoring weighs quantitative metrics with qualitative insights</li>
          <li>• Semantic search enables descriptive developer queries</li>
          <li>• Real-time dashboard for ranking visualization</li>
          <li>• Local analysis tools for detailed profile examination</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• <strong>Frontend:</strong> React.js, Vite, Tailwind CSS, Framer Motion, 3js</li>
          <li>• <strong>Backend:</strong> Python FastAPI, Docker on Render, local analysis using with PCA (matplotlib/scikit-learn)</li>
          <li>• <strong>APIs:</strong> Google Gemini API, GitHub GraphQL</li>
          <li>• <strong>Deployment:</strong> Vercel (frontend), Render (backend)</li>
          <li>• <strong>Dev tools:</strong> Trae, TestSprite, neovim, Gemini CLI</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Impact</h2>
        <p className="text-gray-400 leading-relaxed">
          Moves beyond resume screening by analyzing actual code contributions and GitHub activity. 
          Natural language queries make technical talent search accessible to non-technical recruiters 
          while maintaining analytical depth for accurate assessment.
        </p>
      </div>
    </main>
  );
}