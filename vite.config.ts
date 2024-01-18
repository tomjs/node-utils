import { builtinModules } from 'node:module';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  build: {
    target: ['es2021', 'node16'],
    lib: {
      entry: 'src/index.ts',
      name: 'Tomjs',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      external: builtinModules
        .concat(builtinModules.map(s => `node:${s}`))
        .concat(Object.keys(pkg.dependencies)),
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
