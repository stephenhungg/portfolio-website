export default function SpotifyTUIProject() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <a href="/projects" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          ← Back to Projects
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">spotifytui</h1>
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
          Spotify TUI is a comprehensive terminal-based application that brings the full power of Spotify to your command line. 
          Built with Python and Textual, it provides a beautiful, responsive interface for controlling your music playback, 
          managing playlists, and exploring your music library—all from the comfort of your terminal.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Playback Control: Play, pause, skip, and control your Spotify playback</li>
          <li>• Playlist Management: Browse and manage your playlists</li>
          <li>• Search: Search for tracks, artists, albums, and playlists</li>
          <li>• Artist Pages: View artist information and albums</li>
          <li>• Album Pages: Browse album tracks and details</li>
          <li>• Lyrics Display: View lyrics for currently playing tracks</li>
          <li>• Volume Control: Adjust playback volume</li>
          <li>• Device Management: Switch between available playback devices</li>
          <li>• Modern UI: Beautiful, responsive terminal interface</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Python: Core application logic and API integration</li>
          <li>• Textual: Modern TUI framework for Python</li>
          <li>• Spotipy: Official Spotify Web API wrapper</li>
          <li>• Rich: Rich text and formatting library</li>
          <li>• Requests: HTTP library for API calls</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Architecture</h2>
        <p className="text-gray-400 leading-relaxed">
          The application is built with a modular architecture featuring:
        </p>
        <ul className="text-gray-400 space-y-2 mt-3">
          <li>• <strong>SpotifyTUI:</strong> Main application class managing navigation and state</li>
          <li>• <strong>SpotifyClient:</strong> Wrapper around the Spotify API using spotipy</li>
          <li>• <strong>Screen Classes:</strong> Individual components for each functional area</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Controls</h2>
        <h3 className="text-lg font-medium mt-6 mb-3">Navigation</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• 1-6: Switch between screens directly</li>
          <li>• Arrow Keys: Navigate UI elements</li>
          <li>• Q: Quit application</li>
        </ul>

        <h3 className="text-lg font-medium mt-6 mb-3">Playback</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• Space: Play/Pause</li>
          <li>• N or →: Next track</li>
          <li>• P or ←: Previous track</li>
        </ul>

        <h3 className="text-lg font-medium mt-6 mb-3">Playlists</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• ↑↓ or j/k: Navigate playlists/tracks (Vim-style)</li>
          <li>• Enter: View tracks or play</li>
          <li>• ESC or B: Go back</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Spotify API Scopes</h2>
        <p className="text-gray-400 leading-relaxed">
          The application requests the following Spotify API scopes for full functionality:
        </p>
        <ul className="text-gray-400 space-y-2 mt-3">
          <li>• user-read-playback-state: Read current playback state</li>
          <li>• user-modify-playback-state: Control playback</li>
          <li>• user-read-currently-playing: Get currently playing track</li>
          <li>• user-read-playback-position: Get playback position</li>
          <li>• user-read-recently-played: Access recently played tracks</li>
          <li>• playlist-read-private: Read private playlists</li>
          <li>• user-library-read: Read user&apos;s library</li>
          <li>• user-top-read: Read user&apos;s top tracks/artists</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Modern Features</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Real-time album art: 16x16 pixel art displays</li>
          <li>• Scrolling track lists: Auto-scroll through long playlists</li>
          <li>• Progress bars: Visual track progress</li>
          <li>• Live notifications: Instant feedback for actions</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Prerequisites</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Python 3.8 or higher</li>
          <li>• Spotify account</li>
          <li>• Spotify Developer App credentials</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Installation</h2>
        <ol className="text-gray-400 space-y-2 list-decimal list-inside">
          <li>Clone the repository: <code className="bg-gray-800 px-2 py-1 rounded">git clone https://github.com/stephenhungg/spotifytui.git</code></li>
          <li>Create and activate a virtual environment</li>
          <li>Install dependencies: <code className="bg-gray-800 px-2 py-1 rounded">pip install -r requirements.txt</code></li>
          <li>Install the package: <code className="bg-gray-800 px-2 py-1 rounded">pip install -e .</code></li>
          <li>Set up Spotify API credentials in the Developer Dashboard</li>
          <li>Configure environment variables with your credentials</li>
        </ol>

        <h2 className="text-xl font-semibold mt-8 mb-4">Usage</h2>
        <p className="text-gray-400 leading-relaxed">
          After installation, you can run the application using:
        </p>
        <ul className="text-gray-400 space-y-2 mt-3">
          <li>• Global command: <code className="bg-gray-800 px-2 py-1 rounded">spotifytui</code></li>
          <li>• Direct script: <code className="bg-gray-800 px-2 py-1 rounded">python simple_tui.py</code></li>
          <li>• Launcher script: <code className="bg-gray-800 px-2 py-1 rounded">./spotifytui_launcher.sh</code></li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Roadmap</h2>
        <p className="text-gray-400 leading-relaxed">
          Future features planned include user library management, recently played tracks, top tracks and artists, 
          follow/unfollow artists, create and edit playlists, audio analysis, crossfade settings, keyboard shortcuts 
          customization, theme customization, and export functionality.
        </p>

        <div className="bg-gray-800 p-4 rounded-lg mt-8">
          <p className="text-gray-300 text-sm">
            <strong>Note:</strong> This application requires a Spotify Premium account for full functionality. 
            Some features may be limited with free accounts due to Spotify API restrictions.
          </p>
        </div>
      </div>
    </main>
  );
}
