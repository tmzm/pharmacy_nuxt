<template>
  <v-card elevation="0" variant="outlined" rounded="x-large">
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

      <div>
        <strong>ORDER TOTAL PRICE:</strong>
        {{ currentOrder?.total_price }}
      </div>

      <LocationCard :location="currentOrder.location" />

      <v-row>
        <v-col v-for="order_item in currentOrder?.order_items" cols="auto">
          <v-img
            :src="
              order_item.product.image
                ? `http://127.0.0.1:8000${order_item.product.image}`
                : no_img
            "
            width="100"
            class="rounded-lg"
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
