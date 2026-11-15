<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { useUsersStore, type User } from '@/entities/user';
import { AppTable, AppButton, AppInput, AppConfirmDialog, type TableColumn } from '@/shared/ui';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const usersStore = useUsersStore();
const { users, total, isLoading } = storeToRefs(usersStore);

const columns: TableColumn[] = [
  { field: 'id', header: 'ID' },
  { field: 'firstName', header: "Ім'я" },
  { field: 'lastName', header: 'Прізвище' },
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Телефон' },
];

const limit = 10;
const page = ref(Number(route.query.page) || 1);
const search = ref((route.query.q as string) || '');
const userToDelete = ref<User | null>(null);
const confirmVisible = ref(false);

const load = () => {
  usersStore.fetchUsers({ limit, skip: (page.value - 1) * limit, q: search.value });
};

watch(search, (val) => {
  page.value = 1;
  router.replace({ query: { ...(val ? { q: val } : {}) } });
  load();
});

onMounted(load);

const totalPages = computed(() => Math.ceil(total.value / limit));

const changePage = (newPage: number) => {
  page.value = newPage;
  router.replace({
    query: { ...(newPage > 1 ? { page: newPage } : {}), ...(search.value ? { q: search.value } : {}) },
  });
  load();
};

const askDelete = (user: User) => {
  userToDelete.value = user;
  confirmVisible.value = true;
};

const confirmDelete = async () => {
  if (userToDelete.value) {
    await usersStore.removeUser(userToDelete.value.id);
    toast.add({ severity: 'info', summary: 'Видалено', detail: 'Користувача видалено', life: 3000 });
  }
  confirmVisible.value = false;
};
</script>

<template>
  <div>
    <AppInput v-model="search" placeholder="Пошук за іменем..." />
    <AppTable :items="users" :columns="columns" :loading="isLoading">
      <template #actions="{ row }">
        <div class="d-flex gap-2">
          <AppButton
              label="Деталі"
              size="small"
              severity="info"
              @click="router.push(`/users/${(row as User).id}`)"
          />
          <AppButton
              label="Видалити"
              size="small"
              severity="danger"
              @click="askDelete(row as User)"
          />
        </div>
      </template>
    </AppTable>

    <div v-if="totalPages > 1" class="d-flex justify-content-between align-items-center mt-4">
      <span>Сторінка {{ page }} з {{ totalPages }}</span>
      <div class="d-flex gap-2">
        <AppButton label="Назад" size="small" severity="secondary" :disabled="page <= 1" @click="changePage(page - 1)" />
        <AppButton label="Вперед" size="small" severity="secondary" :disabled="page >= totalPages" @click="changePage(page + 1)" />
      </div>
    </div>

    <AppConfirmDialog
        v-model:visible="confirmVisible"
        :message="`Видалити учасника ${userToDelete?.firstName} ${userToDelete?.lastName}?`"
        @confirm="confirmDelete"
    />
  </div>
</template>