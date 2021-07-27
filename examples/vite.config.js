import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'src/**',
    })
  ],
  server:{
    host:'0.0.0.0'
  }
})
