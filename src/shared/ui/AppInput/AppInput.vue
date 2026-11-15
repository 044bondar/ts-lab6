<script setup lang="ts">
import InputText from 'primevue/inputtext';

defineProps<{
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: string;
  errorMessage?: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div class="input-field">
    <label v-if="label" class="input-label">{{ label }}</label>
    <InputText
        :model-value="modelValue !== undefined ? String(modelValue) : ''"
        :type="type || 'text'"
        :placeholder="placeholder"
        :invalid="!!errorMessage"
        class="w-100"
        @update:model-value="$emit('update:modelValue', $event ?? '')"
    />
    <small v-if="errorMessage" class="p-error text-danger">{{ errorMessage }}</small>
  </div>
</template>

<style scoped lang="scss">
.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}
.input-label {
  font-weight: 600;
  font-size: 0.875rem;
}
</style>