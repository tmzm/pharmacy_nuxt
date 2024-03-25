<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-row v-if="cart && cart.length > 0">
        <v-col v-for="c in cart" md="4" cols="12">
          <ProductCard cart-product :id="c.id" />
        </v-col>
      </v-row>

      <v-banner v-else icon="ri-information-2-line" lines="one" class="mt-4">
        <v-banner-text class="text-error">
          you didn't add any product to the cart yet ...
          <nuxt-link to="/products">go to shopping</nuxt-link>
        </v-banner-text>
      </v-banner>
    </v-col>

    <v-col cols="12" md="6">
      <ReturnPolicy />

      <OrderSummary no-place-order />

      <v-btn
        variant="outlined"
        color="black"
        class="mt-4"
        append-icon="ri-shopping-cart-2-line"
        @click="navigateTo('/products')"
        >continue shopping</v-btn
      >

      <v-btn
        class="mt-4 ms-4"
        append-icon="ri-arrow-right-s-line"
        @click="navigateTo('/checkout')"
        >Proceed to checkout</v-btn
      >
    </v-col>
  </v-row>

  <TopSellers />
</template>

<script lang="ts" setup>
const cart: any = useCookie('cart')

definePageMeta({
  layout: 'user-layout'
})
</script>
