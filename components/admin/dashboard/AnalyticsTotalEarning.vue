<script setup lang="ts">
import aviato from '@/assets/images/logos/aviato.png'
import bitbank from '@/assets/images/logos/bitbank.png'
import zipcar from '@/assets/images/logos/zipcar.png'

const earnings = [
  {
    avatar: zipcar,
    title: 'Zipcar',
    subtitle: 'Vuejs, React & HTML',
    amount: '$24,895.65',
    progress: 'primary'
  },
  {
    avatar: bitbank,
    title: 'Bitbank',
    subtitle: 'Sketch, Figma & XD',
    amount: '$8,6500.20',
    progress: 'info'
  },
  {
    avatar: aviato,
    title: 'Aviato',
    subtitle: 'HTML & Anguler',
    amount: '$1,2450.80',
    progress: 'secondary'
  }
]
</script>

<template>
  <v-card>
    <v-card-item>
      <v-card-title>Total Earning</v-card-title>

      <template #append>
        <div class="me-n3">
          <MoreBtn />
        </div>
      </template>
    </v-card-item>

    <v-card-text>
      <div class="d-flex align-center">
        <h3 class="text-h3">$24,895</h3>

        <v-icon size="24" icon="ri-arrow-up-s-line" color="success" />
        <div class="text-success">10%</div>
      </div>
      <div class="text-body-1 mb-12">Compared to $84,325 last year</div>

      <v-list class="card-list">
        <v-list-item v-for="earning in earnings" :key="earning.title">
          <template #prepend>
            <VAvatar rounded :image="earning.avatar" variant="tonal" />
          </template>

          <v-list-item-title class="font-weight-medium">
            {{ earning.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-body-1">
            {{ earning.subtitle }}
          </v-list-item-subtitle>

          <template #append>
            <div>
              <h6 class="text-h6 mb-2">
                {{ earning.amount }}
              </h6>
              <VProgressLinear
                :color="earning.progress"
                model-value="80"
                rounded-bar
                rounded
              />
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
