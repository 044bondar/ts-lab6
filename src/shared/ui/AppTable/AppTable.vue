<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export interface TableColumn {
  field: string;
  header: string;
}

defineProps<{
  items: unknown[];
  columns: TableColumn[];
  loading?: boolean;
}>();
</script>

<template>
  <DataTable :value="items" :loading="loading" striped-rows table-style="min-width: 50rem">
    <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" />
    <Column v-if="$slots.actions" header="Дії">
      <template #body="slotProps">
        <slot name="actions" :row="slotProps.data" />
      </template>
    </Column>
  </DataTable>
</template>