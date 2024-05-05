<template>
  <v-navigation-drawer width="350" temporary class="py-8 px-4">
    <div class="mb-6">
      <v-btn @click="$emit('closeDrawer')" icon color="secondary" variant="text"
        ><v-icon>ri-close-line</v-icon></v-btn
      >
    </div>

    <div class="mb-4 flex items-center">
      <v-btn
        v-if="token"
        color="black"
        prepend-icon="ri-map-pin-2-line"
        @click="dialogSelectLocation = true"
        >{{ selectedLocation?.address ?? $t('select-location') }}</v-btn
      >

      <LangSwitcher />
    </div>

    <v-form
      class="mb-4"
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
        class="ms-2 me-4"
        bg-color="white"
        :label="$t('search-products') + ' ...'"
        v-model="navSearch"
        hide-details
        single-line
    /></v-form>

    <v-divider></v-divider>

    <!-- <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Home"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="About"
        value="about"
      ></v-list-item>
    </v-list> -->
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const locationStore = useLocationStore()
const { selectedLocation, dialogSelectLocation } = storeToRefs(locationStore)
const dialog = ref(false)

const token = useCookie('token')
const navSearch = ref('')
const productStore = useProductStore()
const { search } = storeToRefs(productStore)
</script>

<style></style>
