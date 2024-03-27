<template>
  <v-card class="mb-16 mt-24" variant="text">
    <v-card-title class="text-h2 text-center"
      >Most Product <span class="text-secondary">Deals</span>
      <div class="text-h5 my-2">
        Explore our best sellers products or
        <nuxt-link to="/products"
          >Brows All <v-icon>ri-arrow-right-line</v-icon></nuxt-link
        >
      </div>
    </v-card-title>
    <v-slide-group v-model="model" selected-class="bg-primary" show-arrows>
      <v-slide-group-item
        v-for="product in productStore.products"
        :key="product.id"
      >
        <ProductCard :product-value="product" />
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
