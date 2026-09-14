/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
}

declare module 'virtual:svg-icons-register' {
  const register: () => void
  export default register
}
declare module "nprogress"