<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-card>
        <v-list>
          <v-list-item prepend-icon="ri-filter-line" title="Filters">
            <template #append>
              <v-btn
                @click="
                  () => {
                    currentPriceFilter = [0, 100000]
                    priceFilter = undefined
                    selectedCategories = []
                    search = undefined
                    sort = 'Newest'
                    refresh()
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

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Price"></v-list-item>
            </template>

            <v-list-item class="mx-4 text-body-2">
              Range: {{ currentPriceFilter[0] ?? 0 }} {{ $t('sp') }} -
              {{ currentPriceFilter[1] ?? 100000 }} {{ $t('sp') }}
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
                v-slot="{ isSelected, selectedClass, toggle }"
              >
                <v-list-item
                  density="compact"
                  @click="toggle"
                  :class="isSelected ? selectedClass : ''"
                  :title="category.name"
                >
                  <template #append>
                    <v-chip size="x-small">
                      {{ category.category_products_count }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-item>
            </v-item-group>
          </v-list-group>
        </v-list>
      </v-card>
    </v-col>

    <v-col cols="12" md="9">
      <div v-if="productStore.products?.length as any > 0">
        <v-app-bar
          border
          scroll-threshold="150"
          scroll-behavior="hide inverted"
          height="50"
          class="px-4 bg-background"
          :elevation="0"
        >
          <div>
            <div class="d-flex">
              <span v-if="search || selectedCategories.length > 0" class="me-2"
                >Results for
              </span>
              <strong v-if="search">"{{ search }}"</strong>
              <span v-if="search && selectedCategories.length > 0">, </span>
              <strong
                class="d-flex space-x-2"
                v-if="selectedCategories.length > 0"
                >"
                <div v-for="(c, index) in selectedCategories">
                  {{ categories[c].name
                  }}<span v-if="index != selectedCategories.length - 1">,</span>
                </div>
                "</strong
              >
            </div>
            showing <strong>{{ (page - 1) * 10 }}</strong> -
            <strong>{{
              (page - 1) * 10 + (productStore.products?.length ?? 0)
            }}</strong>
            of - <strong>{{ productsTotalCount }}</strong> products
          </div>

          <v-spacer />

          <div>
            <v-select
              variant="filled"
              density="compact"
              return-object
              v-model="sort"
              :items="[
                'Newest',
                'A-Z',
                'Oldest',
                'Prices (Low First)',
                'Prices (High First)'
              ]"
              bg-color="white"
            >
              <template #prepend> Sort by: </template>
            </v-select>
          </div>
        </v-app-bar>

        <v-row class="mx-auto ma-4" v-if="pending">
          <v-col v-for="n in 6" md="4" cols="12">
            <v-skeleton-loader width="230" type="image, article">
            </v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col
            v-for="product in productStore.products"
            :key="product.id"
            md="3"
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
import { isEqual } from 'radash'

// Importing category store and necessary utilities
const categoryStore = useCategoryStore()
const { categories, selectedCategories } = storeToRefs(categoryStore)
const productStore = useProductStore()

// Fetching products data asynchronously
const { pending, refresh } = await useAsyncData(() =>
  productStore.getAllProducts()
)

// Fetching categories data asynchronously
await useAsyncData(() => categoryStore.getAllCategories())

const page = ref(1)
const { productsTotalCount, search, sort, paginationOptions, priceFilter } =
  storeToRefs(productStore)

const currentPriceFilter = ref([0, 100000])

const pageCount = computed(() => {
  return Math.ceil(productsTotalCount.value / 10)
})

watch(page, () => {
  paginationOptions.value.page = page.value
  refresh()
})

watch(sort, (value, oldValue) => {
  if (isEqual(value, oldValue)) return
  refresh()
})

watch(selectedCategories, () => {
  refresh()
})

watch(priceFilter, () => {
  refresh()
})

watch(search, () => {
  refresh()
})

definePageMeta({
  layout: 'user-layout'
})
</script>

<!-- <style>

</style> -->
