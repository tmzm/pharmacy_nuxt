<script lang="ts" setup>
import type { Product } from '@/types'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const route = useRoute()
const id = computed(() => {
  return (route.params as { id: number }).id
})

const { categories, selectedCategories } = storeToRefs(categoryStore)
const { product, loading, imageFileInput, quantityShow } =
  storeToRefs(productStore)

if (!id.value) {
  product.value = {} as Product
}

if (id.value) {
  selectedCategories.value = []
  product.value.category_products.forEach(categoryProduct => {
    selectedCategories.value.push(
      categories.value.findIndex(c => c.id == categoryProduct.category.id)
    )
  })
}

const url = ref()

const onImgChange = (e: any) => {
  const file = e.target.files[0]
  url.value = URL.createObjectURL(file)
}

const onSubmit = () => {
  if (id.value) {
    productStore.edit()
  } else {
    productStore.create()
  }
}
</script>

<template>
  <v-card
    :title="id ? `Edit Product: ${product.scientific_name}` : 'Create Product'"
  >
    <v-container>
      <VForm>
        <v-row>
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
            <v-col cols="12" class="mb-md-12 mb-16">
              <QuillEditor v-model:content="product.description" />
            </v-col>
          </ClientOnly>

          <v-col cols="6">
            <v-file-input
              @change="onImgChange"
              accept="images/*"
              density="compact"
              v-model="imageFileInput"
              label="image (optional)"
              placeholder="some description"
            ></v-file-input>
            <NuxtImg v-if="url" :src="url" width="400"></NuxtImg>
          </v-col>

          <v-col cols="12" class="d-flex gap-4">
            <v-btn @click="onSubmit" :loading="loading">
              {{ id ? 'Edit Product' : 'Create Product' }}
            </v-btn>

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
    </v-container>
  </v-card>
</template>
