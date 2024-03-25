<template>
  <v-card title="ORDER SUMMARY" class="mt-4" elevation="0">
    <v-list>
      <v-list-item>
        Order Total
        <template #append
          ><span v-if="!loading">{{ orderTotalPrice }} SP</span>
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
          ><span v-if="!loading">{{ orderTotalPrice }} SP</span>
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
        <span v-if="!loading">{{ orderTotalPrice }} SP</span>
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

const orderTotalPrice = computed(() => {
  if (cart.value && cart.value.length != 0) {
    let t = 0
    cart.value.forEach((e: any) => {
      let { data, pending } = useAsyncData(() => productStore.getPrice(e.id))
      loading.value = pending.value
      t += Math.ceil(data.value) * e.quantity
    })
    return t
  } else {
    return 0
  }
})
</script>

<!-- <style>

</style> -->
