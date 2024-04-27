<template>
  <v-app-bar
    :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
    border
    scroll-behavior="hide"
    scroll-threshold="150"
    elevation="0"
    height="40"
    class="px-2"
  >
    <v-row :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
      <v-col cols="10" class="d-flex">
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
          class="d-none text-truncate d-md-inline-flex"
          color="black"
          prepend-icon="ri-map-pin-2-line"
          @click="dialog = true"
          >{{ selectedLocation?.address ?? 'select location' }}</v-btn
        >
      </v-col>

      <v-col cols="2" class="">
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
            {{ token ? 'My Account' : 'Login' }}
          </span>
          <template #prepend>
            <v-icon icon="ri-user-line" />
          </template>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>

  <SelectLocationModal
    v-if="token"
    v-model="dialog"
    close-btn
    @close="dialog = false"
    @new-location="newLocationDialog = true"
  />
</template>

<script lang="ts" setup>
const categoryStore = useCategoryStore()
const dialog = ref(false)
const cart = useCookie('cart')
const favoriteStore = useFavoriteStore()

const locationStore = useLocationStore()
const token = useCookie('token')

const newLocationDialog = ref(false)

const { selectedLocation } = storeToRefs(locationStore)

const { selectedCategories } = storeToRefs(categoryStore)

const { pending } = await useAsyncData(() => categoryStore.getAllCategories())

const filterProductsByCategory = (index: number) => {
  selectedCategories.value = [index]
  navigateTo(`/products`)
}
</script>

<!-- <style>

</style> -->
