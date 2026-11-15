import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { ServiceProvider } from '@/shared/api';
import type { AuthService } from '../api/auth.service';
import type { AuthUser, LoginDto } from './types';

const STORAGE_KEY = 'session';

export const useSessionStore = defineStore('session', () => {
    const accessToken = ref<string | null>(localStorage.getItem(`${STORAGE_KEY}:token`));
    const user = ref<AuthUser | null>(JSON.parse(localStorage.getItem(`${STORAGE_KEY}:user`) || 'null'));

    const isAuthenticated = computed(() => accessToken.value !== null);
    const authService = () => ServiceProvider.get<AuthService>('auth');

    function setSession(authData: AuthUser) {
        accessToken.value = authData.accessToken;
        user.value = authData;
        localStorage.setItem(`${STORAGE_KEY}:token`, authData.accessToken);
        localStorage.setItem(`${STORAGE_KEY}:refresh`, authData.refreshToken);
        localStorage.setItem(`${STORAGE_KEY}:user`, JSON.stringify(authData));
    }

    function clearSession() {
        accessToken.value = null;
        user.value = null;
        localStorage.removeItem(`${STORAGE_KEY}:token`);
        localStorage.removeItem(`${STORAGE_KEY}:refresh`);
        localStorage.removeItem(`${STORAGE_KEY}:user`);
    }

    async function login(credentials: LoginDto) {
        const data = await authService().login(credentials);
        setSession(data);
    }

    return { accessToken, user, isAuthenticated, setSession, clearSession, login };
});