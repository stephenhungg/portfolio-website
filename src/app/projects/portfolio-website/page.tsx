export default function PortfolioWebsiteProject() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Portfolio Website</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Modern, responsive portfolio website showcasing my projects and skills
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://github.com/stephenhungg/portfolio-website" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
        <a href="https://stephenhung.me" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          Live Site →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          A modern, responsive portfolio website built with Next.js and Tailwind CSS. 
          Features a clean design with project showcases, contact information, and smooth animations 
          to create an engaging user experience that highlights my development skills and projects.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Responsive design that works on all devices</li>
          <li>• Project showcase with detailed descriptions</li>
          <li>• Contact page with social media links</li>
          <li>• Smooth animations and hover effects</li>
          <li>• Clean, modern UI with dark theme</li>
          <li>• Fast loading with Next.js optimization</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Next.js 14 - React framework with App Router</li>
          <li>• TypeScript - Type-safe development</li>
          <li>• Tailwind CSS - Utility-first styling</li>
          <li>• Vercel - Deployment and hosting</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Design Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Card-based layout for projects</li>
          <li>• Hover animations and transitions</li>
          <li>• Consistent spacing and typography</li>
          <li>• Mobile-first responsive design</li>
          <li>• Dark theme with gray color palette</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Performance</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Optimized images and assets</li>
          <li>• Fast page loads with Next.js</li>
          <li>• SEO-friendly structure</li>
          <li>• Accessible design patterns</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Development Process</h2>
        <p className="text-gray-400 leading-relaxed">
          Built with a focus on clean code, performance, and user experience. 
          Used modern web development practices including component-based architecture, 
          responsive design principles, and optimization techniques to create a fast, 
          accessible, and visually appealing portfolio.
        </p>
      </div>
    </main>
  );
}
