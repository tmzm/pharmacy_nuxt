<template>
  <v-dialog width="800" opacity="1" persistent>
    <v-window v-model="select">
      <v-window-item value="0">
        <v-card class="pa-4">
          <v-card-title>Select Location:</v-card-title>

          <v-card-text>
            <v-radio-group v-model="locationStore.selectedLocation">
              <v-radio
                class="my-4"
                :value="l"
                v-for="l in locationStore.locations"
              >
                <template #label>
                  <LocationCard :location="l" />
                </template>
              </v-radio>
            </v-radio-group>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="select = 1">Add new Address</v-btn>
            <v-btn v-if="closeBtn" @click="$emit('close')" variant="outlined">
              close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item value="1">
        <v-card>
          <v-card-text>
            <v-card-title>PERSONAL DETAILS</v-card-title>

            <v-card-text>
              <v-text-field v-model="name" label="Full Name *"> </v-text-field>
            </v-card-text>

            <v-card-title>ADDRESS DETAILS</v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-select
                    prepend-inner-icon="ri-home-3-line"
                    return-object
                    v-model="type"
                    :items="['Home', 'Work', 'Other']"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="street" label="Street Address *" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="flat" label="Flat/Villa *" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="building" label="Building *" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :loading="loading"
              @click="
                () => {
                  locationStore.create()
                  refresh()
                }
              "
              >Save Address</v-btn
            >
            <v-btn @click="select = 0" variant="outlined"> cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-dialog>
</template>

<script lang="ts" setup>
const locationStore = useLocationStore()

const { refresh } = useAsyncData(() => locationStore.getAllLocations())

const { location, loading, type, flat, street, building, name } =
  storeToRefs(locationStore)

defineProps<{
  closeBtn?: boolean
}>()

const select = ref(0)
</script>

<!-- <style>

</style> -->
