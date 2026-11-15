<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSessionStore } from '@/entities/session';
import { LogoutButton } from '@/features/auth';
import { ThemeToggle } from '@/features/theme-switcher';

const sessionStore = useSessionStore();
const { isAuthenticated } = storeToRefs(sessionStore);
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <RouterLink to="/" class="logo">VueLottery FSD</RouterLink>
      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/users">Users</RouterLink>
        <ThemeToggle />
        <LogoutButton v-if="isAuthenticated" />
        <RouterLink v-else to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  border-bottom: 1px solid var(--p-content-border-color);
  padding: 0.75rem 1.5rem;
  margin-bottom: 2rem;
}
.header-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  color: var(--p-primary-color);
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  a {
    text-decoration: none;
    color: inherit;
    &.router-link-active {
      color: var(--p-primary-color);
      font-weight: 600;
    }
  }
}
</style>