<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card :border="true" width="230" class="ma-4" v-bind="props">
      <v-img
        :border="true"
        class="ma-2 rounded pa-3"
        height="170"
        :src="`http://127.0.0.1:8000${product.image}` ?? no_img"
        cover
      >
        <!-- <div class="absolute">
          <v-icon color="primary">ri-star-fill</v-icon> 4.5
        </div> -->
        <div class="text-right" v-if="product.is_offer">
          <span class="pa-2 bg-error rounded-full text-body-2"
            >{{ product.offer }}% OFF</span
          >
        </div>
      </v-img>
      <v-card-title
        >{{
          Math.ceil(
            product.price -
              product.price * (product.is_offer ? product.offer / 100 : 0)
          )
        }}
        SP
        <span
          v-if="
            product.is_offer && !(product.is_quantity && product.quantity == 0)
          "
          class="text-decoration-line-through text-body-1"
        >
          {{ product.price }} SP
        </span>
        <strong v-if="product.is_quantity && product.quantity == 0"
          >out of stock</strong
        >
      </v-card-title>
      <v-card-subtitle>
        <v-chip
          class="me-1"
          size="x-small"
          v-for="c in product.category_products"
          >{{ c.category.name }}</v-chip
        >
      </v-card-subtitle>

      <v-card-text>
        <div v-html="product.scientific_name" />
      </v-card-text>

      <v-overlay
        v-if="!cartProduct"
        :model-value="isHovering"
        class="align-center justify-center"
        contained
      >
        <v-btn
          :disabled="
            cart?.find((p:any) => p.id == product.id) || (product.is_quantity && product.quantity == 0)
          "
          :loading="loading"
          prepend-icon="ri-shopping-cart-fill"
          variant="text"
          color="white"
          @click="addProductToCart"
        >
          Add to cart
        </v-btn>
        <v-btn icon="ri-heart-fill" variant="text" color="white"> </v-btn>
        <v-btn
          icon="ri-eye-line"
          variant="text"
          color="white"
          @click="navigateTo(`/products/${product.slug}`)"
        ></v-btn>
      </v-overlay>

      <v-card-actions v-if="cartProduct" class="text-center">
        <v-btn
          icon
          color="black"
          @click="
            cart.splice(
              cart.findIndex((e: any) => e.id == product.id),
              1
            )
          "
          ><v-icon>ri-delete-bin-5-line</v-icon></v-btn
        >
        <v-btn
          icon
          color="black"
          @click="
              () => {
                if(cart.find((c: any) => (c.id == product.id)).quantity > 1)
                cart.find((c: any) => (c.id == product.id)).quantity--
              }
            "
          ><v-icon>ri-indeterminate-circle-line</v-icon></v-btn
        >
        {{ cart.find((c: any) => c.id == product.id).quantity }}
        <v-btn
          icon
          color="black"
          @click="
            () => {
                if(cart.find((c: any) => (c.id == product.id)).quantity < product.quantity)
                cart.find((c: any) => (c.id == product.id)).quantity++
              }
            "
          ><v-icon>ri-add-circle-line</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts" setup>
import type { Product } from '@/types'
import no_img from '@images/no-img.jpeg'
const cart: any = useCookie('cart')
const productStore = useProductStore()

const loading = ref(false)

const props = defineProps<{
  cartProduct?: boolean
  productValue?: Product
  id?: number
}>()

const product = ref(
  !props.id
    ? props.productValue
    : await productStore.getProductById(props.id as any)
)

const addProductToCart = () => {
  console.log(cart)
  if (!cart.value) {
    cart.value = []
  }
  cart.value.push({
    id: props.id ?? props.productValue?.id,
    quantity: 1
  })
}
</script>
