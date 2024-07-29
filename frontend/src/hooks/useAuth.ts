// useAuth.ts
import { useState } from 'react';
import { authApi } from '../api/auth';


export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await authApi.memberLogin(username, password);
      // 로그인 성공 처리 (예: 토큰 저장)
      setError(null);
      return response;
    } catch (err) {
      setError('로그인 실패 다시 시도해주세요');
      throw err;
    }
  };

  return { login, error };
};