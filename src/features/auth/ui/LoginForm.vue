<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { useToast } from 'primevue/usetoast';
import { useSessionStore } from '@/entities/session';
import { AppInput, AppButton } from '@/shared/ui';

const sessionStore = useSessionStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();
const isLoading = ref(false);

const schema = toTypedSchema(
    zod.object({
      username: zod.string().min(1, 'Введіть username'),
      password: zod.string().min(6, 'Мінімум 6 символів'),
    })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { username: 'emilys', password: 'emilyspass' },
});

const { value: username, errorMessage: usernameErr } = useField<string>('username');
const { value: password, errorMessage: passwordErr } = useField<string>('password');

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await sessionStore.login(values);
    toast.add({ severity: 'success', summary: 'Успіх', detail: 'Вхід виконано', life: 3000 });
    router.push((route.query.redirect as string) || '/users');
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Помилка', detail: (e as Error).message, life: 4000 });
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <AppInput v-model="username" label="Username" :error-message="usernameErr" />
    <AppInput v-model="password" label="Password" type="password" :error-message="passwordErr" />
    <AppButton type="submit" label="Увійти" :loading="isLoading" class="w-100 mt-2" />
  </form>
</template>