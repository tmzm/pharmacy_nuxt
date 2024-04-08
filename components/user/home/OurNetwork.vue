<template>
  <BaseHeadingCard
    :item="{
      keyword: $t('our-network'),
      title: $t('our-network-title'),
      text: $t('our-network-text')
    }"
  >
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
                {{ $t(item.title) }}
              </v-card-title>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </BaseHeadingCard>
</template>

<script lang="ts" setup>
const items = [
  {
    number: 643,
    title: 'customers',
    icon: 'ri-customer-service-2-line'
  },
  { number: 643, title: 'prescriptions', icon: 'ri-medicine-bottle-line' },
  {
    number: 643,
    title: 'medical-analysis',
    icon: 'ri-test-tube-line'
  }
]
</script>

<!-- <style>

</style> -->
