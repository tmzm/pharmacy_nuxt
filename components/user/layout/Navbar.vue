<template>
  <v-app-bar
    elevation="0"
    class="d-flex align-center px-4 bg-secondary"
    height="80"
  >
    <template v-slot:prepend>
      <v-img :src="logo" width="140"></v-img>
    </template>

    <div class="d-none d-md-flex items-center">
      <v-btn
        :active="$route.path == '/'"
        size="large"
        color="white"
        class="me-1"
        @click="navigateTo('/')"
      >
        Home
      </v-btn>

      <v-btn
        :active="$route.path == '/about-as'"
        size="large"
        color="white"
        class="me-1"
        @click="navigateTo('/')"
      >
        About Us
      </v-btn>

      <v-btn
        :active="$route.path == '/contact'"
        size="large"
        color="white"
        class="me-1"
        @click="navigateTo('/')"
      >
        Contact us
      </v-btn>

      <v-form
        @submit.prevent="
          () => {
            if (navSearch || navSearch != '') {
              search = navSearch
              navigateTo('/products')
            }
          }
        "
      >
        <v-text-field
          rounded
          prepend-inner-icon="ri-search-line"
          color="white"
          variant="solo"
          class="ms-2 me-4 w-110"
          bg-color="white"
          label="Search products..."
          v-model="navSearch"
          hide-details
          single-line
      /></v-form>

      <v-btn icon class="me-2" @click="navigateTo('/shopping-cart')">
        <v-badge :content="cart?.length ?? 0">
          <v-icon color="white" size="24" icon="ri-shopping-cart-fill" />
        </v-badge>
      </v-btn>

      <v-divider vertical color="white" class="mx-2" />
      <!-- <NavbarThemeSwitcher class="me-2" /> -->
    </div>

    <div
      @click="
        navigateTo('https://wa.me/999999999', { open: { target: '_blank' } })
      "
      class="ms-2 cursor-pointer"
    >
      <div class="flex flex-column text-start">
        <div class="text-white text-title">
          <div class="text-white text-body-2">For Home Delivery</div>
          <v-icon size="25" color="primary">ri-whatsapp-fill</v-icon
          ><v-icon size="25" color="primary">ri-phone-fill</v-icon>+963 999 999
          999
        </div>
      </div>
    </div>

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

const productStore = useProductStore()
const { search } = storeToRefs(productStore)

const navSearch = ref('')
</script>
