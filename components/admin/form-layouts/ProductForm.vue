<script lang="ts" setup>
import type { Product } from '@/types'

// Importing necessary stores and utilities
const productStore = useProductStore()
const categoryStore = useCategoryStore()

// Getting the route and extracting the id from the route parameters
const route = useRoute()
const id = computed(() => {
  return (route.params as { id: number }).id
})

// Retrieving reactive references to category and product data
const { categories, selectedCategories } = storeToRefs(categoryStore)
const { product, loading, imageFileInput, quantityShow } =
  storeToRefs(productStore)

// Initializing product data if no ID is present
if (!id.value) {
  product.value = {} as Product
}

// Fetching product data if an ID is present
if (id.value) {
  // Populating selected categories array based on product data
  selectedCategories.value = []
  product.value.category_products.forEach(categoryProduct => {
    selectedCategories.value.push(
      categories.value.findIndex(c => c.id == categoryProduct.category.id)
    )
  })

  // Fetching image data (commented out for now)
  // try {
  //   const response = await fetch(product.value.image)
  //   const blob = await response.blob()

  //   const file = new File(
  //     [blob],
  //     product.value.image.substring(product.value.image.lastIndexOf('/') + 1),
  //     { type: blob.type }
  //   )

  //   imageFileInput.value = file
  // } catch (error) {
  //   imageFileInput.value = []
  // }
}

// Reference to the drop zone for image uploads
const imageDropZoneRef = ref<HTMLElement>()

// Function to handle image drop event
function onImageDrop(files: File[] | null) {
  imageFileInput.value = []
  if (files) {
    imageFileInput.value = files[0]
  }
}

// Configuring drop zone for image uploads
const { isOverDropZone } = useDropZone(imageDropZoneRef, {
  dataTypes: ['image/png'],
  onDrop: onImageDrop
})

// Function to handle form submission
const onSubmit = () => {
  if (id.value) {
    productStore.edit()
  } else {
    productStore.create()
  }
}
</script>

<template>
  <!-- Product form -->
  <v-card
    :title="id ? `Edit Product: ${product.scientific_name}` : 'Create Product'"
  >
    <v-card-text>
      <!-- Form inputs for product details -->
      <VForm>
        <v-row>
          <!-- Inputs for product details -->

          <!-- Scientific Name -->
          <v-col cols="12" md="6">
            <VTextField
              v-model="product.scientific_name"
              label="Scientific Name"
              placeholder="modad eltehab"
            />
          </v-col>

          <!-- Commercial Name -->
          <v-col cols="12" md="6">
            <VTextField
              v-model="product.commercial_name"
              label="Commercial Name"
              placeholder="Panadol"
            />
          </v-col>

          <!-- Company Name -->
          <v-col cols="12" md="6">
            <VTextField
              v-model="product.company_name"
              label="Company Name"
              placeholder="Al Fares"
            />
          </v-col>

          <!-- price -->
          <v-col cols="12" md="6">
            <VTextField
              type="number"
              v-model="product.price"
              label="Price"
              placeholder="25,000"
            >
              <template v-slot:append> SP </template>
            </VTextField>
          </v-col>

          <!-- quantity -->
          <v-col cols="6">
            <QuantityShowSelect />
          </v-col>

          <v-col cols="6">
            <VTextField
              v-if="quantityShow == 2"
              type="number"
              v-model="product.quantity"
              label="Quantity"
              placeholder="25,000"
            >
            </VTextField>
          </v-col>

          <!-- expiration -->
          <DatePickerModal />

          <!-- Categories -->
          <CategoriesSelect />

          <!-- description -->
          <ClientOnly>
            <v-col cols="12" class="mb-24">
              <div class="mb-4">Description</div>
              <QuillEditor v-model:content="product.description" />
            </v-col>
          </ClientOnly>

          <v-col cols="12" md="6">
            <VTextField label="Meta Title"> </VTextField>
          </v-col>

          <v-col cols="12" md="6">
            <VTextField label="Meta subtitle"> </VTextField>
          </v-col>

          <ClientOnly>
            <v-col cols="12" class="mb-24">
              <div class="mb-4">Meta Description</div>
              <QuillEditor />
            </v-col>
          </ClientOnly>

          <v-col cols="12" class="d-flex gap-4">
            <!-- Button to submit form -->
            <v-btn @click="onSubmit" :loading="loading">
              {{ id ? 'Edit Product' : 'Create Product' }}
            </v-btn>

            <!-- Button to reset form -->
            <v-btn
              type="reset"
              color="secondary"
              variant="outlined"
              @click="loading = false"
            >
              Reset
            </v-btn>
          </v-col>
        </v-row>
      </VForm>
    </v-card-text>
  </v-card>

  <!-- Image upload drop zone -->
  <v-card
    @click=""
    title="upload Image (optional)"
    ref="imageDropZoneRef"
    class="mt-8 pa-16 text-center border-dashed rounded-2xl"
  >
    <!-- Drop zone instructions -->
    <strong>Drop image:</strong>
    {{
      !imageFileInput
        ? !isOverDropZone
          ? 'drag and drop images (allowed: images and png)'
          : 'drop'
        : `image: ${imageFileInput.name}, size: ${imageFileInput.size}`
    }}
  </v-card>
</template>
