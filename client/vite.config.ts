import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true, // 포트 충돌 방지
    port: 5002, // 기본 포트 (원하는 포트로 변경 가능)
    host: '0.0.0.0', // ✅ 외부 접속 허용
  },
});
