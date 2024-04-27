<template>
  <v-bottom-navigation elevation="10" class="d-flex d-md-none">
    <v-btn
      :active="$route.path == '/notifications'"
      @click="navigateTo('/notifications')"
      v-if="token"
    >
      <v-badge
        v-if="
          notificationStore.notifications.filter(n => !n.is_read).length > 0
        "
        :content="
          notificationStore.notifications.filter(n => !n.is_read).length
        "
      >
        <v-icon size="22" icon="ri-notification-line" />
      </v-badge>
      <v-icon v-else size="22" icon="ri-notification-line" />
    </v-btn>

    <v-btn
      :active="$route.path == '/favorites'"
      v-if="token"
      @click="
        () => {
          if (token) {
            navigateTo('/my-account')
          } else {
            navigateTo('/auth/login')
          }
        }
      "
      class="d-flex"
    >
      <v-badge :content="favoriteStore.favorites.length ?? 0">
        <v-icon size="24" icon="ri-heart-line" />
      </v-badge>
    </v-btn>

    <v-btn
      :active="$route.path == '/shopping-cart'"
      @click="navigateTo('/shopping-cart')"
      class="d-flex"
    >
      <v-badge :content="cart?.length ?? 0">
        <v-icon size="24" icon="ri-shopping-cart-line" />
      </v-badge>
    </v-btn>

    <v-btn
      :active="$route.path == '/my-account'"
      @click="
        () => {
          if (token) {
            navigateTo('/my-account')
          } else {
            navigateTo('/auth/login')
          }
        }
      "
      class="d-flex"
    >
      <v-icon size="24" icon="ri-user-line" />
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
const token = useCookie('token')
const cart = useCookie('cart')
const favoriteStore = useFavoriteStore()
const notificationStore = useNotificationStore()
</script>

<!-- <style>

</style> -->
