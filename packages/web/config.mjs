const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://localcode.dev" : `https://${stage}.localcode.dev`,
  console: stage === "production" ? "https://localcode.dev/auth" : `https://${stage}.localcode.dev/auth`,
  email: "contact@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/anomalyco/localcode",
  discord: "https://localcode.dev/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
