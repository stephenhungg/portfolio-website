import { NextResponse } from "next/server";

const GITHUB_USERNAME = "stephenhungg";

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{ message: string }>;
    action?: string;
    ref_type?: string;
    ref?: string;
  };
  created_at: string;
}

export async function GET() {
  try {
    // Fetch recent events
    const eventsResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!eventsResponse.ok) {
      throw new Error("Failed to fetch GitHub events");
    }

    const events: GitHubEvent[] = await eventsResponse.json();

    // Fetch user stats
    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch GitHub user data");
    }

    const userData = await userResponse.json();

    // Process events to show meaningful activity
    const activities = events.slice(0, 5).map((event) => {
      const repo = event.repo.name.replace(`${GITHUB_USERNAME}/`, "");
      const date = new Date(event.created_at);

      let description = "";
      let icon = "📝";

      switch (event.type) {
        case "PushEvent":
          const commitCount = event.payload.commits?.length || 1;
          description = `Pushed ${commitCount} commit${commitCount > 1 ? "s" : ""} to ${repo}`;
          icon = "📝";
          break;
        case "CreateEvent":
          if (event.payload.ref_type === "repository") {
            description = `Created repository ${repo}`;
            icon = "🎉";
          } else if (event.payload.ref_type === "branch") {
            description = `Created branch ${event.payload.ref} in ${repo}`;
            icon = "🌿";
          }
          break;
        case "PullRequestEvent":
          description = `${event.payload.action === "opened" ? "Opened" : "Updated"} PR in ${repo}`;
          icon = "🔀";
          break;
        case "IssuesEvent":
          description = `${event.payload.action === "opened" ? "Opened" : "Updated"} issue in ${repo}`;
          icon = "🐛";
          break;
        case "WatchEvent":
          description = `Starred ${repo}`;
          icon = "⭐";
          break;
        case "ForkEvent":
          description = `Forked ${repo}`;
          icon = "🍴";
          break;
        default:
          description = `Activity in ${repo}`;
          icon = "💻";
      }

      return {
        description,
        icon,
        date: date.toISOString(),
        relativeTime: getRelativeTime(date),
      };
    });

    return NextResponse.json({
      activities,
      stats: {
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
      },
    });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity" },
      { status: 500 }
    );
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}
