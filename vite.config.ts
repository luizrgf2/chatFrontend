import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import reactRefresh from "@vitejs/plugin-react-refresh";
import dotenv from "dotenv"

dotenv.config()

const {
  VITE_WEBSOCKET_URL,
  FRONTEND_PORT
} = process.env


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),reactRefresh()],



  server:{
    port: FRONTEND_PORT === undefined? undefined : Number(FRONTEND_PORT),
    proxy: {
      "/socket.io": {
        target: VITE_WEBSOCKET_URL,
        ws: true,
      },
    }
  }

})