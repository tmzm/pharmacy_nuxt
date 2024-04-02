<template>
  <v-card title="ORDER SUMMARY" class="mt-4">
    <v-list>
      <v-list-item>
        Order Total
        <template #append
          ><span v-if="!loading">{{ orderTotalPrice }} {{ $t('sp') }}</span>
          <v-progress-circular
            width="2"
            color="black"
            size="x-small"
            v-else
            indeterminate
          /> </template
      ></v-list-item>
      <v-list-item>
        Items Discount <template #append>0 SP</template></v-list-item
      >
      <v-list-item>
        Total Amount (Inclusive of VAT)
        <template #append
          ><span v-if="!loading">{{ orderTotalPrice }} {{ $t('sp') }}</span>
          <v-progress-circular
            width="2"
            color="black"
            size="x-small"
            v-else
            indeterminate /></template
      ></v-list-item>
    </v-list>
    <v-card-actions v-if="!noPlaceOrder"
      ><v-btn :disabled="placeOrderDisabled" @click="orderStore.createByCart()"
        >place order</v-btn
      ><v-chip color="secondary" prepend-icon="ri-wallet-line">
        TOTAL:
        <span v-if="!loading">{{ orderTotalPrice }} {{ $t('sp') }}</span>
        <v-progress-circular
          width="2"
          color="black"
          size="x-small"
          v-else
          indeterminate
        /> </v-chip
    ></v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  noPlaceOrder?: boolean
  placeOrderDisabled?: boolean
}>()

const orderStore = useOrderStore()
const cart: any = useCookie('cart')
const productStore = useProductStore()
const loading = ref(false)

const orderTotalPrice = ref()

const getTotalPrice = async () => {
  if (cart.value && cart.value.length !== 0) {
    let t = 0
    for (const e of cart.value) {
      t += Math.ceil(await productStore.getPrice(e.id)) * e.quantity
    }
    loading.value = false
    orderTotalPrice.value = t
  } else {
    orderTotalPrice.value = 0
  }
}

getTotalPrice()

watch(cart, () => {
  getTotalPrice()
})
</script>

<!-- <style>

</style> -->
