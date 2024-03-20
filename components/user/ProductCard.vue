<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card width="230" class="ma-4" v-bind="props" elevation="0">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        class="ma-2 rounded text-right pa-3"
        height="170"
        :src="product.image ?? no_img"
        cover
      >
        <v-icon color="primary">ri-star-fill</v-icon> 4.5
      </v-img>

      <v-card-title>{{ product.price }} SP </v-card-title>
      <v-card-subtitle>
        <strong v-if="!product.is_quantity">out of stock</strong>
      </v-card-subtitle>

      <v-card-text>
        {{ product.description }}
      </v-card-text>

      <v-overlay
        v-if="!cartProduct"
        :model-value="isHovering"
        class="align-center justify-center"
        contained
      >
        <v-btn
          :disabled="
            cart?.find((p:any) => p.product.id == product.id) || !product.is_quantity
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
      </v-overlay>

      <v-card-actions v-if="cartProduct" class="text-center">
        <v-btn icon color="black"><v-icon>ri-delete-bin-5-line</v-icon></v-btn>
        <v-btn
          icon
          color="black"
          @click="
              () => {
                if(cart.find((c: any) => (c.product = product)).quantity > 1)
                cart.find((c: any) => (c.product = product)).quantity--
              }
            "
          ><v-icon>ri-indeterminate-circle-line</v-icon></v-btn
        >
        {{ cart.find((c: any) => (c.product = product)).quantity }}
        <v-btn
          icon
          color="black"
          @click="
            () => {
                if(cart.find((c: any) => (c.product = product)).quantity < product.quantity)
                cart.find((c: any) => (c.product = product)).quantity++
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

const loading = ref(false)

const addProductToCart = () => {
  loading.value = true
  if (!Array.isArray(cart)) {
    cart.value = []
  }
  cart.value.push({
    product: props.product,
    quantity: 1
  })
  loading.value = false
}

const props = defineProps<{
  cartProduct?: boolean
  product: Product
}>()
</script>
