'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation'; // nếu dùng pages router thay bằng next/router
import { IUser } from '@/server/entity';


type UseLocalAuthOptions = {
storageKey?: string;
redirectTo?: string; // đường dẫn redirect tùy chọn
redirectIfAuthenticated?: boolean; // nếu true và user tồn tại => redirectTo
redirectIfUnauthenticated?: boolean; // nếu true và user ko tồn tại => redirectTo
parse?: (raw: string) => IUser | null; // tuỳ chỉnh parse
stringify?: (user: IUser | null) => string; // tuỳ chỉnh stringify
};

type UseLocalAuthReturn = {
user: IUser | null;
isLoading: boolean;
isAuthenticated: boolean;
error: string | null;
login: (user: IUser, options?: { redirectTo?: string }) => void;
logout: (options?: { redirectTo?: string }) => void;
refetch: () => void;
setUserLocalOnly: (user: IUser | null) => void; // chỉ cập nhật state + localStorage, ko redirect
};

export default function useLocalAuth({
storageKey = 'app_user',
redirectTo,
redirectIfAuthenticated = false,
redirectIfUnauthenticated = false,
parse,
stringify,
}: UseLocalAuthOptions = {}): UseLocalAuthReturn {
const router = useRouter();
const [user, setUser] = useState<IUser | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

const defaultParse = (raw: string) => {
try {
return JSON.parse(raw) as IUser;
} catch {
return null;
}
};
const defaultStringify = (u: IUser | null) => JSON.stringify(u);

const doParse = parse ?? defaultParse;
const doStringify = stringify ?? defaultStringify;

// read from localStorage (safe for client-only)
const readLocalUser = useCallback((): IUser | null => {
try {
const raw = localStorage.getItem(storageKey);
if (!raw) return null;
return doParse(raw);
} catch (err: any) {
console.error('useLocalAuth: readLocalUser error', err);
setError('Lỗi khi đọc dữ liệu user');
return null;
}
}, [storageKey, doParse]);

const writeLocalUser = useCallback(
(u: IUser | null) => {
try {
if (u === null) {
localStorage.removeItem(storageKey);
} else {
localStorage.setItem(storageKey, doStringify(u));
}
// dispatch custom event to notify same-tab listeners if needed
window.dispatchEvent(new Event('local-auth-change'));
} catch (err: any) {
console.error('useLocalAuth: writeLocalUser error', err);
setError('Lỗi khi lưu dữ liệu user');
}
},
[storageKey, doStringify]
);

// initial load
useEffect(() => {
setIsLoading(true);
try {
const u = readLocalUser();
setUser(u);
} catch (err: any) {
setError(err?.message || 'Lỗi khi nạp user');
setUser(null);
} finally {
setIsLoading(false);
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // chỉ chạy 1 lần client-side

// listen to storage events (sync across tabs)
useEffect(() => {
const onStorage = (e: StorageEvent) => {
if (e.key === storageKey) {
const newUser = e.newValue ? doParse(e.newValue) : null;
setUser(newUser);
}
};
const onCustom = () => {
// custom event dispatched when same-tab writeLocalUser used
const newUser = readLocalUser();
setUser(newUser);
};

// basic event listeners
window.addEventListener('storage', onStorage);
window.addEventListener('local-auth-change', onCustom);
return () => {
  window.removeEventListener('storage', onStorage);
  window.removeEventListener('local-auth-change', onCustom);
};

}, [storageKey, doParse, readLocalUser]);

// helpers
const login = useCallback(
(u: IUser, opts?: { redirectTo?: string }) => {
writeLocalUser(u);
setUser(u);
if (opts?.redirectTo) {
router.push(opts.redirectTo);
} else if (redirectTo && redirectIfAuthenticated) {
router.push(redirectTo);
}
},
[writeLocalUser, router, redirectTo, redirectIfAuthenticated]
);

const logout = useCallback(
(opts?: { redirectTo?: string }) => {
writeLocalUser(null);
setUser(null);
if (opts?.redirectTo) {
router.push(opts.redirectTo);
} else if (redirectTo && redirectIfUnauthenticated) {
router.push(redirectTo);
}
},
[writeLocalUser, router, redirectTo, redirectIfUnauthenticated]
);

const setUserLocalOnly = useCallback(
(u: IUser | null) => {
writeLocalUser(u);
setUser(u);
},
[writeLocalUser]
);

const refetch = useCallback(() => {
setIsLoading(true);
try {
const u = readLocalUser();
setUser(u);
setError(null);
} catch (err: any) {
setError(err?.message || 'Lỗi khi refetch user');
} finally {
setIsLoading(false);
}
}, [readLocalUser]);

// auto redirect logic when user or loading changes
useEffect(() => {
if (!isLoading && redirectTo) {
if (redirectIfAuthenticated && user) {
router.push(redirectTo);
}
if (redirectIfUnauthenticated && !user) {
router.push(redirectTo);
}
}
}, [isLoading, user, redirectTo, redirectIfAuthenticated, redirectIfUnauthenticated, router]);

const isAuthenticated = useMemo(() => !!user, [user]);

return {
user,
isLoading,
isAuthenticated,
error,
login,
logout,
refetch,
setUserLocalOnly,
};
}