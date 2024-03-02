<script setup lang="ts">
import no_img from '@images/no-img.jpeg'

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
        <v-menu :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">ri-more-2-fill</v-icon>
          </template>

          <v-list>
            <v-list-item @click="navigateTo(`/products/${item.id}/edit`)"
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
