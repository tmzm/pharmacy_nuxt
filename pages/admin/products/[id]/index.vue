<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card>
        <v-img
          height="400"
          :src="
            product.image ? `http://127.0.0.1:8000${product.image}` : no_img
          "
        >
          <div class="absolute mt-3 ms-2" v-if="product.is_offer">
            <span
              class="pa-2 bg-error text-body-2 rounded-l-1 relative offer-tag"
            >
              {{ product.offer + '% ' + $t('off') }}
              <div class="dot"></div>
            </span>
          </div>
        </v-img>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>
          {{ product.commercial_name }}
          <v-menu :close-on-content-click="false" location="end">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props">ri-more-2-fill</v-icon>
            </template>

            <v-list>
              <v-list-item
                @click="navigateTo(`/admin/products/${product.id}/edit`)"
                ><v-icon>ri-edit-2-fill</v-icon> edit
              </v-list-item>

              <v-list-item @click="deleteModuleAction(product.id)"
                ><v-icon>ri-delete-bin-2-line</v-icon> delete
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="text-body-1">
            {{ product.scientific_name }}
          </div>
        </v-card-title>
        <v-card-text>
          <div>
            <v-chip
              variant="outlined"
              color="secondary"
              class="me-2"
              v-for="c in product.category_products"
              >{{ c.category.name }}</v-chip
            >
          </div>
          <div class="my-4">
            <strong>
              {{
                Math.ceil(
                  product.price -
                    product.price * (product.is_offer ? product.offer / 100 : 0)
                )
              }}
              SP</strong
            >
            <span
              v-if="product.is_offer"
              class="text-decoration-line-through text-body-1 ms-2"
            >
              {{ product.price }} {{ $t('sp') }}
            </span>
          </div>

          <div class="my-4">
            company:
            <span class="text-primary">{{ product.company_name }}</span>
          </div>

          <div class="my-4">
            <div v-if="!product.is_quantity">
              <span class="text-success"
                ><v-icon>{{ 'ri-check-line' }}</v-icon> IN STOCK</span
              >
            </div>
            <div v-else-if="product.is_quantity && product.quantity > 0">
              <span class="text-info"
                ><v-icon>{{ 'ri-information-line' }}</v-icon> IN STOCK with
                {{ product.quantity }}</span
              >
            </div>
            <div v-else>
              <span class="text-error"
                ><v-icon>{{ 'ri-error-warning-line' }}</v-icon> OUT OFF
                STOCK</span
              >
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-card v-if="product.description" class="mt-8" title="Details">
    <v-card-text>
      <div class="mb-2 desc" v-html="product.description"></div>
    </v-card-text>
  </v-card>

  <delete-modal
    v-model="dialogDelete"
    :loading="loading"
    @close="dialogDelete = false"
    @delete="deleteProduct()"
  />
</template>

<script lang="ts" setup>
import no_img from '@images/no-img.jpeg'

const productStore = useProductStore()
const route = useRoute()

const { product, loading } = storeToRefs(productStore)

const id = computed(() => {
  return (route.params as any).id
})

if (id.value as any) {
  await useAsyncData(() => productStore.getProductById(id.value))
}

useSeoMeta({
  title: product.value.meta_title,
  ogTitle: product.value.meta_title,
  description: product.value.meta_description,
  ogDescription: product.value.meta_description
})

useHead({
  titleTemplate: { textContent: product.value.meta_title }
})

const dialogDelete = ref(false)
const deleteId = ref()

const deleteModuleAction = (id: number) => {
  dialogDelete.value = true
  deleteId.value = id
}

const deleteProduct = () => {
  dialogDelete.value = false
  try {
    productStore.deleteProduct(deleteId.value)
    navigateTo('/admin/products/list')
  } catch (e) {}
}
</script>
