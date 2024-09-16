import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8816,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/static': {
        target: 'http://127.0.0.1:7001/static',
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^/static`), '')

        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/upload': {
        target: 'http://127.0.0.1:7001/upload',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/upload`), '')
      }
    },
    // 提前转换和缓存文件以进行预热。可以在服务器启动时提高初始页面加载速度，并防止转换瀑布。
    warmup: {
      // 请注意，只应该预热频繁使用的文件，以免在启动时过载 Vite 开发服务器
      // 可以通过运行 npx vite --debug transform 并检查日志来找到频繁使用的文件
      clientFiles: ['./index.html', './src/{components,api}/*']
    }
  }
})
