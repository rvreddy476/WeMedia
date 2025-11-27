/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE?: string;
  readonly BASE_URL?: string;
  readonly PROD?: boolean;
  readonly DEV?: boolean;
  readonly VITE_AUTH_BASE_URL?: string;
  [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
