<template>
  <v-container>
    <v-skeleton-loader
      width="100"
      :loading="pendingCategory"
      type="chip@7"
      class="d-flex flex-wrap ga-3"
    >
      <v-item-group
        v-model="selectedCategories"
        multiple
        class="d-flex flex-wrap ga-3"
      >
        <div class="text-caption mb-2">Categories:</div>
        <v-item
          v-for="category in categories"
          :key="category.id"
          v-slot="{ isSelected, toggle }"
        >
          <v-chip @click="toggle" :color="isSelected ? 'secondary' : ''">
            {{ category.name }}
          </v-chip>
        </v-item>
      </v-item-group>
    </v-skeleton-loader>
  </v-container>
</template>

<script lang="ts" setup>
const categoryStore = useCategoryStore()

const { categories, selectedCategories } = storeToRefs(categoryStore)

const { pending: pendingCategory } = useAsyncData(() =>
  categoryStore.getAllCategories()
)
</script>
