import { defineConfig } from 'vite';

export default defineConfig(async () => {
  let reactPlugin: typeof import('@vitejs/plugin-react')['default'] | undefined;

  await import('@vitejs/plugin-react')
    .then((mod) => {
      reactPlugin = mod.default;
    })
    .catch(() => {
      reactPlugin = undefined;
    });

  return {
    plugins: reactPlugin ? [reactPlugin()] : [],
    esbuild: {
      jsx: 'automatic',
    },
  };
});
