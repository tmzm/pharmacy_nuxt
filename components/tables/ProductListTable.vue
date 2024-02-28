<script setup lang="ts">
const productStore = useProductStore()

const searchStore = useSearchStore()

const { filteredProducts } = storeToRefs(searchStore)

const { pending, refresh } = useAsyncData(() => productStore.getAllProducts())

const { loading } = storeToRefs(productStore)

const search = ref()

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
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="ri-search-line"
        hide-details
      ></v-text-field>
    </template>

    <VDataTable
      :search="search"
      :items="filteredProducts"
      :loading="pending"
      item-key="id"
      class="text-no-wrap"
      :headers="productHeaders"
    >
      <template #item.id="{ item }">
        <v-btn
          variant="outlined"
          icon
          size="small"
          class="me-2"
          @click="navigateTo(`/products/${item.id}/edit`)"
        >
          <v-icon>ri-pencil-line</v-icon>
        </v-btn>
        <v-btn icon size="small" @click="deleteModuleAction(item.id)">
          <v-icon>ri-delete-bin-2-line</v-icon>
        </v-btn>
      </template>

      <template #item.category_products="{ item }">
        <v-chip class="mr-4" v-for="c in item.category_products" :key="c.id">{{
          c.category.name
        }}</v-chip>
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
    </VDataTable>
  </v-card>
</template>
