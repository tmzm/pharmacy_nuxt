<template>
  <v-app-bar
    elevation="0"
    class="d-flex nav-container align-center px-4 bg-secondary"
    height="80"
  >
    <template v-slot:prepend>
      <v-img
        @click="navigateTo('/')"
        class="cursor-pointer"
        :src="logo"
        width="140"
      ></v-img>
    </template>

    <div
      class="d-none d-md-flex items-center"
      :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
    >
      <!-- <v-btn
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
      </v-btn> -->

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
          :label="$t('search-products') + ' ...'"
          v-model="navSearch"
          hide-details
          single-line
      /></v-form>

      <v-btn icon class="me-2" @click="navigateTo('/shopping-cart')">
        <v-badge :content="cart?.length ?? 0">
          <v-icon color="white" size="24" icon="ri-shopping-cart-fill" />
        </v-badge>
      </v-btn>

      <IconBtn
        @click="navigateTo('/notifications')"
        v-if="token"
        size="x-large"
        color="white"
        class="me-2"
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
      </IconBtn>

      <LangSwitcher class="me-2" />
    </div>

    <div
      :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
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

    <div :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'" class="d-block d-md-none">
      <VAppBarNavIcon @click="$emit('drawer')" />
    </div>
  </v-app-bar>

  <MiniNavbar />
</template>

<script setup lang="ts">
import logo from '@images/logos/logoMoafa.webp'
const cart: any = useCookie('cart')
const token: any = useCookie('token')

const notificationStore = useNotificationStore()
const productStore = useProductStore()
const { search } = storeToRefs(productStore)

const navSearch = ref('')
</script>

<style>
@media (min-width: 1280px) {
  .nav-container .v-toolbar__content {
    max-inline-size: 1200px !important;
  }
}

@media (min-width: 960px) {
  .nav-container .v-toolbar__content {
    max-inline-size: 900px;
  }
}

.nav-container .v-toolbar__content {
  inline-size: 100%;
  margin-inline: auto;
}
</style>
