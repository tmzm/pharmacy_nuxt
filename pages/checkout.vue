<template>
  <v-row>
    <v-col md="6" cols="12">
      <LocationCard
        class="mb-4"
        :location="(locationStore.selectedLocation as any)"
        v-if="locationStore.selectedLocation"
      />

      <v-card title="Delivery Options">
        <v-card-text>
          <v-row>
            <v-col v-for="(c, index) in cart" cols="auto">
              <v-img
                :src="
                  images[index]
                    ? `http://127.0.0.1:8000${images[index]}`
                    : no_img
                "
                width="100"
                class="rounded-lg"
                ><div
                  class="text-body-2 pa-1 ma-1 bg-primary w-fit rounded-full"
                >
                  X {{ c.quantity }}
                </div></v-img
              >
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <div class="d-flex items-center">
            <v-switch
              inset
              :label="
                !order.is_time ? 'Once the order is ready' : 'Custom Time'
              "
              v-model="order.is_time"
            ></v-switch>
            <ClientOnly>
              <a-time-picker
                v-if="order.is_time"
                class="ms-4"
                v-model:value="order.time"
                format="HH:mm a"
              />
            </ClientOnly>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col md="6" cols="12">
      <v-card>
        <v-card-subtitle class="mt-4">HAVE A COUPON?</v-card-subtitle>
        <v-card-text class="d-flex items-center">
          <v-text-field placeholder="Enter Coupon code"></v-text-field>
          <v-btn>Apply</v-btn>
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-subtitle class="mt-4">DELIVERY INSTRUCTION</v-card-subtitle>
        <v-card-text class="d-flex items-center">
          <v-text-field
            placeholder="Add a note"
            prepend-icon="ri-sticky-note-add-line"
          />
        </v-card-text>
      </v-card>

      <ReturnPolicy />

      <OrderSummary :place-order-disabled="isNoLocation" />
    </v-col>
  </v-row>

  <CreateLocationModal @create="refresh()" :model-value="isNoLocation" />

  <SelectLocationModal :model-value="isLocationNotSelected" />

  <v-dialog persistent width="auto" :model-value="isAnyOrderPreparing">
    <v-card
      width="350"
      prepend-icon="ri-error-warning-line"
      title="Preparing Orders"
    >
      <v-card-text
        >Theres an order still preparing or shipping. Please receive it to place
        a new order</v-card-text
      >
      <v-card-actions>
        <v-btn @click="ordersRefresh" :loading="pending"> refresh </v-btn>
        <v-btn @click="navigateTo('/my-account')" variant="outlined">
          Go to orders
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import no_img from '@images/no-img.jpeg'
const cart: any = useCookie('cart')
const productStore = useProductStore()
const orderStore = useOrderStore()
const locationStore = useLocationStore()

// const center = ref([5, 5] as any)

// onMounted(() => {
//   navigator.geolocation.getCurrentPosition(position => {
//     console.log('test', position.coords.latitude, position.coords.longitude)

//     center.value = [position.coords.latitude, position.coords.longitude]
//   })
// })

// const zoom = ref(14)

const { refresh } = await useAsyncData(() => locationStore.getAllLocations())
const { pending, refresh: ordersRefresh } = await useAsyncData(() =>
  orderStore.getAllOrders()
)

const isAnyOrderPreparing = computed(() => {
  const po = orders.value?.filter(
    e => e.status == 'preparing' || e.status == 'shipping'
  ).length
  return (po ?? 0) > 0
  // return false
})

const { locations, selectedLocation } = storeToRefs(locationStore)
const { order, orders } = storeToRefs(orderStore)

const isLocationNotSelected = computed(() => {
  return !selectedLocation.value && !isNoLocation
})

const isNoLocation = computed(() => {
  return !locations || locations.value?.length == 0
})

const images = ref<any>([])

cart.value.forEach(async (c: any) => {
  images.value.push(await productStore.getImage(c.id))
})

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkout'
})
</script>

<!-- <style>

</style> -->
