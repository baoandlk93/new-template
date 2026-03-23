import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // nếu dùng app router (Next 13+). Nếu dùng pages router thì dùng next/router
// import { useRouter } from 'next/router';

type User = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  [k: string]: any;
};

type UseAuthReturn = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  logout: () => Promise<void>;
};

const API_CURRENT_USER = '/api/auth/me'; // adjust endpoint
const API_LOGOUT = '/api/auth/logout';

export default function useAuth({
  redirectTo = '',
  redirectIfFound = false,
} = {}): UseAuthReturn & { checkAndRedirect?: () => void } {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(API_CURRENT_USER, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user ?? data); // depending on your API shape
      } else if (res.status === 401) {
        setUser(null);
      } else {
        const text = await res.text();
        setError(text || 'Unknown error');
        setUser(null);
      }
    } catch (err: any) {
      setError(err?.message || 'Network error');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refetch = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await fetch(API_LOGOUT, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      // redirect to login (optional)
      router.push('/login');
    }
  }, [router]);

  // Optional auto-redirect helper
  const checkAndRedirect = useCallback(() => {
    if (!isLoading) {
      if (redirectTo) {
        if (redirectIfFound && user) {
          router.push(redirectTo);
        }
        if (!redirectIfFound && !user) {
          router.push(redirectTo);
        }
      }
    }
  }, [isLoading, redirectIfFound, redirectTo, router, user]);

  useEffect(() => {
    checkAndRedirect();
  }, [checkAndRedirect]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    refetch,
    logout,
    checkAndRedirect,
  };
}
