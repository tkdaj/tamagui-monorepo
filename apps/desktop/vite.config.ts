import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: 'electron/main.ts',
        onstart(args) {
          void args.startup();
        },
        vite: {
          build: {
            outDir: 'dist-electron',
            rollupOptions: {
              external: ['electron'],
            },
          },
        },
      },
      {
        entry: 'electron/preload.ts',
        onstart(args) {
          args.reload();
        },
        vite: {
          build: {
            outDir: 'dist-electron',
            minify: false,
            rollupOptions: {
              external: ['electron'],
              output: {
                format: 'cjs',
                entryFileNames: '[name].cjs',
                inlineDynamicImports: true,
              },
              plugins: [
                {
                  name: 'remove-exports',
                  generateBundle(_options, bundle) {
                    // Post-process the preload.cjs file to remove export statements
                    for (const fileName in bundle) {
                      if (fileName === 'preload.cjs') {
                        const chunk = bundle[fileName];
                        if (chunk && chunk.type === 'chunk') {
                          // Remove any export statements
                          chunk.code = chunk.code.replace(/^export\s+default\s+.+;?\s*$/gm, '');
                          // Execute the wrapped function immediately
                          chunk.code = chunk.code.replace(
                            /var require_preload = __commonJS\({[^}]+}\);$/,
                            (match: string) => {
                              return match + '\nrequire_preload();';
                            }
                          );
                        }
                      }
                    }
                  },
                },
              ],
            },
          },
        },
      },
    ]),
    renderer(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../web/src', import.meta.url)),
      '@web': fileURLToPath(new URL('../web/src', import.meta.url)),
      'react-native': 'react-native-web',
    },
  },
  define: {
    'process.env': {},
    'process.platform': JSON.stringify(process.platform),
    'process.version': JSON.stringify(process.version),
  },
  optimizeDeps: {
    exclude: ['fsevents'],
    include: ['react-native-web'],
  },
  server: {
    port: 5173,
  },
});
