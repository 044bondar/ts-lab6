<script setup lang="ts">
import Dialog from 'primevue/dialog';
import AppButton from '../AppButton/AppButton.vue';

defineProps<{
  visible: boolean;
  header?: string;
  message: string;
}>();

defineEmits<{
  'update:visible': [value: boolean];
  confirm: [];
}>();
</script>

<template>
  <Dialog
      :visible="visible"
      modal
      :header="header || 'Підтвердження'"
      :style="{ width: '25rem' }"
      @update:visible="$emit('update:visible', $event)"
  >
    <p class="mb-4">{{ message }}</p>
    <div class="d-flex justify-content-end gap-2">
      <AppButton label="Ні" severity="secondary" @click="$emit('update:visible', false)" />
      <AppButton label="Так" severity="danger" @click="$emit('confirm')" />
    </div>
  </Dialog>
</template>