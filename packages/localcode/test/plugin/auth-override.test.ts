import { describe, expect, test } from "bun:test"
import path from "path"

const file = path.join(import.meta.dir, "../../src/plugin/index.ts")

describe("plugin.config-hook-error-isolation", () => {
  test("config hooks are individually error-isolated in the layer factory", async () => {
    const src = await Bun.file(file).text()

    // The config hook try/catch lives in the InstanceState factory (layer definition),
    // not in init() which now just delegates to the Effect service.
    expect(src).toContain("plugin config hook failed")

    const pattern =
      /for\s*\(const hook of hooks\)\s*\{[\s\S]*?try\s*\{[\s\S]*?\.config\?\.\([\s\S]*?\}\s*catch\s*\(err\)\s*\{[\s\S]*?plugin config hook failed[\s\S]*?\}/
    expect(pattern.test(src)).toBe(true)
  })
})
