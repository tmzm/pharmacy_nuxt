<template>
  <v-app-bar
    class="align-center text-white px-4 bg-primary-darken-1 text-caption"
    height="30"
  >
    <div class="d-none d-md-flex">New moafa App Soon</div>
    <v-spacer class="d-none d-md-flex" />
    <div>
      Deliver To: {{ selectedLocation?.address ?? 'not selected yet' }}
      <v-btn color="white" prepend-icon="ri-map-line" @click="dialog = true"
        >change</v-btn
      >
    </div>
  </v-app-bar>

  <SelectLocationModal
    v-model="dialog"
    close-btn
    @close="dialog = false"
    @new-location="newLocationDialog = true"
  />

  <CreateLocationModal
    v-model="newLocationDialog"
    close-btn
    @close="newLocationDialog = false"
    @create="refresh()"
  />
</template>

<script lang="ts" setup>
import SelectLocationModal from '../modals/SelectLocationModal.vue'

const dialog = ref(false)
const newLocationDialog = ref(false)

const locationStore = useLocationStore()
const { selectedLocation } = storeToRefs(locationStore)

const { refresh } = useAsyncData(() => locationStore.getAllLocations())
</script>
