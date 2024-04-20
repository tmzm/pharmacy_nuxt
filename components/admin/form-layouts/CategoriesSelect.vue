<template>
  <!-- Container for the skeleton loader and category chips -->
  <v-container>
    <!-- Skeleton loader to simulate loading -->
    <v-skeleton-loader
      width="100"
      :loading="pendingCategory"
      type="chip@7"
      class="d-flex flex-wrap ga-3"
    >
      <!-- Item group for displaying category chips -->
      <v-item-group
        v-model="selectedCategories"
        multiple
        class="d-flex flex-wrap ga-3"
      >
        <!-- Caption for the category chips -->
        <div class="text-caption mb-2">Categories:</div>

        <!-- Looping through categories to display chips -->
        <v-item
          v-for="category in categories"
          :key="category.id"
          v-slot="{ isSelected, toggle }"
        >
          <!-- Chip representing a category -->
          <v-chip @click="toggle" :color="isSelected ? 'secondary' : ''">
            {{ category.name }}
          </v-chip>
        </v-item>
      </v-item-group>
    </v-skeleton-loader>
  </v-container>
</template>

<script lang="ts" setup>
// Importing category store and necessary utilities
const categoryStore = useCategoryStore()
const { categories, selectedCategories } = storeToRefs(categoryStore)

// Fetching categories data asynchronously
const { pending: pendingCategory } = await useAsyncData(() =>
  categoryStore.getAllCategories()
)
</script>
