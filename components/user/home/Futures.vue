<template>
  <v-card class="my-8" border>
    <v-card-subtitle class="text-primary text-h4 mt-6"
      >OUR SERVICES</v-card-subtitle
    >
    <v-card-title class="text-secondary text-h2 my-4"
      >Offering Expertise & Accessibility</v-card-title
    >
    <v-card-text
      >From pharmacies to healthcare e-commerce, loyalty programmes, home
      delivery services & more supporting a seamless health journey, making
      millions of lives better.</v-card-text
    >
  </v-card>

  <v-row>
    <v-col v-for="item in items" cols="6" md="3">
      <v-card :color="item.bg" border @click="() => {}">
        <div
          class="d-block d-md-flex items-center text-center justify-space-between"
        >
          <v-card-text>
            <v-icon size="50">{{ item.icon }}</v-icon>
            <v-card-title class="text-white">
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
    title: 'Upload Prescription',
    bg: 'primary',
    icon: 'ri-medicine-bottle-line'
  },
  { title: 'Best Deals', bg: 'secondary', icon: 'ri-price-tag-2-line' },
  {
    title: 'Fast Delivery',
    bg: 'success',
    icon: 'ri-fire-line'
  },
  { title: 'Hermon Wellness', bg: 'info', icon: 'ri-medicine-bottle-line' }
]
</script>

<!-- <style>

</style> -->
