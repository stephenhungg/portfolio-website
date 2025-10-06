export default function VendiProject() {
  return (
    <main className="max-w-4xl mx-auto pt-20 pb-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-4">Vendi</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Smart Vending Solutions - Interdisciplinary Engineering Project
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://github.com/stephenhungg/vendi-deployment" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
        <a href="https://vendi-deployment.vercel.app" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          Live Site →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          Led the development of a comprehensive smart vending machine project for UC Berkeley&apos;s Alpha Lambda engineering class. 
          This interdisciplinary project integrated mechanical, electrical, and software engineering to create a custom vending machine 
          designed for campus use, complete with a portfolio website showcasing the entire development process.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Project Components</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• <strong>Mechanical Engineering:</strong> Polycarbonate frame design, servo-controlled dispensing system</li>
          <li>• <strong>Electrical Systems:</strong> Arduino control board, sensor integration, power distribution</li>
          <li>• <strong>Software Design:</strong> User interface, inventory tracking, motor control algorithms</li>
          <li>• <strong>Web Portfolio:</strong> Team documentation, project gallery, technical specifications</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Custom vending machine with servo-controlled dispensing</li>
          <li>• Arduino-based control system with sensor integration</li>
          <li>• Real-time inventory tracking and management</li>
          <li>• User-friendly interface for product selection</li>
          <li>• Responsive web portfolio with project documentation</li>
          <li>• Team collaboration tools and development timeline</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• <strong>Hardware:</strong> Arduino, servos, sensors, polycarbonate materials</li>
          <li>• <strong>Frontend:</strong> HTML5, CSS3, TypeScript, Vite</li>
          <li>• <strong>Styling:</strong> Custom CSS with dark theme, responsive design</li>
          <li>• <strong>Animations:</strong> AOS (Animate On Scroll) library</li>
          <li>• <strong>Deployment:</strong> Vercel hosting</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Development Process</h2>
        <p className="text-gray-400 leading-relaxed">
          As project lead, I coordinated a 15-week development cycle following agile methodology:
        </p>
        <ul className="text-gray-400 space-y-2 mt-3">
          <li>• <strong>Weeks 1-3:</strong> Planning & Research phase</li>
          <li>• <strong>Weeks 4-7:</strong> Design & Prototyping</li>
          <li>• <strong>Weeks 8-11:</strong> Implementation across all systems</li>
          <li>• <strong>Weeks 12-15:</strong> Testing & Refinement</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Team Leadership</h2>
        <p className="text-gray-400 leading-relaxed">
          Led a multidisciplinary team of UC Berkeley engineering students, coordinating across mechanical, 
          electrical, and software disciplines. Managed weekly sprints, technical integration challenges, 
          and ensured project deliverables were met on schedule.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Web Portfolio Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Responsive design with mobile-friendly interface</li>
          <li>• Dark mode theme with red and gold color scheme</li>
          <li>• Interactive photo gallery showcasing development process</li>
          <li>• Timeline view of the engineering development process</li>
          <li>• Team profiles and project documentation</li>
          <li>• Technical specifications and system architecture</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Impact</h2>
        <p className="text-gray-400 leading-relaxed">
          Successfully delivered a fully functional smart vending machine prototype with comprehensive documentation. 
          The project demonstrated practical application of engineering principles across multiple disciplines and 
          showcased effective team leadership in a complex technical project.
        </p>

        <div className="bg-gray-800 p-4 rounded-lg mt-8">
          <p className="text-gray-300 text-sm">
            <strong>Note:</strong> This project was completed as part of UC Berkeley&apos;s Alpha Lambda engineering coursework, 
            demonstrating interdisciplinary collaboration and real-world engineering problem solving.
          </p>
        </div>
      </div>
    </main>
  );
}
