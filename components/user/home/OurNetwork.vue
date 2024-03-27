<template>
  <v-card class="my-8" border>
    <v-card-subtitle class="text-primary text-h4 mt-6"
      >OUR NETWORK</v-card-subtitle
    >
    <v-card-title class="text-secondary text-h2 my-4"
      >Leading Pharmacy Chain In The GCC</v-card-title
    >
    <v-card-text
      >Moafa Pharmacy, a division of Moafa DM Healthcare is backed by more than
      two decades of experience in pharmaceutical retailing. Recognised today as
      the region’s leading pharmacy retail chain, Moafa Pharmacy focuses on
      “delivering good health & happiness” through friendly neighbourhood
      pharmacies that are customer-centric & easily accessible.</v-card-text
    >
  </v-card>

  <v-row>
    <v-col v-for="item in items" cols="12" md="4">
      <v-card variant="outlined" color="secondary">
        <div
          class="d-block d-md-flex items-center text-center justify-space-between"
        >
          <v-card-text>
            <v-icon size="50">{{ item.icon }}</v-icon>
            <div class="mt-4 text-h3 text-secondary font-weight-bold">
              {{ item.number }}
            </div>
            <v-card-title class="text-secondary text-h4">
              {{ item.title }}
            </v-card-title>
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const items = [
  {
    number: 643,
    title: 'Customers',
    icon: 'ri-customer-service-2-line'
  },
  { number: 643, title: 'Prescriptions', icon: 'ri-medicine-bottle-line' },
  {
    number: 643,
    title: 'Medical analysis',
    icon: 'ri-test-tube-line'
  }
]
</script>

<!-- <style>

</style> -->
