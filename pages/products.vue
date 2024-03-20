<template>
  <div class="text-center bg-white py-16 text-4xl font-bold rounded-lg">
    All Products
  </div>

  <v-row class="mt-4 mx-0 bg-white rounded-lg">
    <v-col cols="3">
      <v-list>
        <v-list-item title="Filters">
          <template #append>
            <v-btn
              @click="
                () => {
                  selectedCategories = []
                }
              "
              prepend-icon="ri-close-line"
              variant="text"
            >
              clean all
            </v-btn>
          </template>
        </v-list-item>

        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Price"></v-list-item>
          </template>

          <v-list-item> <v-slider class="mx-6 my-2" /> </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Categories"></v-list-item>
          </template>

          <v-item-group
            multiple
            v-model="selectedCategories"
            selected-class="font-semibold text-primary"
          >
            <v-item
              v-for="category in categories"
              v-slot="{ selectedClass, toggle }"
            >
              <v-list-item
                @click="toggle"
                :class="selectedClass"
                :title="category.name"
              >
                <template #append>
                  <v-chip> {{ category.category_products_count }} </v-chip>
                </template>
              </v-list-item>
            </v-item>
          </v-item-group>
        </v-list-group>
      </v-list>
    </v-col>

    <v-divider vertical />

    <v-col cols="9">
      <v-row>
        <v-skeleton-loader
          max-width="300"
          type="image, article"
          :loading="pending"
        >
          <v-col
            v-for="product in productStore.products"
            :key="product.id"
            md="3"
            cols="12"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-skeleton-loader>
      </v-row>

      <div
        class="ma-8 text-error"
        v-if="productStore.products?.length as any <= 0"
      >
        <v-icon>ri-information-2-line</v-icon> no products yet...
      </div>

      <div class="text-center ma-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="4"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
// Importing category store and necessary utilities
const categoryStore = useCategoryStore()
const { categories, selectedCategories } = storeToRefs(categoryStore)
const productStore = useProductStore()

// Fetching products data asynchronously
const { pending, refresh } = useAsyncData(() => productStore.getAllProducts())

// Fetching categories data asynchronously
useAsyncData(() => categoryStore.getAllCategories())

const itemsPerPage = ref(10)
const page = ref(1)

const { productsTotalCount, paginationOptions } = storeToRefs(productStore)

const pageCount = computed(() => {
  return Math.ceil(productsTotalCount.value / itemsPerPage.value)
})

watch(page, () => {
  paginationOptions.value.page = page.value
  refresh()
})
watch(selectedCategories, () => {
  refresh()
})

definePageMeta({
  layout: 'user-layout'
})
</script>

<!-- <style>

</style> -->
