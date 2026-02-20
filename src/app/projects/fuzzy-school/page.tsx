import Image from "next/image";
import { FeatureItem, ProjectLink, TechSection } from "../../../components/ProjectComponents";

export default function FuzzySchoolProject() {
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
            src="/images/mybackpack.png"
            alt="MyBackpack screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">MyBackpack</h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          Professional networking mobile app for high school students
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-maroon mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
          myBackpack is a comprehensive mobile application designed to help high school students manage their academic 
          journey and build professional networks. The app combines activity tracking, AI-powered feedback, and resume 
          building tools to prepare students for college and career success.
        </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Academic activity tracking and goal setting" />
              <FeatureItem text="AI-powered feedback on activities and achievements" />
              <FeatureItem text="Professional resume builder with templates" />
              <FeatureItem text="Networking features for connecting with peers" />
        </ul>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>
          
          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://github.com/stephenhungg/myBackpack" label="GitHub Repo" primary />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="Mobile" items={["Java", "Android"]} />
              <TechSection title="UI/UX" items={["XML", "Material Design"]} />
              <TechSection title="AI" items={["ChatGPT API"]} />
              <TechSection title="Database" items={["SQLite"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
} 