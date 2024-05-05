<template>
  <v-card :title="$t('order-sum')" class="mt-4">
    <v-list>
      <v-list-item>
        {{ $t('order-total') }}
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
        {{ $t('items-discount') }}
        <template #append>0 {{ $t('sp') }}</template></v-list-item
      >
      <v-list-item>
        {{ $t('total-amount') }}
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
      ><v-btn
        :disabled="placeOrderDisabled"
        @click="orderStore.createByCart()"
        >{{ $t('place-order') }}</v-btn
      ><v-chip color="secondary" prepend-icon="ri-wallet-line">
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

const productPrices = computedAsync(
  async () => {
    let prices = []
    for (const e of cart.value) {
      prices.push({
        price: await productStore.getPrice(e.id),
        id: e.id
      })
    }
    return prices
  },
  [],
  loading
)

const orderTotalPrice = computedAsync(
  async () => {
    if (cart.value && cart.value.length !== 0) {
      let t = 0
      for (const e of cart.value) {
        t += Math.ceil(
          productPrices.value.find(p => p.id == e.id)?.price * e.quantity
        )
      }
      loading.value = false
      return t
    } else {
      return 0
    }
  },
  0,
  loading
)
</script>

<!-- <style>

</style> -->
