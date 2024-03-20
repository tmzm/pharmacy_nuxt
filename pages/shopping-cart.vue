<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-row v-if="cart && cart.length > 0">
        <v-col v-for="c in cart" :key="c.product.id" md="4" cols="12">
          <ProductCard cart-product :product="c.product" />
        </v-col>
      </v-row>

      <v-banner v-else icon="ri-information-2-line" lines="one">
        <v-banner-text class="text-error">
          you didn't add any product to the cart yet ...
          <nuxt-link to="/products">go to shopping</nuxt-link>
        </v-banner-text>
      </v-banner>
    </v-col>

    <v-col cols="12" md="6">
      <v-banner icon="ri-alert-line" lines="two">
        <v-banner-text>
          <div><strong>Return Policy:</strong></div>
          Orders once placed can't be returned or exchanged
          <nuxt-link to="/">Learn More</nuxt-link>
        </v-banner-text>
      </v-banner>

      <v-card title="ORDER SUMMARY" class="mt-4" elevation="0">
        <v-list>
          <v-list-item>
            Order Total <template #append>0 SP</template></v-list-item
          >
          <v-list-item>
            Items Discount <template #append>0 SP</template></v-list-item
          >
          <v-list-item>
            Estimated VAT % <template #append>0 SP</template></v-list-item
          >
          <v-list-item>
            Total Amount (Inclusive of VAT)
            <template #append>0 SP</template></v-list-item
          >
        </v-list>
      </v-card>

      <v-btn
        variant="outlined"
        color="black"
        class="mt-4"
        append-icon="ri-shopping-cart-2-line"
        >continue shopping</v-btn
      >

      <v-btn class="mt-4 ms-4" append-icon="ri-arrow-right-s-line"
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
