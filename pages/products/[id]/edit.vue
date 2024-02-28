<template>
  <ProductForm v-if="!pending && !error" />
  <div v-else>
    loading
    <v-progress-circular indeterminate :loading="pending" color="primary" />
  </div>
  <v-card v-else>
    <v-card-text> no such product </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const productStore = useProductStore()
const route = useRoute()
const id = computed(() => {
  return (route.params as { id: number }).id
})

const { pending, error } = useAsyncData(() => productStore.getProduct(id.value))
</script>
