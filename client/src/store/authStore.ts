import { create } from 'zustand';
import { getUser } from '../api/auth';

interface AuthState {
  token: string | null;
  user: { _id: string; name: string; companyNo: string; email: string } | null;
  setToken: (token: string | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

// Zustand Store 정의
export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'), // 초기 상태를 localStorage에서 가져옴
  user: null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token); // localStorage에 저장
    } else {
      localStorage.removeItem('token'); // 로그아웃 시 제거
    }
    set({ token });
  },
  fetchUser: async () => {
    try {
      const user = await getUser();
      set({ user });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
      set({ user: null });
    }
  },
  logout: () => {
    localStorage.removeItem('token'); // localStorage에서 토큰 제거
    set({ token: null });
  },
}));
