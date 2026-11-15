<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AppButton } from '@/shared/ui';
import { useThemeStore } from '../model/theme.store';

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
</script>

<template>
  <AppButton
      :label="isDark ? 'Світла тема' : 'Темна тема'"
      :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
      severity="secondary"
      size="small"
      @click="themeStore.toggleTheme()"
  />
</template>