<template>
  <v-row class="mb-8">
    <v-col cols="12" md="6">
      <Carousel :src="banner" class="md:h-130" />
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="bg-secondary">
        <v-card-text>
          <div class="font-black mb-2 text-4xl text-white mt-4">
            {{ $t('new-app-soon') }}
          </div>
          <p class="text-2xl text-white">{{ $t('shop-order-enjoy') }}</p>
        </v-card-text>
        <v-img cover height="255" :src="appBanner"> </v-img>
      </v-card>
    </v-col>
  </v-row>
  <v-divider class="my-8" />

  <OurNetwork />
  <v-divider class="my-8" />
  <Futures />
  <v-divider class="my-8" />
  <OurCategories home />
  <v-divider class="my-8" />
  <TopSellers home />
</template>

<script lang="ts" setup>
import appBanner from '@/assets/images/pages/app-banner.webp'
import banner from '@/assets/images/pages/ph-baner.jpg'

definePageMeta({
  layout: 'user-layout'
})
</script>

<!-- <style>

</style> -->
