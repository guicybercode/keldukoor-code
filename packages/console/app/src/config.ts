/**
 * Application-wide constants and configuration
 */
export const config = {
  // Base URL
  baseUrl: "https://localcode.dev",

  // GitHub
  github: {
    repoUrl: "https://github.com/anomalyco/localcode",
    starsFormatted: {
      compact: "120K",
      full: "120,000",
    },
  },

  // Social links
  social: {
    twitter: "https://x.com/localcode",
    discord: "https://discord.gg/localcode",
  },

  // Static stats (used on landing page)
  stats: {
    contributors: "800",
    commits: "10,000",
    monthlyUsers: "5M",
  },
} as const
