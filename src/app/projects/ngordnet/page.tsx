import Image from "next/image";

export default function NgordnetProject() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-4">ngordnet</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Ngram-based word frequency analyzer built using java replicating core features of google ngram viewer and princeton wordnet.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          Demo →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          Ngordnet is a sophisticated word frequency analysis tool that combines the power of Google&apos;s Ngram Viewer 
          with Princeton&apos;s WordNet semantic database. The application allows users to analyze word usage patterns 
          over time and explore semantic relationships between words.
        </p>
        
        {/* Project Image Section */}
        <div className="my-12">
          <div className="relative w-full max-w-3xl mx-auto">
            <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/ngordnet.png"
                alt="Ngordnet Word Frequency Analyzer Screenshot"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Historical word frequency analysis using ngram data</li>
          <li>• Semantic word relationships from WordNet</li>
          <li>• Interactive time-series visualization</li>
          <li>• Word similarity and synonym detection</li>
          <li>• Custom date range analysis</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Language: Java</li>
          <li>• Data Processing: Custom ngram parsing algorithms</li>
          <li>• Data Structures: Efficient graph and tree implementations</li>
          <li>• File I/O: Large dataset handling and optimization</li>
        </ul>
      </div>
    </main>
  );
} 