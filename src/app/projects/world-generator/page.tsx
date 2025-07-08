import Image from "next/image";

export default function WorldGeneratorProject() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">2d world generator</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Simple 2d world generator built using java&apos;s stddraw library, with ray tracing based lighting and saving/loading functionality.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          Demo →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          A procedural 2D world generator that creates unique landscapes using algorithmic generation techniques. 
          The project features advanced lighting simulation using ray tracing principles and allows users to save 
          and load generated worlds.
        </p>
        
        {/* Project Image Section */}
        <div className="my-12">
          <div className="relative w-full max-w-3xl mx-auto">
            <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/world-generator.png"
                alt="2D World Generator Screenshot"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Pseudorandom room and hallway generation</li>
          <li>• Ray tracing based lighting system</li>
          <li>• World saving and loading functionality</li>
          <li>• Interactive world exploration</li>
          <li>• Customizable generation seeds</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Language: Java</li>
          <li>• Graphics: StdDraw library</li>
          <li>• File I/O: Custom serialization for world saving</li>
        </ul>
      </div>
    </main>
  );
} 