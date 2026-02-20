export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} Stephen Hung</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/stephenhungg"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/stephen-h-hung/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:stephenhung@berkeley.edu"
              className="hover:text-gray-300 transition-colors"
            >
              Email
            </a>
          </div>

          <div className="text-gray-600">
            Built with Next.js
          </div>
        </div>
      </div>
    </footer>
  );
}
