<script setup lang="ts">
const searchStore = useSearchStore()
const { filteredProducts } = storeToRefs(searchStore)
const { loading } = useProductStore()
</script>

<template>
  <v-container>
    <product-list-table />
  </v-container>
</template>
