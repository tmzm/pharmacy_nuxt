<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card>
        <v-img
          height="400"
          :src="`http://127.0.0.1:8000${product.image}` ?? no_img"
        >
          <!-- <div class="absolute">
          <v-icon color="primary">ri-star-fill</v-icon> 4.5
        </div> -->
          <div class="text-right" v-if="product.is_offer">
            <span class="pa-2 ma-4 bg-error rounded-full text-body-2"
              >{{ product.offer }}% OFF</span
            >
          </div>
        </v-img>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>
          {{ product.commercial_name }}
          <div class="text-body-1">
            {{ product.scientific_name }}
          </div>
        </v-card-title>
        <v-card-text>
          <div>
            <v-chip class="me-2" v-for="c in product.category_products">{{
              c.category.name
            }}</v-chip>
          </div>
          <div class="my-4">
            company:
            <span class="text-primary">{{ product.company_name }}</span>
          </div>
          <v-card elevation="2">
            <v-card-text>
              <span class="text-h3">{{
                Math.ceil(
                  product.price -
                    product.price * (product.is_offer ? product.offer / 100 : 0)
                )
              }}</span>
              SP
              <span
                v-if="
                  product.is_offer &&
                  !(product.is_quantity && product.quantity == 0)
                "
                class="text-decoration-line-through text-body-1"
              >
                {{ product.price }} SP
              </span>
            </v-card-text>
            <div class="d-flex items-center p-4 bg-grey-100">
              <v-btn icon class="mx-4" variant="outlined" color="black"
                ><v-icon>ri-indeterminate-circle-line</v-icon></v-btn
              >
              0
              <v-btn icon class="mx-4" elevation="0"
                ><v-icon>ri-add-circle-line</v-icon></v-btn
              >
              <v-btn
                class="mx-2"
                elevation="0"
                prepend-icon="ri-shopping-cart-fill"
              >
                add to cart
              </v-btn>
            </div>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-card class="mt-8" title="Details">
    <v-card-text>
      <div class="mb-2" v-html="product.description ?? 'no description'"></div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import no_img from '@images/no-img.jpeg'

const productStore = useProductStore()
const route = useRoute()

const { product } = storeToRefs(productStore)

const slug = computed(() => {
  return (route.params as any).slug
})

if (slug.value as any) {
  useAsyncData(() => productStore.getProduct(slug.value))
}

definePageMeta({
  layout: 'user-layout'
})
</script>
