<template>
  <v-card class="my-8" variant="text">
    <div class="text-2xl font-semibold text-black mx-2">
      <v-list-item title="Explore our best sellers">
        <template #append>
          <v-btn append-icon="ri-arrow-right-line" variant="text">
            <nuxt-link to="/products"> view all </nuxt-link>
          </v-btn>
        </template>
      </v-list-item>
    </div>
    <v-slide-group
      v-model="model"
      class="pa-4"
      selected-class="bg-primary"
      show-arrows
    >
      <v-slide-group-item
        v-for="product in productStore.products"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </v-slide-group-item>
    </v-slide-group>
  </v-card>
</template>

<script lang="ts" setup>
const model = ref()
const productStore = useProductStore()

const { pending } = useAsyncData(() => productStore.getTopProductSellers())
</script>

<!-- <style>

</style> -->
