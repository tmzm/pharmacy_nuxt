<template>
  <v-app-bar class="d-flex align-center px-4" elevation="0">
    <v-app-bar-title> Moafa </v-app-bar-title>

    <!-- Search Trigger button -->
    <v-hover>
      <template v-slot:default="{ props, isHovering }">
        <v-card
          variant="flat"
          :width="isHovering || search ? 200 : 50"
          v-bind="props"
        >
          <v-text-field
            prepend-inner-icon="ri-search-2-line"
            variant="solo"
            v-model="search"
          />
        </v-card>
      </template>
    </v-hover>

    <div class="d-none d-md-flex">
      <IconBtn class="me-2">
        <v-badge :content="0">
          <v-icon icon="ri-heart-line" />
        </v-badge>
      </IconBtn>

      <IconBtn @click="navigateTo('/shopping-cart')" class="me-2">
        <v-badge :content="cart?.length ?? 0">
          <v-icon icon="ri-shopping-cart-line" />
        </v-badge>
      </IconBtn>
    </div>

    <IconBtn class="me-2">
      <v-icon icon="ri-notification-line" />
    </IconBtn>

    <!-- <NavbarThemeSwitcher class="me-2" /> -->

    <UserProfile />
  </v-app-bar>

  <SmallNavbar />
</template>

<script setup lang="ts">
const cart: any = useCookie('cart')

const search = ref()
</script>
