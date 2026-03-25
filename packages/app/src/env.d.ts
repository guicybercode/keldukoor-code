import "solid-js"

interface ImportMetaEnv {
  readonly VITE_LOCALCODE_SERVER_HOST: string
  readonly VITE_LOCALCODE_SERVER_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      sortable: true
    }
  }
}
