import Image from "next/image";
import { FeatureItem, ProjectLink, TechSection } from "../../../components/ProjectComponents";

export default function PortfolioWebsiteProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
          ← Back to Projects
        </a>
      </div>

        <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 mb-8">
          <Image
            src="/images/portfolio.png"
            alt="Portfolio Website screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">Portfolio Website</h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          Modern, responsive portfolio website showcasing my projects and skills
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-pink mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
          A modern, responsive portfolio website built with Next.js and Tailwind CSS. 
          Features a clean design with project showcases, contact information, and smooth animations 
          to create an engaging user experience that highlights my development skills and projects.
        </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Responsive design that works on all devices" />
              <FeatureItem text="Project showcase with detailed descriptions" />
              <FeatureItem text="Contact page with social media links" />
              <FeatureItem text="Smooth animations and hover effects" />
              <FeatureItem text="Clean, modern UI with dark theme" />
              <FeatureItem text="Fast loading with Next.js optimization" />
        </ul>
          </section>

          {/* Design Features */}
          <section>
            <h2 className="text-2xl font-light text-blue mb-4">Design Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Card-based layout for projects" />
              <FeatureItem text="Hover animations and transitions" />
              <FeatureItem text="Consistent spacing and typography" />
              <FeatureItem text="Mobile-first responsive design" />
              <FeatureItem text="Dark theme with gray color palette" />
        </ul>
          </section>

          {/* Performance */}
          <section>
            <h2 className="text-2xl font-light text-sapphire mb-4">Performance</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Optimized images and assets" />
              <FeatureItem text="Fast page loads with Next.js" />
              <FeatureItem text="SEO-friendly structure" />
              <FeatureItem text="Accessible design patterns" />
        </ul>
          </section>

          {/* Development Process */}
          <section>
            <h2 className="text-2xl font-light text-mauve mb-4">Development Process</h2>
        <p className="text-gray-400 leading-relaxed">
          Built with a focus on clean code, performance, and user experience. 
          Used modern web development practices including component-based architecture, 
          responsive design principles, and optimization techniques to create a fast, 
          accessible, and visually appealing portfolio.
        </p>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>
          
          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://github.com/stephenhungg/portfolio-website" label="GitHub Repo" primary />
              <ProjectLink href="https://stephenhung.me" label="Live Site" />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Framework" items={["Next.js 14", "App Router"]} />
              <TechSection title="Language" items={["TypeScript"]} />
              <TechSection title="Styling" items={["Tailwind CSS"]} />
              <TechSection title="Deployment" items={["Vercel"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}