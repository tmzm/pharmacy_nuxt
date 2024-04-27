<template>
  <ProductCard
    class="mb-8"
    v-for="f in favoriteStore.favorites"
    favorite-card
    :id="f.product_id"
  />
</template>

<script lang="ts" setup>
const favoriteStore = useFavoriteStore()

definePageMeta({
  layout: 'user-layout'
})
</script>

<!-- <style>

</style> -->
