<template>
  <div class="text-center bg-white py-16 text-4xl font-bold rounded-lg">
    All Products
  </div>

  <v-row class="mt-4 mx-0 bg-white rounded-lg">
    <v-col cols="12" md="4">
      <v-list>
        <v-list-item prepend-icon="ri-filter-line" title="Filters">
          <template #append>
            <v-btn
              @click="
                () => {
                  currentPriceFilter = [0, 100000]
                  priceFilter = undefined
                  selectedCategories = []
                  search = ''
                }
              "
              prepend-icon="ri-close-line"
              variant="text"
            >
              clean all
            </v-btn>
          </template>
        </v-list-item>

        <v-divider />

        <v-list-item>
          <v-text-field
            density="compact"
            label="Search products..."
            single-line
            placeholder="Search"
            v-model="search"
          />
        </v-list-item>

        <v-divider />

        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Price"></v-list-item>
          </template>

          <v-list-item class="mx-4 text-body-2">
            Range: {{ currentPriceFilter[0] ?? 0 }} SP -
            {{ currentPriceFilter[1] ?? 100000 }} SP
            <template #append>
              <v-btn
                variant="outlined"
                density="compact"
                size="x-small"
                color="black"
                @click="priceFilter = currentPriceFilter"
              >
                Filter
              </v-btn>
            </template>
          </v-list-item>

          <v-list-item>
            <v-range-slider
              track-size="3"
              thumb-size="20"
              min="0"
              max="100000"
              step="5000"
              hide-details
              strict
              v-model="currentPriceFilter"
              class="mx-6"
            />
          </v-list-item>
        </v-list-group>

        <v-divider />

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

    <v-col cols="12" md="8">
      <div v-if="productStore.products?.length as any > 0">
        <div class="ms-6 text-center">
          showing - from <strong>{{ (page - 1) * 10 }}</strong> to
          <strong>{{
            (page - 1) * 10 + (productStore.products?.length ?? 0)
          }}</strong>
          of - <strong>{{ productsTotalCount }}</strong> products
        </div>

        <v-row class="w-fit mx-auto" v-if="pending">
          <v-col v-for="n in 6" md="4" cols="12">
            <v-skeleton-loader width="230" type="image, article">
            </v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row class="w-fit mx-auto" v-else>
          <v-col
            v-for="product in productStore.products"
            :key="product.id"
            md="4"
            cols="12"
          >
            <ProductCard :product-value="product" />
          </v-col>
        </v-row>
      </div>

      <div class="ma-8 text-error" v-else>
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

const page = ref(1)

const { productsTotalCount, search, paginationOptions, priceFilter } =
  storeToRefs(productStore)

const currentPriceFilter = ref([0, 100000])

const pageCount = computed(() => {
  return Math.ceil(productsTotalCount.value / 10)
})

watch(page, () => {
  paginationOptions.value.page = page.value
  refresh()
})
watch(search, () => {
  refresh()
})
watch(selectedCategories, () => {
  refresh()
})
watch(priceFilter, () => {
  refresh()
})

definePageMeta({
  layout: 'user-layout'
})
</script>

<!-- <style>

</style> -->
