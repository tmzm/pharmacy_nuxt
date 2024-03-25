<template>
  <v-app-bar elevation="0" height="40">
    <v-menu open-on-hover>
      <template v-slot:activator="{ props, isActive }">
        <v-btn
          color="black"
          :prepend-icon="!isActive ? 'ri-menu-2-line' : 'ri-close-line'"
          append-icon="ri-arrow-down-s-line"
          v-bind="props"
        >
          shop by category
        </v-btn>
      </template>

      <v-list>
        <div v-if="pending">
          loading... <v-progress-circular indeterminate />
        </div>
        <v-list-item
          v-else
          v-for="(c, index) in categoryStore.categories"
          :title="c.name"
          append-icon="ri-arrow-right-s-line"
          @click="filterProductsByCategory(index)"
        />
      </v-list>
    </v-menu>

    <v-btn color="black" prepend-icon="ri-price-tag-3-line"> OFFERS </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
const categoryStore = useCategoryStore()

const { selectedCategories } = storeToRefs(categoryStore)

const { pending } = useAsyncData(() => categoryStore.getAllCategories())

const filterProductsByCategory = (index: number) => {
  selectedCategories.value = [index]
  navigateTo(`/products`)
}
</script>

<!-- <style>

</style> -->
