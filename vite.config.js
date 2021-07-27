import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'packages/utils/**',
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'packages'),
      name: 'LmUiElementPlus'
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
       exports: "named"
      }
    },
    outDir:'lib'
  }
})
