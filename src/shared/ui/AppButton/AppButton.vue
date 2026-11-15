<script setup lang="ts">
import Button from 'primevue/button';

defineProps<{
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast';
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  size?: 'small' | 'large';
}>();

defineEmits<{ click: [event: MouseEvent] }>();
</script>

<template>
  <Button
      :label="label"
      :loading="loading"
      :disabled="disabled"
      :severity="severity"
      :type="type"
      :icon="icon"
      :size="size"
      @click="$emit('click', $event)"
  />
</template>