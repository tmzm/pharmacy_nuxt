<template>
  <v-card :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'" :border="cardBorder">
    <v-card-text>
      <v-list-item prepend-icon="ri-user-location-line"
        >{{ $t('deliver-to') }}
        <template #append>
          <v-btn v-if="changeBtn" density="compact" rounded="x-large">{{
            $t('change')
          }}</v-btn>
        </template>
      </v-list-item>

      <v-list-item>{{ $t('name') }}: {{ location.name }}</v-list-item>

      <v-list-item>{{ $t('address') }}: {{ location.address }}</v-list-item>

      <v-list-item
        >{{ $t('phone') }}: {{ authStore.user?.phone_number }}</v-list-item
      >
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { Location } from '@/types'

const authStore = useAuthStore()

defineProps<{
  cardBorder?: boolean
  changeBtn?: boolean
  location: Location
}>()
</script>
