import { $ } from "bun"

import { copyBinaryToSidecarFolder, getCurrentSidecar, windowsify } from "./utils"

await $`bun ./scripts/copy-icons.ts ${process.env.LOCALCODE_CHANNEL ?? "dev"}`

const RUST_TARGET = Bun.env.RUST_TARGET

const sidecarConfig = getCurrentSidecar(RUST_TARGET)

const binaryPath = windowsify(`../localcode/dist/${sidecarConfig.ocBinary}/bin/localcode`)

await (sidecarConfig.ocBinary.includes("-baseline")
  ? $`cd ../localcode && bun run build --single --baseline`
  : $`cd ../localcode && bun run build --single`)

await copyBinaryToSidecarFolder(binaryPath, RUST_TARGET)
