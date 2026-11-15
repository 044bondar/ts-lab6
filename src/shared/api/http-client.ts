import { API_URL } from '@/shared/config';

interface RequestOptions extends RequestInit {
    _retry?: boolean;
}

export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const token = localStorage.getItem('session:token');
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${path}`, { ...options, headers });

    if (
        response.status === 401 &&
        !options._retry &&
        !path.includes('/auth/login') &&
        !path.includes('/auth/refresh')
    ) {
        options._retry = true;
        const refreshToken = localStorage.getItem('session:refresh');

        if (refreshToken) {
            const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
            });

            if (refreshRes.ok) {
                const tokens = await refreshRes.json();
                localStorage.setItem('session:token', tokens.accessToken);
                localStorage.setItem('session:refresh', tokens.refreshToken);

                headers.set('Authorization', `Bearer ${tokens.accessToken}`);
                const retryRes = await fetch(`${API_URL}${path}`, { ...options, headers });
                if (!retryRes.ok) throw new Error(`HTTP ${retryRes.status}`);
                return retryRes.json() as Promise<T>;
            }
        }
    }

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
}