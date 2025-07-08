

export default function Projects() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center fade-in">Projects</h1>
      <p className="text-gray-400 text-center mb-12 fade-in">
        Some of the projects are from school and some are on my own time.
      </p>
      
      <div className="grid gap-6">
        <div className="p-6 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-300 transform hover:scale-[1.02] fade-in">
          <div className="flex gap-4">
            <div className="text-sm text-gray-500 w-20 flex-shrink-0">april 2025</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold">instephgram</h2>
              </div>
              <p className="text-gray-400 mb-2 leading-relaxed">
                competition based instagram-style full-stack web app built using react.js, express.js, node.js, mongodb, and aws s3.
              </p>
              <a href="/projects/instephgram" className="text-sm text-gray-500 hover:text-gray-400 transition-colors group">
                Read more <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-300 transform hover:scale-[1.02] fade-in">
          <div className="flex gap-4">
            <div className="text-sm text-gray-500 w-20 flex-shrink-0">april 2025</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold">2d world generator</h2>
              </div>
              <p className="text-gray-400 mb-2 leading-relaxed">
                simple 2d world generator built using java&apos;s stddraw library, with ray tracing based lighting and saving/loading functionality.
              </p>
              <a href="/projects/world-generator" className="text-sm text-gray-500 hover:text-gray-400 transition-colors group">
                Read more <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-300 transform hover:scale-[1.02] fade-in">
          <div className="flex gap-4">
            <div className="text-sm text-gray-500 w-20 flex-shrink-0">march 2025</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold">ngordnet</h2>
              </div>
              <p className="text-gray-400 mb-2 leading-relaxed">
                ngram-based word frequency analyzer built using java replicating core features of google ngram viewer and princeton wordnet.
              </p>
              <a href="/projects/ngordnet" className="text-sm text-gray-500 hover:text-gray-400 transition-colors group">
                Read more <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-300 transform hover:scale-[1.02] fade-in">
          <div className="flex gap-4">
            <div className="text-sm text-gray-500 w-20 flex-shrink-0">april 2024</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold">mybackpack</h2>
              </div>
              <p className="text-gray-400 mb-2 leading-relaxed">
                professional networking mobile app helping high schoolers track and manage their academic and extracurricular activities, with ai powered feedback and resume building. built using java and xml.
              </p>
              <a href="/projects/fuzzy-school" className="text-sm text-gray-500 hover:text-gray-400 transition-colors group">
                Read more <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 