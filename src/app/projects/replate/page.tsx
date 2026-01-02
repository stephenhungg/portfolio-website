export default function ReplateProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <section className="max-w-5xl mx-auto px-6 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
            ← Back to Projects
          </a>
        </div>

        <div className="text-center py-32">
          <h1 className="text-5xl sm:text-6xl font-light mb-6 text-green tracking-tight">Replate</h1>
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="text-sm font-bold uppercase tracking-wider bg-yellow/10 text-yellow px-3 py-1.5 rounded-full border border-yellow/20">
              WIP
            </span>
          </div>
          <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-light max-w-2xl mx-auto">
            This project page is currently under construction. Check back soon!
          </p>
        </div>
      </section>
    </main>
  );
}
