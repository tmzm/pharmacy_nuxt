<template>
  <v-app-bar
    border
    scroll-behavior="hide"
    scroll-threshold="150"
    elevation="0"
    height="40"
  >
    <v-menu open-on-hover open-on-click>
      <template v-slot:activator="{ props, isActive }">
        <v-btn
          color="black"
          :prepend-icon="!isActive ? 'ri-menu-2-line' : 'ri-close-line'"
          append-icon="ri-arrow-down-s-line"
          v-bind="props"
        >
          shop by category
        </v-btn>
      </template>

      <v-list>
        <div v-if="pending">
          loading... <v-progress-circular indeterminate />
        </div>
        <v-list-item
          v-else
          v-for="(c, index) in categoryStore.categories"
          :title="c.name"
          append-icon="ri-arrow-right-s-line"
          @click="filterProductsByCategory(index)"
        />
      </v-list>
    </v-menu>

    <v-btn color="black" prepend-icon="ri-price-tag-3-line"> OFFERS </v-btn>

    <v-btn color="black" class="me-2 d-none d-md-flex">
      <span>Favorites</span>
      <template #prepend>
        <v-icon icon="ri-heart-line" />
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
        {{ token ? 'My Account' : 'Login' }}
      </span>
      <template #prepend>
        <v-icon icon="ri-user-6-line" />
      </template>
    </v-btn>
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

const locationStore = useLocationStore()
const token = useCookie('token')

const newLocationDialog = ref(false)

const { selectedLocation } = storeToRefs(locationStore)

const { selectedCategories } = storeToRefs(categoryStore)

const { pending } = useAsyncData(() => categoryStore.getAllCategories())

const filterProductsByCategory = (index: number) => {
  selectedCategories.value = [index]
  navigateTo(`/products`)
}
</script>

<!-- <style>

</style> -->
