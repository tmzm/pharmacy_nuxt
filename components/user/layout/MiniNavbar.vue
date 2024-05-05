<template>
  <v-app-bar
    border
    order="0"
    scroll-behavior="hide"
    scroll-threshold="150"
    elevation="0"
    height="40"
    class="px-2"
  >
    <v-menu open-on-hover open-on-click>
      <template v-slot:activator="{ props, isActive }">
        <v-btn
          color="black"
          :prepend-icon="!isActive ? 'ri-menu-line' : 'ri-close-line'"
          append-icon="ri-arrow-down-s-line"
          v-bind="props"
        >
          {{ $t('shop-by-category') }}
        </v-btn>
      </template>

      <v-list :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
        <div v-if="pending">
          loading... <v-progress-circular indeterminate />
        </div>
        <v-list-item
          v-else
          v-for="(c, index) in categoryStore.categories"
          :title="c.name"
          :append-icon="
            $i18n.locale == 'ar'
              ? 'ri-arrow-left-s-line'
              : 'ri-arrow-right-s-line'
          "
          @click="filterProductsByCategory(index)"
        />
      </v-list>
    </v-menu>

    <v-btn
      @click="navigateTo('/favorites')"
      v-if="token"
      color="black"
      class="me-2 d-none d-md-flex"
    >
      <span>{{ $t('favorites') }}</span>
      <template #prepend>
        <v-icon icon="ri-heart-line" />
      </template>
      <template #append>
        <span class="text-white bg-primary-darken-1 w-5 h-5 rounded-full">{{
          favoriteStore.favorites.length ?? 0
        }}</span>
      </template>
    </v-btn>

    <!-- <NavbarThemeSwitcher class="me-2" /> -->

    <v-btn
      v-if="token"
      class="d-none text-truncate d-md-inline-flex"
      color="black"
      prepend-icon="ri-map-pin-2-line"
      @click="dialogSelectLocation = true"
      >{{ selectedLocation?.address ?? $t('select-location') }}</v-btn
    >

    <v-spacer />

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
      color="black"
      class="me-2 d-none d-md-flex"
    >
      <span>
        {{ $t(token ? 'my-account' : 'login') }}
      </span>
      <template #prepend>
        <v-icon icon="ri-user-line" />
      </template>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
const categoryStore = useCategoryStore()
const dialog = ref(false)
const favoriteStore = useFavoriteStore()

const locationStore = useLocationStore()
const token = useCookie('token')

const { selectedLocation, dialogSelectLocation } = storeToRefs(locationStore)

const { selectedCategories } = storeToRefs(categoryStore)

const { pending } = await useAsyncData(() => categoryStore.getAllCategories())

const filterProductsByCategory = (index: number) => {
  selectedCategories.value = [index]
  navigateTo(`/products`)
}
</script>

<!-- <style>

</style> -->
