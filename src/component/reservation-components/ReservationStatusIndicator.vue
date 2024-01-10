<!-- TaskStatusIndicator.vue -->
<template>
  <span :class="statusClass" class="inline-flex items-center justify-center md:w-40 text-sm font-light space-x-6">
    <small>{{ statusText }}</small>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  isConfirm: {
    type: Boolean,
    required: true,
  },
  isCanceled: {
    type: Boolean,
    required: true,
  },
});

const statusText = computed(() => {
  if (!props.isCanceled) {
    return props.isConfirm ?
        'confirmada':
        'aguardando confirmação';
  }

  return 'cancelada';
});

const statusClass = computed(() => {
  if (!props.isCanceled) {
    return props.isConfirm ?
        'text-teal-800 bg-teal-100 rounded dark:bg-teal-900 dark:text-teal-300':
        'text-amber-800 bg-amber-100 rounded dark:bg-amber-900 dark:text-amber-300';
  }

  return 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300';
});
</script>
