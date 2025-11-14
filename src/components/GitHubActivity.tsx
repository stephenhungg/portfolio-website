"use client";

import { useState, useEffect } from "react";

interface Activity {
  description: string;
  icon: string;
  date: string;
  relativeTime: string;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
}

interface GitHubData {
  activities: Activity[];
  stats: GitHubStats;
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github-activity")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setData(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="border border-white/10 rounded-lg p-6 bg-gray-900-theme/30">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-mauve" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <h2 className="text-lg font-semibold">GitHub Activity</h2>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-white/5 rounded animate-pulse"></div>
          <div className="h-4 bg-white/5 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-white/5 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border border-white/10 rounded-lg p-6 bg-gray-900-theme/30">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-mauve" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <h2 className="text-lg font-semibold">GitHub Activity</h2>
        </div>
        <p className="text-gray-400 text-sm">
          Unable to load activity.{" "}
          <a
            href="https://github.com/stephenhungg"
            target="_blank"
            rel="noreferrer"
            className="text-mauve hover:opacity-80 underline underline-offset-2"
          >
            View on GitHub →
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="border border-white/10 rounded-lg p-6 bg-gray-900-theme/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-mauve" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <h2 className="text-lg font-semibold">GitHub Activity</h2>
        </div>
        <a
          href="https://github.com/stephenhungg"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-mauve hover:opacity-80 transition-opacity"
        >
          View profile →
        </a>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/10">
        <div className="text-center">
          <div className="text-2xl font-semibold text-green">{data.stats.publicRepos}</div>
          <div className="text-xs text-gray-400">repositories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-blue">{data.stats.followers}</div>
          <div className="text-xs text-gray-400">followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-pink">{data.stats.following}</div>
          <div className="text-xs text-gray-400">following</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Recent Activity</h3>
        {data.activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 text-sm">
            <span className="text-lg flex-shrink-0">{activity.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-300">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-0.5">{activity.relativeTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

