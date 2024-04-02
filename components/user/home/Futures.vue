<template>
  <BaseHeadingCard
    :item="{
      keyword: $t('our-services'),
      title: $t('our-services-title'),
      text: $t('our-services-text')
    }"
  />

  <v-row>
    <v-col v-for="item in items" cols="6" md="3">
      <v-card :color="item.bg" border @click="() => {}">
        <div
          class="d-block d-md-flex items-center text-center justify-space-between"
        >
          <v-card-text>
            <v-icon size="50">{{ item.icon }}</v-icon>
            <v-card-title class="text-white">
              {{ $t(item.title) }}
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
    title: 'upload-prescription',
    bg: 'primary',
    icon: 'ri-medicine-bottle-line'
  },
  { title: 'best-deals', bg: 'secondary', icon: 'ri-price-tag-2-line' },
  {
    title: 'fast-delivery',
    bg: 'success',
    icon: 'ri-fire-line'
  },
  { title: 'hermon-wellness', bg: 'info', icon: 'ri-medicine-bottle-line' }
]
</script>

<!-- <style>

</style> -->
