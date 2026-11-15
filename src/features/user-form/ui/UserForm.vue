<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { useToast } from 'primevue/usetoast';
import { useUsersStore, type User } from '@/entities/user';
import { AppInput, AppButton } from '@/shared/ui';

const props = defineProps<{ user?: User }>();
const emit = defineEmits<{ saved: [] }>();

const usersStore = useUsersStore();
const toast = useToast();

const schema = toTypedSchema(
    zod.object({
      firstName: zod.string().min(2, 'Мінімум 2 символи'),
      lastName: zod.string().min(2, 'Мінімум 2 символи'),
      email: zod.string().email('Невірний email'),
      username: zod.string().min(3, 'Мінімум 3 символи'),
      age: zod.coerce.number().min(18, 'Від 18 років'),
      phone: zod.string().regex(/^\+380\d{9}$/, 'Формат +380XXXXXXXXX'),
    })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: props.user || { age: 20 },
});

const { value: firstName, errorMessage: firstNameErr } = useField<string>('firstName');
const { value: lastName, errorMessage: lastNameErr } = useField<string>('lastName');
const { value: email, errorMessage: emailErr } = useField<string>('email');
const { value: username, errorMessage: usernameErr } = useField<string>('username');
const { value: age, errorMessage: ageErr } = useField<number>('age');
const { value: phone, errorMessage: phoneErr } = useField<string>('phone');

const onSubmit = handleSubmit(async (values) => {
  if (props.user) {
    await usersStore.updateUser(props.user.id, values);
    toast.add({ severity: 'success', summary: 'Оновлено', detail: 'Дані збережено', life: 3000 });
  } else {
    await usersStore.createUser({ ...values, gender: 'male', password: 'password123' });
    toast.add({ severity: 'success', summary: 'Створено', detail: 'Учасника додано', life: 3000 });
    resetForm();
  }
  emit('saved');
});
</script>

<template>
  <form class="row g-3" @submit.prevent="onSubmit">
    <div class="col-md-4"><AppInput v-model="firstName" label="Ім'я" :error-message="firstNameErr" /></div>
    <div class="col-md-4"><AppInput v-model="lastName" label="Прізвище" :error-message="lastNameErr" /></div>
    <div class="col-md-4"><AppInput v-model="email" label="Email" :error-message="emailErr" /></div>
    <div class="col-md-4"><AppInput v-model="username" label="Username" :error-message="usernameErr" /></div>
    <div class="col-md-4"><AppInput v-model="age" label="Вік" type="number" :error-message="ageErr" /></div>
    <div class="col-md-4"><AppInput v-model="phone" label="Телефон" placeholder="+380XXXXXXXXX" :error-message="phoneErr" /></div>
    <div class="col-12 d-flex justify-content-end">
      <AppButton type="submit" :label="user ? 'Оновити' : 'Створити'" />
    </div>
  </form>
</template>