import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
let proxys=function (){
  let apiPathArr=['/code','/auth','/admin','/file-management','/park-management','/oa']
  let proxys={}
  for(let i=0;i<apiPathArr.length;i++){
    proxys[apiPathArr[i]]={
      target: 'http://10.2.100.23',
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp('/'+apiPathArr[i]), '')
    }
  }
  return proxys
}()
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
    host:'0.0.0.0',
    port:'8085',
    proxy:proxys
  }
})
