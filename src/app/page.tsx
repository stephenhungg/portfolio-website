import dynamic from 'next/dynamic';
import Link from 'next/link';
import TypingAnimation from "../components/TypingAnimation";
import VisitorCount from "../components/VisitorCount";
import FadeIn from "../components/FadeIn";
import GalleryPrefetcher from "../components/GalleryPrefetcher";

const TunnelBackground = dynamic(
  () => import('../components/TunnelBackground'),
);

export default function Home() {
  return (
    <>
      <TunnelBackground />
      <GalleryPrefetcher />
      <FadeIn>
        <main className="flex flex-col items-center justify-center min-h-[85vh] sm:min-h-[90vh] text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">

            {/* Main Heading */}
            <div className="mb-6 sm:mb-8 fade-in">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4 sm:mb-6 text-white drop-shadow-lg px-2">
                <TypingAnimation
                  text="Stephen Hung"
                  speed={100}
                  delay={500}
                  showCursor={true}
                  cursorChar="|"
                />
              </h1>
            </div>

            {/* Subtitle */}
            <div className="fade-in" style={{ animationDelay: '200ms' }}>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed sm:leading-relaxed font-light max-w-2xl mx-auto px-3 sm:px-0">
                Sophomore at <span className="text-blue font-medium relative inline-block group">
                  UC Berkeley
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue/50 transform scale-x-0 transition-transform group-hover:scale-x-100 duration-300 origin-left"></span>
                </span> studying EECS.
                <br className="hidden sm:block" />
                <span className="block sm:inline">Building the future with </span>
                <span className="text-green font-medium">Full-Stack</span>, <span className="text-mauve font-medium">ML</span>, and <span className="text-pink font-medium">AI</span>.
              </p>
            </div>

            {/* CTA Button */}
            <div className="fade-in" style={{ animationDelay: '400ms' }}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-black bg-white rounded-xl hover:bg-gray-200 transition-all duration-300 group"
              >
                View My Work
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>

            {/* Footer / Stats */}
            <div className="fade-in opacity-80 mt-8" style={{ animationDelay: '600ms' }}>
               <VisitorCount />
            </div>

          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in opacity-40 hidden sm:block" style={{ animationDelay: '800ms' }}>
            <div className="w-px h-8 bg-white/50 mx-auto mb-2 animate-pulse" />
            <svg className="w-4 h-4 text-white/50 mx-auto animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </main>
      </FadeIn>
    </>
  );
}
