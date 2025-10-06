export default function SpotifyTUIProject() {
  return (
    <main className="max-w-4xl mx-auto pt-20 pb-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-4">spotifytui</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Beautiful and feature-rich Terminal User Interface for Spotify
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://github.com/stephenhungg/spotifytui" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          GitHub →
        </a>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 leading-relaxed">
          A beautiful terminal user interface for Spotify built with Python and Textual. 
          Control your music, manage playlists, and browse your library—all from the command line.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Playback control (play, pause, skip)</li>
          <li>• Playlist management and browsing</li>
          <li>• Search tracks, artists, and albums</li>
          <li>• Lyrics display for current track</li>
          <li>• Volume control and device switching</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Python, Textual (TUI framework)</li>
          <li>• Spotipy (Spotify API wrapper)</li>
          <li>• Rich (text formatting)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Quick Start</h2>
        <pre className="bg-gray-800 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto">
{`git clone https://github.com/stephenhungg/spotifytui.git
cd spotifytui
pip install -r requirements.txt
pip install -e .
spotifytui`}
        </pre>

        <div className="bg-gray-800 p-4 rounded-lg mt-8">
          <p className="text-gray-300 text-sm">
            <strong>Note:</strong> Requires Spotify Premium account for full functionality.
          </p>
        </div>
      </div>
    </main>
  );
}
