<template>
  <v-card class="mb-4" v-for="n in notificationStore.notifications">
    <v-list-item
      prepend-icon="ri-information-fill"
      :title="n.title"
      :subtitle="n.body"
    >
      {{ $dayjs(n.created_at).format('YYYY/MM/DD hh:mm') }}
    </v-list-item>
  </v-card>
</template>

<script lang="ts" setup>
const notificationStore = useNotificationStore()

useAsyncData(() => notificationStore.readNotifications())

definePageMeta({
  layout: 'user-layout'
})
</script>

<!-- <style>

</style> -->
