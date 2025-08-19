export default function ClarifaiProject() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Clarifai</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          AI Research Paper Analysis and Video Generation
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://github.com/qtzx06/clarifai" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          Clarifai is a full-stack web application designed to deconstruct complex research papers into digestible concepts 
          and automatically generate video explanations in the style of 3blue1brown. It leverages a sophisticated, 
          self-correcting AI agent to create educational content directly from academic literature.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• PDF Upload & Analysis: Upload research papers in PDF format for comprehensive AI-powered analysis</li>
          <li>• Key Concept Extraction: Automatically identifies and extracts core concepts using Google's Gemini Flash</li>
          <li>• Agentic Video Generation: A LangChain agent uses Manim to generate high-quality, 3blue1brown-style animations</li>
          <li>• Self-Correcting Code Generation: The agent makes up to three attempts to generate and render Manim code</li>
          <li>• Intelligent Scene Splitting: AI intelligently splits complex concepts into multiple thematic scenes</li>
          <li>• Multi-Clip Video Stitching: Successfully rendered video clips are automatically stitched together using ffmpeg</li>
          <li>• Real-time Logging: WebSocket connection provides streaming of the agent's entire process</li>
          <li>• AI-Powered Code Implementation: Generate functional Python code examples for any extracted concept</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Frontend: Next.js, React, TypeScript, Tailwind CSS</li>
          <li>• Backend: FastAPI, Python, Uvicorn</li>
          <li>• AI/ML: Google Gemini Flash, LangChain</li>
          <li>• Video Generation: Manim Community v0.18.1</li>
          <li>• Video Processing: ffmpeg</li>
        </ul>
      </div>
    </main>
  );
} 