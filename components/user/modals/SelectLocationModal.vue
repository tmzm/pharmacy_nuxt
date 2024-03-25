<template>
  <v-dialog opacity="1" persistent>
    <v-card class="pa-4">
      <v-card-title>Select Location:</v-card-title>

      <v-card-text>
        <v-radio-group v-model="locationStore.selectedLocation">
          <v-radio :value="l" v-for="l in locationStore.locations">
            <template #label>
              <LocationCard :location="l" />
            </template>
          </v-radio>
        </v-radio-group>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="$emit('newLocation')">Add new Address</v-btn>
        <v-btn v-if="closeBtn" @click="$emit('close')" variant="outlined">
          close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const locationStore = useLocationStore()

defineProps<{
  closeBtn?: boolean
}>()
</script>

<!-- <style>

</style> -->
