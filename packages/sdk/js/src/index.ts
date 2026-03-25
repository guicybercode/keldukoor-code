export * from "./client.js"
export * from "./server.js"

import { createLocalcodeClient } from "./client.js"
import { createLocalcodeServer } from "./server.js"
import type { ServerOptions } from "./server.js"

export async function createLocalcode(options?: ServerOptions) {
  const server = await createLocalcodeServer({
    ...options,
  })

  const client = createLocalcodeClient({
    baseUrl: server.url,
  })

  return {
    client,
    server,
  }
}
