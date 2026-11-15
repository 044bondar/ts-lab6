<script setup lang="ts">
import Toast from 'primevue/toast';
import { AppHeader } from '@/widgets/app-header';
</script>

<template>
  <Toast />
  <AppHeader />
  <main style="max-width: 1100px; margin: 0 auto; padding: 0 1.5rem">
    <RouterView />
  </main>
</template>