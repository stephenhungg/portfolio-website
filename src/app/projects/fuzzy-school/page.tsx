export default function FuzzySchoolProject() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-4">mybackpack</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          professional networking mobile app helping high schoolers track and manage their academic and extracurricular activities, with ai powered feedback and resume building. built using java and xml.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://github.com/stephenhungg/myBackpack" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          myBackpack is a comprehensive mobile application designed to help high school students manage their academic 
          journey and build professional networks. The app combines activity tracking, AI-powered feedback, and resume 
          building tools to prepare students for college and career success.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Academic activity tracking and goal setting</li>
          <li>• AI-powered feedback on activities and achievements</li>
          <li>• Professional resume builder with templates</li>
          <li>• Networking features for connecting with peers</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Mobile Development: Java for Android</li>
          <li>• UI/UX: XML layouts and Material Design</li>
          <li>• AI Integration: ChatGPT API for feedback generation</li>
          <li>• Data Management: SQLite database</li>
          <li>• Backend: RESTful API for data synchronization</li>
        </ul>
      </div>
    </main>
  );
} 