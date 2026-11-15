<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/entities/user';
import { UserForm } from '@/features/user-form';

const props = defineProps<{ id: string }>();
const usersStore = useUsersStore();
const { currentUser, isLoading, error } = storeToRefs(usersStore);

onMounted(() => usersStore.fetchUser(Number(props.id)));
watch(() => props.id, (newId) => usersStore.fetchUser(Number(newId)));
</script>

<template>
  <div class="p-4 border rounded">
    <RouterLink to="/users" class="btn btn-sm btn-secondary mb-3">&larr; Назад</RouterLink>
    <div v-if="isLoading">Завантаження...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else-if="currentUser">
      <h2>{{ currentUser.firstName }} {{ currentUser.lastName }} (@{{ currentUser.username }})</h2>
      <p><strong>Email:</strong> {{ currentUser.email }} | <strong>Телефон:</strong> {{ currentUser.phone }}</p>
      <hr class="my-4" />
      <h4>Редагувати дані</h4>
      <UserForm :user="currentUser" />
    </div>
  </div>
</template>