export default function ClearPathProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 mb-16 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
          ← Back to Projects
        </a>
      </div>

        <h1 className="text-5xl sm:text-6xl font-light mb-6 text-white tracking-tight">ClearPath Medical AI</h1>
        <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          AI-powered PFMEA analysis tool for medical device risk assessment
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-yellow mb-4">Overview</h2>
        <p className="text-gray-300 leading-relaxed text-lg font-light mb-4">
              A secure, locally-hosted Process Failure Mode and Effects Analysis (PFMEA) tool that uses generative AI
              to analyze work instruction PDFs and generate comprehensive risk assessments for medical device manufacturing.
              Built in collaboration with <span className="text-yellow font-medium">Theta Tau Professional Engineering Fraternity</span>.
        </p>
            <p className="text-gray-400 leading-relaxed">
              This tool revolutionizes traditional PFMEA workflows by automating the analysis of work instructions,
              identifying potential failure modes, and calculating risk priority numbers (RPN) through an agentic AI pipeline—all
              while keeping sensitive medical data completely local and secure.
            </p>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="PDF upload & parsing: extracts operation details, equipment, and control points from work instructions" />
              <FeatureItem text="Agentic AI analysis: multi-step self-validating pipeline (ANALYZE → RATE → VALIDATE → CORRECT → FINALIZE)" />
              <FeatureItem text="RPN calculation: implements exact risk prioritization matrix with severity, occurrence, and detection ratings" />
              <FeatureItem text="Interactive results table: sortable, expandable PFMEA results with detailed justifications" />
              <FeatureItem text="Export functionality: export results to CSV or Excel for documentation" />
              <FeatureItem text="100% local processing: all data stays on-premise—no external API calls or cloud services" />
        </ul>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="text-2xl font-light text-sapphire mb-6">Architecture</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <ArchitectureCard
                title="Backend"
                color="text-blue"
                desc="FastAPI (Python) with SQLite database for local storage"
              />
              <ArchitectureCard
                title="Frontend"
                color="text-pink"
                desc="React + TypeScript + Vite + TailwindCSS"
              />
              <ArchitectureCard
                title="LLM Engine"
                color="text-purple"
                desc="Ollama with local llama3.2:3b model"
              />
              <ArchitectureCard
                title="Security"
                color="text-green"
                desc="Local-only processing, input validation, secure file handling"
              />
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-light text-mauve mb-4">How It Works</h2>
            <div className="space-y-4">
              <WorkflowStep
                number="1"
                title="PDF Upload"
                desc="Upload work instruction PDFs containing manufacturing operations and procedures"
              />
              <WorkflowStep
                number="2"
                title="Extraction"
                desc="AI parser extracts structured data: operations, equipment, materials, and control points"
              />
              <WorkflowStep
                number="3"
                title="Agentic Analysis"
                desc="Multi-step AI pipeline analyzes each operation for potential failure modes with self-validation"
              />
              <WorkflowStep
                number="4"
                title="Risk Rating"
                desc="Calculates RPN using standardized PFMEA scales: Severity (1-5), Occurrence (1-5), Detection (1-5)"
              />
              <WorkflowStep
                number="5"
                title="Review & Export"
                desc="Interactive table with sortable results, detailed justifications, and CSV/Excel export"
              />
            </div>
          </section>

          {/* Rating Scales */}
          <section>
            <h2 className="text-2xl font-light text-red mb-4">PFMEA Rating System</h2>
            <p className="text-gray-400 mb-4">
              The tool uses standardized medical device PFMEA rating scales with a 5x5 matrix:
            </p>
            <div className="space-y-3">
              <RatingScale
                title="Severity (1-5)"
                desc="Impact on product performance and manufacturing process"
                color="text-red"
              />
              <RatingScale
                title="Occurrence (1-5)"
                desc="Frequency/likelihood of failure happening"
                color="text-yellow"
              />
              <RatingScale
                title="Detection (1-5)"
                desc="Likelihood of detecting failure before it reaches the customer"
                color="text-blue"
              />
            </div>
            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-white font-medium mb-3">Risk Levels</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green"></span>
                  <span className="text-gray-300"><span className="text-green font-medium">Low:</span> No further controls required</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-yellow"></span>
                  <span className="text-gray-300"><span className="text-yellow font-medium">Medium:</span> Pursue additional controls or document</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-red"></span>
                  <span className="text-gray-300"><span className="text-red font-medium">High:</span> Apply controls, design/process change may be required</span>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Privacy */}
          <section>
            <h2 className="text-2xl font-light text-teal mb-4">Security & Privacy</h2>
            <ul className="space-y-3 text-gray-300">
              <SecurityItem text="All processing happens locally—no data leaves your machine" />
              <SecurityItem text="PDF file validation (type, size, magic bytes)" />
              <SecurityItem text="Input sanitization before LLM prompts to prevent injection attacks" />
              <SecurityItem text="SQLite database stored locally with proper permissions" />
              <SecurityItem text="No authentication required (single-user local tool)" />
              <SecurityItem text="Compliant with medical device data handling requirements" />
        </ul>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>

          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://github.com/stephenhungg/pfmea-agent" label="GitHub Repo" primary />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Backend" items={["Python", "FastAPI", "SQLite", "Ollama"]} />
              <TechSection title="Frontend" items={["React", "TypeScript", "Vite", "TailwindCSS"]} />
              <TechSection title="AI/ML" items={["LLaMA 3.2", "LangChain", "PDF Parsing"]} />
              <TechSection title="Other" items={["Excel Export", "CSV Export"]} />
            </div>
          </div>

          {/* Status */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Project Status</h3>
            <div className="space-y-3">
              <StatusBadge label="In Development" color="bg-yellow/10 text-yellow border-yellow/20" />
              <div className="text-xs text-gray-400 mt-2">
                Active collaboration with Theta Tau and ClearPath Medical
              </div>
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

function SecurityItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-teal mt-1.5 text-xs">🔒</span>
      <span>{text}</span>
    </li>
  );
}

function ArchitectureCard({ title, color, desc }: { title: string, color: string, desc: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <h3 className={`font-medium ${color} mb-2`}>{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function WorkflowStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow/20 border border-yellow/40 flex items-center justify-center text-yellow font-medium text-sm">
        {number}
      </div>
      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

function RatingScale({ title, desc, color }: { title: string, desc: string, color: string }) {
  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
      <div className={`${color} font-medium text-sm mb-1`}>{title}</div>
      <div className="text-xs text-gray-400">{desc}</div>
    </div>
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

function StatusBadge({ label, color }: { label: string, color: string }) {
  return (
    <div className={`px-3 py-2 rounded-lg text-center text-sm font-medium border ${color}`}>
      {label}
    </div>
  );
}
