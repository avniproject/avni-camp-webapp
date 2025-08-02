import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  const remoteApiTarget = env.VITE_API_BASE_URL || 'https://prerelease.avniproject.org'
  const localApiTarget = 'http://localhost:8021'
  
  console.log(`🔗 Vite mode: ${mode}`)
  console.log(`🔗 Remote API target: ${remoteApiTarget}`)
  console.log(`🔗 Local API target: ${localApiTarget}`)

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Authentication endpoints go to remote server
        '/api/user/generateToken': {
          target: remoteApiTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, options) => {
            console.log(`🔗 Auth proxy: /api/user/generateToken -> ${options.target}`)
          }
        },
        // All other API calls (including camp endpoints) go to local server
        '/api': {
          target: localApiTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, options) => {
            console.log(`🔗 Default proxy: /api -> ${options.target}`)
          }
        },
      },
    },
    define: {
      // Make environment variables available in the client
      __REMOTE_API_BASE_URL__: JSON.stringify(remoteApiTarget),
      __LOCAL_API_BASE_URL__: JSON.stringify(localApiTarget),
    }
  }
})