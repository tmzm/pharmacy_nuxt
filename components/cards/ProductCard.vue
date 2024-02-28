<template>
  <v-col cols="12" md="4" sm="6">
    <v-card>
      <v-img :src="`http://127.0.0.1:8000${product.image}`" />

      <v-card-item>
        <v-card-title>{{ product.scientific_name }}</v-card-title>
      </v-card-item>

      <v-card-text>
        Commercial Name: {{ product.commercial_name }}
      </v-card-text>

      <v-cardActions>
        <v-btn @click="isCardDetailsVisible = !isCardDetailsVisible">
          Details
        </v-btn>

        <VSpacer />

        <v-btn
          icon
          size="small"
          @click="isCardDetailsVisible = !isCardDetailsVisible"
        >
          <v-icon
            :icon="
              isCardDetailsVisible
                ? 'ri-arrow-up-s-line'
                : 'ri-arrow-down-s-line'
            "
          />
        </v-btn>
      </v-cardActions>

      <VExpandTransition>
        <div v-show="isCardDetailsVisible">
          <VDivider />
          <v-card-text v-html="product.description" />
          <v-card-text>
            <strong>Company Name:</strong> {{ product.company_name }}
          </v-card-text>
          <v-card-text>
            <strong>Price:</strong> {{ product.price }} SP</v-card-text
          >
        </div>
      </VExpandTransition>
    </v-card>
  </v-col>
</template>

<script lang="ts" setup>
import type { Product } from '@/types'

const isCardDetailsVisible = ref(false)

defineProps<{
  product: Product
}>()
</script>
