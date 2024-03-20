<script lang="ts" setup>
import type { Prescription, Product } from '@/types'

const orderStore = useOrderStore()
const productStore = useProductStore()
const { productIds, loading, fields, productsImages } = storeToRefs(orderStore)

// const products : Product[] = computed(()=>{
//   return productIds.value.forEach((element:any) => {
//     return productStore.getProduct(element.id)
//   });
// })

defineProps<{
  prescription: Prescription
}>()

const navigationTab = ref('Prescription')
const tabItems = ['Prescription', 'Create Order']

const decrease = () => {
  if (fields.value > 1) fields.value--
  productIds.value.splice(fields.value, 1)
  productsImages.value.splice(fields.value, 1)
}

const increase = () => {
  fields.value++
  productIds.value.push({})
  productsImages.value.push({} as Product)
}

const getProduct = async (i: number) => {
  productsImages.value[i - 1] = await productStore.getProduct(
    productIds.value[i - 1].id as number
  )
}
</script>

<template>
  <v-card>
    <VTabs v-model="navigationTab" align-tabs="center">
      <VTab v-for="item in tabItems" :key="item" :value="item">
        {{ item }}
      </VTab>
    </VTabs>

    <!-- tabs content -->
    <VWindow v-model="navigationTab">
      <VWindowItem value="Prescription">
        <v-img :src="`http://127.0.0.1:8000${prescription.image}`">
          <v-btn icon class="ma-4"><v-icon>ri-delete-bin-2-line</v-icon></v-btn>
        </v-img>

        <v-card-item
          :prepend-avatar="prescription.user.avatar"
          :title="prescription.user.name"
        />

        <v-card-text>
          {{ prescription.description }}
        </v-card-text>
      </VWindowItem>

      <VWindowItem value="Create Order">
        <v-form
          class="ma-4"
          @submit.prevent="
            orderStore.create(prescription.user.id, prescription.id)
          "
        >
          <div class="d-flex ga-4" v-for="i in fields">
            <v-img
              v-if="productsImages[i - 1]"
              lazy-src="http://127.0.0.1:8000/images/noImage.jpg"
              cover
              width="50"
              height="50"
              :aspect-ratio="1"
              :src="`http://127.0.0.1:8000${productsImages[i - 1].image}`"
            />
            <v-text-field
              type="number"
              class="mb-4"
              label="Product ID"
              prepend-inner-icon=""
              v-model="productIds[i - 1].id"
              required
              @update:model-value="getProduct(i)"
              :rules="[v => !!v || 'product id is required']"
            >
              <template #prepend-inner>
                <v-icon> ri-hashtag </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              type="number"
              class="mb-4"
              label="quantity"
              v-model="productIds[i - 1].quantity"
              required
              :rules="[v => !!v || 'quantity is required']"
            />
          </div>
          <div class="d-flex ga-4">
            <v-btn @click="increase()" icon><v-icon>ri-add-line</v-icon></v-btn>
            <v-btn @click="decrease()" icon
              ><v-icon>ri-subtract-line</v-icon></v-btn
            >
            <v-btn type="submit" variant="outlined" :loading="loading"
              >Create Order</v-btn
            >
          </div>
        </v-form>
      </VWindowItem>
    </VWindow>
  </v-card>
</template>
