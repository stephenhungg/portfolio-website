import Image from "next/image";

export default function ReplateProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
            ← Back to Projects
          </a>
        </div>

        <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 mb-8">
          <Image
            src="/images/replate.png"
            alt="Replate screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="text-center py-32">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-green tracking-tight">Replate</h1>
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
