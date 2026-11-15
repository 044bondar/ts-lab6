<script setup lang="ts">
import { UserForm } from '@/features/user-form';
import { UsersTable } from '@/widgets/users-table';
</script>

<template>
  <div>
    <section class="p-4 border rounded mb-4">
      <h3 class="mb-3">Додати учасника</h3>
      <UserForm />
    </section>
    <section class="p-4 border rounded">
      <UsersTable />
    </section>
  </div>
</template>