import Image from "next/image";
import { FeatureItem, ProjectLink, TechSection } from "../../../components/ProjectComponents";

export default function YolodexProject() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16 fade-in">
        <div className="mb-6">
          <a href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1">
            &larr; Back to Projects
          </a>
        </div>

        <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 mb-8">
          <Image
            src="/images/yolodex.png"
            alt="yolodex screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">yolodex</h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
          Agent Skills for Autonomous YOLO Dataset Generation &amp; Model Training
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

        {/* Main Content */}
        <div className="space-y-12 fade-in" style={{ animationDelay: '200ms' }}>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-light text-green mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
              Yolodex is a fully autonomous ML pipeline that turns any YouTube video into a trained YOLO object detection model&mdash;no manual labeling required.
              Point it at a video URL, name your target classes (e.g. &ldquo;player&rdquo;, &ldquo;weapon&rdquo;, &ldquo;vehicle&rdquo;), and the system handles everything:
              video download, frame extraction, AI-powered labeling, data augmentation, model training, evaluation, and iterative refinement.
            </p>
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400">
                Built at the <span className="text-white font-medium">OpenAI Codex Hackathon 2026</span> (Feb 2026). <span className="text-yellow font-medium">Winner.</span>
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-light text-mauve mb-4">Pipeline</h2>
            <div className="space-y-4">
              <PipelineStep step="1" title="Collect" desc="Downloads video via yt-dlp and extracts frames at configurable FPS using ffmpeg" />
              <PipelineStep step="2" title="Label" desc="Vision LLM (GPT-5-nano, GPT-4.1-mini, or Gemini) auto-generates YOLO bounding box labels for each frame via structured JSON output" />
              <PipelineStep step="3" title="Augment" desc="Generates 4 synthetic variants per frame (flip, brightness, contrast, noise) with coordinated label transforms — 5x dataset expansion" />
              <PipelineStep step="4" title="Train" desc="Runs Ultralytics YOLOv8 training on the labeled + augmented dataset" />
              <PipelineStep step="5" title="Evaluate" desc="Extracts mAP@50, precision, recall, per-class AP, and identifies weakest classes" />
              <PipelineStep step="6" title="Iterate" desc="If mAP@50 is below target, re-labels worst frames or collects more data and re-trains automatically" />
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-light text-blue mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-300">
              <FeatureItem text="Zero-label-effort training — point at a YouTube URL, name your classes, and it handles everything autonomously" />
              <FeatureItem text="Parallel Codex subagents via git worktrees for Nx speedup on frame labeling" />
              <FeatureItem text="Iterative feedback loop — automatically re-labels and re-trains until mAP@50 target is met" />
              <FeatureItem text="Multiple labeling backends: GPT-5-nano, GPT-4.1-mini, Gemini native bbox, CUA+SAM, and keyless Codex image-view mode" />
              <FeatureItem text="5x data augmentation with coordinated label transforms (flip, brightness, contrast, noise)" />
              <FeatureItem text="Codex-native skill architecture — each pipeline stage is an independently invocable skill" />
            </ul>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="fade-in space-y-8 lg:sticky lg:top-24 h-fit" style={{ animationDelay: '400ms' }}>

          {/* Links */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              <ProjectLink href="https://github.com/qtzx06/yolodex" label="GitHub Repo" primary />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
            <div className="space-y-4">
              <TechSection title="ML / Vision" items={["YOLOv8", "Ultralytics", "OpenAI GPT-5-nano", "GPT-4.1-mini", "Gemini"]} />
              <TechSection title="Pipeline" items={["Python", "ffmpeg", "yt-dlp", "Pillow", "NumPy"]} />
              <TechSection title="Orchestration" items={["OpenAI Codex CLI", "Git Worktrees", "Bash"]} />
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}

// Helper Components

function PipelineStep({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 w-8 h-8 rounded-lg bg-mauve/10 border border-mauve/20 flex items-center justify-center text-mauve text-sm font-medium">
        {step}
      </div>
      <div>
        <h3 className="text-base font-medium text-gray-200 mb-1">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
