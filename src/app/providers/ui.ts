import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';

export function setupUI(app: App): void {
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: { darkModeSelector: '.app-dark' },
        },
    });
    app.use(ToastService);
}