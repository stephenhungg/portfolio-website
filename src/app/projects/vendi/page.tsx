export default function VendiProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 mb-16 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
            ← Back to Projects
          </a>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-light mb-6 text-white tracking-tight">Vendi</h1>
        <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          Smart Vending Solutions - Interdisciplinary Engineering Project
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-yellow mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
              Led the development of a comprehensive smart vending machine project for UC Berkeley's Alpha Lambda engineering class. 
              This interdisciplinary project integrated mechanical, electrical, and software engineering to create a custom vending machine 
              designed for campus use, complete with a portfolio website showcasing the entire development process.
            </p>
          </section>

          {/* Project Components */}
          <section>
            <h2 className="text-2xl font-light text-mauve mb-4">Project Components</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Mechanical Engineering: Polycarbonate frame design, servo-controlled dispensing system" />
              <FeatureItem text="Electrical Systems: Arduino control board, sensor integration, power distribution" />
              <FeatureItem text="Software Design: User interface, inventory tracking, motor control algorithms" />
              <FeatureItem text="Web Portfolio: Team documentation, project gallery, technical specifications" />
            </ul>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Custom vending machine with servo-controlled dispensing" />
              <FeatureItem text="Arduino-based control system with sensor integration" />
              <FeatureItem text="Real-time inventory tracking and management" />
              <FeatureItem text="User-friendly interface for product selection" />
              <FeatureItem text="Responsive web portfolio with project documentation" />
              <FeatureItem text="Team collaboration tools and development timeline" />
            </ul>
          </section>

          {/* Development Process */}
          <section>
            <h2 className="text-2xl font-light text-blue mb-4">Development Process</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              As project lead, I coordinated a 15-week development cycle following agile methodology:
            </p>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Weeks 1-3: Planning & Research phase" />
              <FeatureItem text="Weeks 4-7: Design & Prototyping" />
              <FeatureItem text="Weeks 8-11: Implementation across all systems" />
              <FeatureItem text="Weeks 12-15: Testing & Refinement" />
            </ul>
          </section>

          {/* Team Leadership */}
          <section>
            <h2 className="text-2xl font-light text-sapphire mb-4">Team Leadership</h2>
            <p className="text-gray-400 leading-relaxed">
              Led a multidisciplinary team of UC Berkeley engineering students, coordinating across mechanical, 
              electrical, and software disciplines. Managed weekly sprints, technical integration challenges, 
              and ensured project deliverables were met on schedule.
            </p>
          </section>

          {/* Web Portfolio Features */}
          <section>
            <h2 className="text-2xl font-light text-peach mb-4">Web Portfolio Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Responsive design with mobile-friendly interface" />
              <FeatureItem text="Dark mode theme with red and gold color scheme" />
              <FeatureItem text="Interactive photo gallery showcasing development process" />
              <FeatureItem text="Timeline view of the engineering development process" />
              <FeatureItem text="Team profiles and project documentation" />
              <FeatureItem text="Technical specifications and system architecture" />
            </ul>
          </section>

          {/* Impact */}
          <section>
            <h2 className="text-2xl font-light text-teal mb-4">Impact</h2>
            <p className="text-gray-400 leading-relaxed">
              Successfully delivered a fully functional smart vending machine prototype with comprehensive documentation. 
              The project demonstrated practical application of engineering principles across multiple disciplines and 
              showcased effective team leadership in a complex technical project.
            </p>
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400">
                <span className="text-white font-medium">Note:</span> This project was completed as part of UC Berkeley's Alpha Lambda engineering coursework, 
                demonstrating interdisciplinary collaboration and real-world engineering problem solving.
              </p>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>
          
          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://github.com/stephenhungg/vendi-deployment" label="GitHub Repo" primary />
              <ProjectLink href="https://vendi-deployment.vercel.app" label="Live Site" />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Hardware" items={["Arduino", "Servos", "Sensors"]} />
              <TechSection title="Frontend" items={["HTML5", "CSS3", "TypeScript", "Vite"]} />
              <TechSection title="Styling" items={["Custom CSS", "Dark Theme"]} />
              <TechSection title="Deployment" items={["Vercel"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}

// Helper Components

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-green mt-1.5 text-xs">●</span>
      <span>{text}</span>
    </li>
  );
}

function ProjectLink({ href, label, primary }: { href: string, label: string, primary?: boolean }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
        primary 
          ? 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02]' 
          : 'bg-black/20 text-gray-300 hover:bg-black/40 hover:text-white border border-white/10 hover:border-white/20'
      }`}
    >
      <span>{label}</span>
      {!primary && <span className="ml-auto text-gray-600 text-sm">↗</span>}
    </a>
  );
}

function TechSection({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-2">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
