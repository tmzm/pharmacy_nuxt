<template>
  <v-card>
    <v-card-text>
      <v-timeline direction="horizontal" class="my-4">
        <v-timeline-item
          :dot-color="
            currentOrder?.status == 'preparing' ? 'primary' : undefined
          "
        >
          <div>
            <div class="text-h6">{{ $t('preparing') }}</div>
            <p v-if="currentOrder?.status == 'preparing'">
              {{ $t('now-preparing') }}
            </p>
          </div>
        </v-timeline-item>

        <v-timeline-item
          :dot-color="
            currentOrder?.status == 'shipping' ? 'primary' : undefined
          "
        >
          <div>
            <div class="text-h6">{{ $t('shipping') }}</div>
            <p v-if="currentOrder?.status == 'shipping'">
              {{ $t('now-shipping') }}
            </p>
          </div>
        </v-timeline-item>
      </v-timeline>

      <div v-if="currentOrder.is_prescription" class="mb-4">
        <v-icon class="me-1">ri-medicine-bottle-line</v-icon>
        <strong>{{ $t('prescription') }}: </strong>
        {{ $t('order-on-your-p') }}
      </div>

      <div class="mb-4">
        <v-icon class="me-1">ri-time-line</v-icon>
        <strong>{{ $t('delivery-at') }}:</strong>
        {{
          currentOrder.is_time
            ? $dayjs(currentOrder.time).format('YYYY/MM/DD hh:mm')
            : $t('as-ready')
        }}
      </div>

      <div>
        <v-icon class="me-1">ri-price-tag-3-line</v-icon>
        <strong>{{ $t('order-total') }}</strong>
        {{ currentOrder?.total_price }}
      </div>

      <LocationCard :location="currentOrder.location" class="my-8" />

      <v-row>
        <v-col v-for="order_item in currentOrder?.order_items" cols="auto">
          <v-img
            @click="navigateTo(`/products/${order_item.product.slug}`)"
            :src="
              order_item.product.image
                ? `http://127.0.0.1:8000${order_item.product.image}`
                : no_img
            "
            width="100"
            class="rounded-lg cursor-pointer"
            ><div class="text-body-2 pa-1 ma-1 bg-primary w-fit rounded-full">
              X {{ order_item.quantity }}
            </div></v-img
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import no_img from '@/assets/images/no-img.jpeg'
import type { Order } from '@/types'

defineProps<{
  currentOrder: Order
}>()
</script>

<!-- <style>

</style> -->
