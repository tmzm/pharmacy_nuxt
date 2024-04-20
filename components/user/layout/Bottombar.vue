<template>
  <v-bottom-navigation v-model="value" elevation="10" class="d-flex d-md-none">
    <v-btn
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

    <v-btn @click="navigateTo('/shopping-cart')" class="d-flex">
      <v-badge :content="cart?.length ?? 0">
        <v-icon size="24" icon="ri-shopping-cart-line" />
      </v-badge>
    </v-btn>

    <v-btn
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
      <v-icon size="24" icon="ri-user-6-line" />
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
const token = useCookie('token')
const cart = useCookie('cart')
const favoriteStore = useFavoriteStore()

const value = ref(1)
</script>

<!-- <style>

</style> -->
