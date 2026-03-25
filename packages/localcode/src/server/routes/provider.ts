import { Hono } from "hono"
import { describeRoute, resolver } from "hono-openapi"
import z from "zod"
import { Provider } from "../../provider/provider"
import { ProviderAuth } from "../../provider/auth"
import { mapValues } from "remeda"
import { lazy } from "../../util/lazy"

export const ProviderRoutes = lazy(() =>
  new Hono()
    .get(
      "/",
      describeRoute({
        summary: "List providers",
        description: "Get a list of all available AI providers (Ollama only).",
        operationId: "provider.list",
        responses: {
          200: {
            description: "List of providers",
            content: {
              "application/json": {
                schema: resolver(
                  z.object({
                    all: Provider.Info.array(),
                    default: z.record(z.string(), z.string()),
                    connected: z.array(z.string()),
                  }),
                ),
              },
            },
          },
        },
      }),
      async (c) => {
        const connected = await Provider.list()
        return c.json({
          all: Object.values(connected),
          default: mapValues(connected, (item) => {
            const sorted = Provider.sort(Object.values(item.models))
            return sorted[0]?.id ?? ""
          }),
          connected: Object.keys(connected),
        })
      },
    )
    .get(
      "/auth",
      describeRoute({
        summary: "Get provider auth methods",
        description: "No auth needed for Ollama.",
        operationId: "provider.auth",
        responses: {
          200: {
            description: "Provider auth methods",
            content: {
              "application/json": {
                schema: resolver(z.record(z.string(), z.array(ProviderAuth.Method))),
              },
            },
          },
        },
      }),
      async (c) => {
        return c.json(await ProviderAuth.methods())
      },
    ),
)
