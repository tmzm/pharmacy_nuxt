<script setup lang="ts">
import ErrorToaster from '@/components/ErrorToaster.vue';
</script>

<template>
  <VApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ErrorToaster />
  </VApp>
</template>
