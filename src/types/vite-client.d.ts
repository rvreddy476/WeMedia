declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly MODE?: string;
    readonly BASE_URL?: string;
    readonly PROD?: boolean;
    readonly DEV?: boolean;
    [key: string]: string | boolean | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
