import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore(
    'theme',
    () => {
        const isDark = ref(false);

        const applyTheme = (dark: boolean) => {
            document.documentElement.classList.toggle('app-dark', dark);
        };

        watch(isDark, (val) => applyTheme(val), { immediate: true });

        function toggleTheme() {
            isDark.value = !isDark.value;
        }

        return { isDark, toggleTheme };
    },
    { persist: true }
);