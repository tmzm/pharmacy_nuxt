<script setup lang="ts">
import no_img from '@images/no-img.jpeg'
import { debounce, isEqual } from 'radash'

const productStore = useProductStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { products } = storeToRefs(productStore)
const { selectedCategories } = storeToRefs(useCategoryStore())
const { pending, refresh } = useAsyncData(() => productStore.getAllProducts())
const { loading, paginationOptions, search, productsTotalCount } =
  storeToRefs(productStore)

useAsyncData(() => productStore.getTotalCount())

const dialogDelete = ref(false)
const deleteId = ref()

const deleteModuleAction = (id: number) => {
  dialogDelete.value = true
  deleteId.value = id
}

const deleteProduct = () => {
  dialogDelete.value = false
  productStore.deleteProduct(deleteId.value)
  refresh()
}

watch(paginationOptions, async (oldValue, newValue) => {
  if (isEqual(oldValue, newValue)) return

  refresh()
})

watch(productsTotalCount, async (oldValue, newValue) => {
  if (isEqual(oldValue, newValue)) return

  refresh()
})

watch(search, () =>
  debounce({ delay: 100 }, () => {
    refresh()
  })
)

const pageCount = computed(() => {
  return Math.ceil(productsTotalCount.value / itemsPerPage.value)
})

watch(selectedCategories, () => refresh())
</script>

<template>
  <v-card title="All Products">
    <delete-modal
      v-model="dialogDelete"
      :loading="loading"
      @close="dialogDelete = false"
      @delete="deleteProduct()"
    />

    <CategoriesSelect />

    <template v-slot:text>
      <v-row>
        <v-col cols="8">
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="ri-search-line"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            type="number"
            :max="productsTotalCount"
            min="5"
            @update:model-value="
              paginationOptions.itemsPerPage = parseInt($event, 10)
            "
            :model-value="paginationOptions.itemsPerPage"
            label="items per page"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </template>

    <VDataTableServer
      class="text-no-wrap"
      :items="products"
      :items-length="products?.length ?? 0"
      :loading="pending || loading"
      item-key="id"
      :headers="productHeaders"
      :items-per-page="itemsPerPage"
    >
      <template #item.id="{ item }">
        <v-menu :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">ri-more-2-fill</v-icon>
          </template>

          <v-list>
            <v-list-item @click="navigateTo(`/admin/products/${item.id}/edit`)"
              ><v-icon>ri-edit-2-fill</v-icon> edit
            </v-list-item>

            <v-list-item @click="deleteModuleAction(item.id)"
              ><v-icon>ri-delete-bin-2-line</v-icon> delete
            </v-list-item>
          </v-list>
        </v-menu>

        <v-icon>ri-hashtag</v-icon> <strong>{{ item.id }}</strong>
      </template>

      <template #item.image="{ item }">
        <v-img
          lazy-src="http://127.0.0.1:8000/images/noImage.jpg"
          cover
          width="40"
          :aspect-ratio="1"
          :src="`http://127.0.0.1:8000${item.image}` ?? no_img"
        />
      </template>

      <template #item.category_products="{ item }">
        <div class="text-no-wrap">
          <v-chip
            class="mr-4"
            v-for="c in item.category_products"
            :key="c.id"
            >{{ c.category.name }}</v-chip
          >
        </div>
      </template>

      <template #item.created_at="{ item }">
        {{ $dayjs(item.created_at).format('YYYY/MM/DD') }}
      </template>

      <template #item.updated_at="{ item }">
        {{ $dayjs(item.updated_at).format('YYYY/MM/DD') }}
      </template>

      <template #item.is_quantity="{ item }">
        <v-chip
          class="mr-4"
          :color="
            item.is_quantity && item.quantity <= 0
              ? 'error'
              : !item.is_quantity
              ? 'success'
              : undefined
          "
          >{{
            !item.is_quantity
              ? 'always available'
              : item.quantity <= 0
              ? 'not available'
              : 'available with: ' + item.quantity
          }}</v-chip
        >
      </template>

      <template #item.is_offer="{ item }">
        <v-chip class="mr-4" :color="item.is_offer ? 'error' : undefined">{{
          item.is_offer ? item.offer + '% OFF' : 'No offer'
        }}</v-chip>
      </template>

      <template v-slot:bottom>
        <div class="text-center ma-2">
          <v-pagination
            v-model="paginationOptions.page"
            :length="pageCount"
            :total-visible="4"
          ></v-pagination>
        </div>
      </template>
    </VDataTableServer>
  </v-card>
</template>
