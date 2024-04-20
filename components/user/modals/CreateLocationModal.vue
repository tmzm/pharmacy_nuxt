<template>
  <v-dialog opacity="1" persistent>
    <v-card class="pa-4">
      <v-card-title>Enter Location:</v-card-title>
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
        <v-btn v-if="closeBtn" @click="$emit('close')" variant="outlined">
          close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const locationStore = useLocationStore()

const { refresh } = await useAsyncData(() => locationStore.getAllLocations())

const { location, loading, type, flat, street, building, name } =
  storeToRefs(locationStore)

defineProps<{
  closeBtn?: boolean
}>()
</script>

<!-- <style>

</style> -->
