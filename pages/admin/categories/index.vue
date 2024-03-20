<script lang="ts" setup>
const categoryStore = useCategoryStore()

const {
  categories,
  selectedCategories,
  loading,
  name,
  dialogDelete,
  deleteId,
  dialogEdit,
  editId
} = storeToRefs(categoryStore)

const { pending: pendingCategory, refresh } = useAsyncData(() =>
  categoryStore.getAllCategories()
)

const filterProductsByCategory = (index: number) => {
  selectedCategories.value = [index]
  navigateTo(`/admin/products/list`)
}

const openDeleteModal = (id: number) => {
  deleteId.value = id
  dialogDelete.value = true
}

const openEditModal = (id: number) => {
  editId.value = id
  dialogEdit.value = true
}

const deleteCategory = () => {
  categoryStore.deleteCategory(deleteId.value)
  dialogDelete.value = false
  refresh()
}

const editCategory = () => {
  categoryStore.editCategory(editId.value)
  dialogEdit.value = false
  refresh()
}

const createCategory = () => {
  categoryStore.createCategory()
  refresh()
}
</script>

<template>
  <delete-modal
    v-model="dialogDelete"
    :loading="loading"
    @close="dialogDelete = false"
    @delete="deleteCategory()"
  />

  <edit-category-modal
    :name="categories.find(c => c.id == editId)?.name"
    v-model="dialogEdit"
    :loading="loading"
    @close="dialogEdit = false"
    @delete="editCategory()"
  />

  <v-card title="All Categories" class="mb-8">
    <v-container>
      <v-skeleton-loader
        width="100"
        :loading="pendingCategory"
        type="chip@7"
        class="d-flex flex-wrap ga-3"
      >
        <v-chip v-for="(category, index) in categories" :key="category.id">
          <template #prepend>
            <v-icon @click="openDeleteModal(category.id)"
              >ri-delete-bin-2-line</v-icon
            >
            <v-icon @click="openEditModal(category.id)">ri-pencil-line</v-icon>
          </template>
          <template #append>
            <v-icon @click="filterProductsByCategory(index)"
              >ri-arrow-drop-right-line</v-icon
            >
          </template>
          <strong>{{ category.name }}</strong>
        </v-chip>
      </v-skeleton-loader>
    </v-container>
  </v-card>

  <v-card title="Add Category">
    <v-container class="d-flex ga-4">
      <v-text-field label="name" placeholder="Urinary" v-model="name" />
      <v-btn :loading="loading" @click="createCategory">create</v-btn>
    </v-container>
  </v-card>
</template>
