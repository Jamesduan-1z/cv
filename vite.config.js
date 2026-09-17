import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('.', import.meta.url))

// GitHub Pages 项目站点地址为 https://<user>.github.io/cv/，构建产物需要以 /cv/ 为根路径。
// 本地 `npm run dev` 时仍使用根路径，保证开发体验不变。
const base = process.env.NODE_ENV === 'production' ? '/cv/' : '/'

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        app: resolve(root, 'app/index.html'),
      },
    },
  },
})
