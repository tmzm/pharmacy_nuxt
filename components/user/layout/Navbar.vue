<template>
  <v-app-bar
    elevation="0"
    class="d-flex align-center px-4 bg-secondary"
    height="90"
  >
    <template v-slot:prepend>
      <v-img :src="logo" width="140"></v-img>
    </template>

    <div class="d-none d-md-flex items-center">
      <v-btn size="large" color="white" class="me-1"> Home </v-btn>

      <v-btn size="large" color="white" class="me-1"> About Us </v-btn>

      <v-btn size="large" color="white" class="me-1"> Contact us </v-btn>

      <v-text-field
        rounded
        color="primary"
        class="ms-2 me-4 w-110"
        bg-color="white"
        label="Search products..."
        hide-details
        single-line
      >
        <template #append-inner>
          <v-btn class="ma-1" variant="elevated" rounded>
            <v-icon size="22">ri-search-line</v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <v-btn icon class="me-2" @click="navigateTo('/shopping-cart')">
        <v-badge :content="cart?.length ?? 0">
          <v-icon color="white" size="24" icon="ri-shopping-cart-fill" />
        </v-badge>
      </v-btn>

      <v-divider vertical color="white" class="mx-2" />
      <!-- <NavbarThemeSwitcher class="me-2" /> -->
    </div>

    <v-btn
      @click="
        navigateTo('https://wa.me/999999999', { open: { target: '_blank' } })
      "
      color="white"
    >
      <template #prepend
        ><v-icon size="24" color="primary">ri-whatsapp-line</v-icon></template
      >
      <div class="flex flex-column">
        <div class="text-white text-title">+963 999 999 999</div>
        <div class="text-white text-body-2">Contact whatsapp</div>
      </div>
    </v-btn>

    <div class="d-block d-md-none">
      <!-- <IconBtn size="x-large" color="white" class="me-2">
        <v-badge :content="0">
          <v-icon size="22" icon="ri-notification-line" />
        </v-badge>
      </IconBtn> -->

      <!-- <NavbarThemeSwitcher class="me-2" /> -->

      <VAppBarNavIcon @click="$emit('drawer')" />
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
