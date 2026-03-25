import type { Configuration } from "electron-builder"

const channel = (() => {
  const raw = process.env.LOCALCODE_CHANNEL
  if (raw === "dev" || raw === "beta" || raw === "prod") return raw
  return "dev"
})()

const getBase = (): Configuration => ({
  artifactName: "localcode-electron-${os}-${arch}.${ext}",
  directories: {
    output: "dist",
    buildResources: "resources",
  },
  files: ["out/**/*", "resources/**/*"],
  extraResources: [
    {
      from: "resources/",
      to: "",
      filter: ["localcode-cli*"],
    },
    {
      from: "native/",
      to: "native/",
      filter: ["index.js", "index.d.ts", "build/Release/mac_window.node", "swift-build/**"],
    },
  ],
  mac: {
    category: "public.app-category.developer-tools",
    icon: `resources/icons/icon.icns`,
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: "resources/entitlements.plist",
    entitlementsInherit: "resources/entitlements.plist",
    notarize: true,
    target: ["dmg", "zip"],
  },
  dmg: {
    sign: true,
  },
  protocols: {
    name: "LocalCode",
    schemes: ["localcode"],
  },
  win: {
    icon: `resources/icons/icon.ico`,
    target: ["nsis"],
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    installerIcon: `resources/icons/icon.ico`,
    installerHeaderIcon: `resources/icons/icon.ico`,
  },
  linux: {
    icon: `resources/icons`,
    category: "Development",
    target: ["AppImage", "deb", "rpm"],
  },
})

function getConfig() {
  const base = getBase()

  switch (channel) {
    case "dev": {
      return {
        ...base,
        appId: "ai.localcode.desktop.dev",
        productName: "LocalCode Dev",
        rpm: { packageName: "localcode-dev" },
      }
    }
    case "beta": {
      return {
        ...base,
        appId: "ai.localcode.desktop.beta",
        productName: "LocalCode Beta",
        protocols: { name: "LocalCode Beta", schemes: ["localcode"] },
        publish: { provider: "github", owner: "anomalyco", repo: "localcode-beta", channel: "latest" },
        rpm: { packageName: "localcode-beta" },
      }
    }
    case "prod": {
      return {
        ...base,
        appId: "ai.localcode.desktop",
        productName: "LocalCode",
        protocols: { name: "LocalCode", schemes: ["localcode"] },
        publish: { provider: "github", owner: "anomalyco", repo: "localcode", channel: "latest" },
        rpm: { packageName: "localcode" },
      }
    }
  }
}

export default getConfig()
