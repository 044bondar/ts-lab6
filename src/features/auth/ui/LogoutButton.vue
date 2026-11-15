<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/entities/session';
import { AppButton } from '@/shared/ui';

const sessionStore = useSessionStore();
const router = useRouter();

const handleLogout = () => {
  sessionStore.clearSession();
  router.push({ name: 'login' });
};
</script>

<template>
  <AppButton label="Logout" severity="danger" size="small" @click="handleLogout" />
</template>