export default function InstephgramProject() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">instephgram</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Competition based instagram-style full-stack web app built using react.js, express.js, node.js, mongodb, and aws s3.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://github.com/stephenhungg/InStephGram" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
        <a href="https://instephgram.onrender.com" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          Website →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          Instephgram is a full-stack social media application inspired by Instagram, built with modern web technologies. 
          The platform features user authentication, photo sharing, likes and comments, user profiles, and a feed system.
          Try to gain dislikes instead of likes, and compete on a leaderboard.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• User authentication and profile management</li>
          <li>• Photo upload and sharing with AWS S3 integration</li>
          <li>• Real-time likes and comments system</li>
          <li>• Responsive design for mobile and desktop</li>
          <li>• MongoDB database for data persistence</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Frontend: React.js with ChakraUI</li>
          <li>• Backend: Express.js with Node.js</li>
          <li>• Database: MongoDB</li>
          <li>• Storage: AWS S3 for image uploads</li>
        </ul>
      </div>
    </main>
  );
} 