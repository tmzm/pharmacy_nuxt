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
            <div class="text-h6">Preparing</div>
            <p v-if="currentOrder?.status == 'preparing'">
              Now your order is being prepared.
            </p>
          </div>
        </v-timeline-item>

        <v-timeline-item
          :dot-color="
            currentOrder?.status == 'shipping' ? 'primary' : undefined
          "
        >
          <div>
            <div class="text-h6">Shipping</div>
            <p v-if="currentOrder?.status == 'shipping'">
              Now your order will reach you as soon as possible.
            </p>
          </div>
        </v-timeline-item>
      </v-timeline>

      <div v-if="currentOrder.is_prescription" class="mb-4">
        <v-icon class="me-1">ri-medicine-bottle-line</v-icon>
        <strong>Prescription: </strong>
        this order is on your prescription
      </div>

      <div class="mb-4">
        <v-icon class="me-1">ri-time-line</v-icon>
        <strong>Delivery AT:</strong>
        {{
          currentOrder.is_time
            ? $dayjs(currentOrder.time).format('YYYY/MM/DD hh:mm')
            : 'as soon as its ready'
        }}
      </div>

      <div>
        <v-icon class="me-1">ri-price-tag-3-line</v-icon>
        <strong>ORDER TOTAL PRICE:</strong>
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
import type { Order } from '@/types'
import no_img from '@images/no-img.jpeg'

defineProps<{
  currentOrder: Order
}>()
</script>

<!-- <style>

</style> -->
