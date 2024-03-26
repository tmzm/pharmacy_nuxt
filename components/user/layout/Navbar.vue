<template>
  <v-app-bar
    elevation="0"
    class="d-flex align-center px-4 bg-secondary"
    height="90"
  >
    <template v-slot:prepend>
      <v-img :src="logo" width="140"></v-img>
    </template>

    <div class="d-none d-md-flex">
      <v-btn size="x-large" color="white" class="me-2">
        <span class="d-none d-md-block">Favorites</span>
        <template #append>
          <v-badge :content="0">
            <v-icon size="22" icon="ri-heart-line" />
          </v-badge>
        </template>
      </v-btn>

      <v-btn
        size="x-large"
        color="white"
        @click="navigateTo('/shopping-cart')"
        class="me-2"
      >
        <span class="d-none d-md-block">cart</span>
        <template #append>
          <v-badge :content="cart?.length ?? 0">
            <v-icon size="22" icon="ri-shopping-cart-line" />
          </v-badge>
        </template>
      </v-btn>

      <v-btn size="x-large" color="white" class="me-2">
        <span class="d-none d-md-block">Notifications</span>
        <template #append>
          <v-badge :content="0">
            <v-icon size="22" icon="ri-notification-line" />
          </v-badge>
        </template>
      </v-btn>

      <!-- <NavbarThemeSwitcher class="me-2" /> -->

      <v-btn
        size="x-large"
        @click="
          () => {
            if (token) {
              navigateTo('/my-account')
            } else {
              navigateTo('/auth/login')
            }
          }
        "
        color="white"
        class="me-2"
      >
        <span class="d-none d-md-block">
          {{ token ? 'My Account' : 'Login' }}
        </span>
        <template #append>
          <v-icon size="22" icon="ri-user-6-line" />
        </template>
      </v-btn>
    </div>

    <div class="d-block d-md-none">
      <IconBtn size="x-large" color="white" class="me-2">
        <v-badge :content="0">
          <v-icon size="22" icon="ri-notification-line" />
        </v-badge>
      </IconBtn>

      <!-- <NavbarThemeSwitcher class="me-2" /> -->

      <IconBtn
        size="x-large"
        @click="
          () => {
            if (token) {
              navigateTo('/my-account')
            } else {
              navigateTo('/auth/login')
            }
          }
        "
        color="white"
        class="me-2"
      >
        <v-icon size="22" icon="ri-user-6-line" />
      </IconBtn>
    </div>
  </v-app-bar>

  <MiniNavbar />
</template>

<script setup lang="ts">
import logo from '@images/logos/logoMoafa.webp'
const cart: any = useCookie('cart')
const token: any = useCookie('token')

const search = ref()
</script>
