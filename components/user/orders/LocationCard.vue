<template>
  <v-card :border="cardBorder" elevation="0">
    <v-card-text>
      <v-list-item prepend-icon="ri-user-location-line"
        >DELIVER TO
        <template #append>
          <v-btn
            v-if="changeBtn"
            density="compact"
            elevation="0"
            rounded="x-large"
            >change</v-btn
          >
        </template>
      </v-list-item>

      <v-list-item>Name: {{ location.name }}</v-list-item>

      <v-list-item>Address: {{ location.address }}</v-list-item>

      <v-list-item>Phone: {{ authStore.user?.phone_number }}</v-list-item>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { Location } from '@/types'

const authStore = useMyAuthStore()

defineProps<{
  cardBorder?: boolean
  changeBtn?: boolean
  location: Location
}>()
</script>
