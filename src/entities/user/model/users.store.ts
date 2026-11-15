import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { ServiceProvider } from '@/shared/api';
import type { UserService } from '../api/user.service';
import type { User, CreateUserDto, UpdateUserDto } from './types';

export const useUsersStore = defineStore('users', () => {
    const users = ref<User[]>([]);
    const currentUser = ref<User | null>(null);
    const total = ref(0);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const hasUsers = computed(() => users.value.length > 0);
    const service = () => ServiceProvider.get<UserService>('users');

    async function fetchUsers(params: { limit?: number; skip?: number; q?: string } = {}) {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await service().getAll(params);
            users.value = data.items;
            total.value = data.total;
        } catch (e) {
            error.value = (e as Error).message;
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchUser(id: number) {
        const existing = users.value.find((u) => u.id === id);
        if (existing) {
            currentUser.value = existing;
            return;
        }
        isLoading.value = true;
        error.value = null;
        try {
            currentUser.value = await service().getById(id);
        } catch (e) {
            error.value = (e as Error).message;
        } finally {
            isLoading.value = false;
        }
    }

    async function createUser(dto: CreateUserDto) {
        const created = await service().create(dto);
        users.value.unshift({ ...created, id: Date.now() });
        total.value += 1;
    }

    async function updateUser(id: number, dto: UpdateUserDto) {
        await service().update(id, dto);
        const idx = users.value.findIndex((u) => u.id === id);
        if (idx !== -1) {
            users.value[idx] = { ...users.value[idx], ...dto } as User;
        }
        if (currentUser.value?.id === id) {
            currentUser.value = { ...currentUser.value, ...dto } as User;
        }
    }

    async function removeUser(id: number) {
        await service().delete(id);
        users.value = users.value.filter((u) => u.id !== id);
        total.value -= 1;
    }

    return {
        users,
        currentUser,
        total,
        isLoading,
        error,
        hasUsers,
        fetchUsers,
        fetchUser,
        createUser,
        updateUser,
        removeUser,
    };
});