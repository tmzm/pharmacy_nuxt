<template>
  <v-row>
    <v-col md="6" cols="12">
      <LocationCard
        class="mb-4"
        :location="(locationStore.selectedLocation as any)"
        v-if="locationStore.selectedLocation"
      />

      <v-card>
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
            <v-checkbox v-model="order.is_time">
              <template #label>
                <span :class="{ 'text-gray': !order.is_time }">
                  {{ $t('custom-d-time') }}
                </span>
              </template>
            </v-checkbox>
            <ClientOnly>
              <a-time-picker
                :disabled="!order.is_time"
                class="ms-4"
                v-model:value="order.time"
                format="HH:mm a"
                :placeholder="$t('select-time')"
              />
            </ClientOnly>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col md="6" cols="12">
      <v-card>
        <v-card-subtitle class="mt-4">{{
          $t('have-a-coupon')
        }}</v-card-subtitle>
        <v-card-text class="d-flex items-center">
          <v-text-field :placeholder="$t('enter-coupon')"></v-text-field>
          <v-btn class="ms-4">{{ $t('apply') }}</v-btn>
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-subtitle class="mt-4">{{
          $t('delivery-instruction')
        }}</v-card-subtitle>
        <v-card-text class="d-flex items-center">
          <v-text-field
            :placeholder="$t('add-note')"
            prepend-icon="ri-sticky-note-add-line"
          />
        </v-card-text>
      </v-card>

      <ReturnPolicy class="mt-4" />

      <OrderSummary :place-order-disabled="isNoLocation" />
    </v-col>
  </v-row>

  <CreateLocationModal @create="refresh()" :model-value="isNoLocation" />

  <SelectLocationModal :model-value="isLocationNotSelected" />

  <v-dialog persistent width="auto" :model-value="isAnyOrderPreparing">
    <v-card
      width="350"
      prepend-icon="ri-error-warning-line"
      :title="$t('preparing-order')"
    >
      <v-card-text>{{ $t('preparing-order-text') }}</v-card-text>
      <v-card-actions>
        <v-btn @click="ordersRefresh" :loading="pending">
          {{ $t('refresh') }}
        </v-btn>
        <v-btn @click="navigateTo('/my-account')" variant="outlined">
          {{ $t('go-my-account') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import no_img from '@/assets/images/no-img.jpeg'
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
