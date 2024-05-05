<template>
  <v-dialog v-model="dialogSelectLocation" width="800" opacity="1" persistent>
    <v-window v-model="select">
      <v-window-item value="0">
        <v-card class="pa-4">
          <v-card-title>{{ $t('select-location') }}:</v-card-title>

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
            <v-btn @click="select = 1">{{ $t('add-new-address') }}</v-btn>
            <v-btn
              v-if="closeBtn"
              @click="dialogSelectLocation = false"
              variant="outlined"
            >
              {{ $t('cancel') }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item value="1">
        <v-card>
          <v-card-text>
            <v-card-title>{{ $t('personal-details') }}</v-card-title>

            <v-card-text>
              <v-text-field v-model="name" :label="$t('name') + ' *'">
              </v-text-field>
            </v-card-text>

            <v-card-title>{{ $t('address-details') }}</v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-select
                    prepend-inner-icon="ri-home-3-line"
                    return-object
                    v-model="type"
                    :items="['Home', 'Work', 'Other']"
                  >
                    <template #selection="{ item }">
                      {{ $t(item.title) }}
                    </template>
                    <template #item="{ item, props }">
                      <v-list-item v-bind="props">
                        <template #title>{{ $t(item.title) }}</template>
                      </v-list-item>
                    </template>
                  </v-select>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="street"
                    :label="$t('street-address') + ' *'"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="flat"
                    :label="$t('flat-villa') + ' *'"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="building"
                    :label="$t('building') + ' *'"
                  />
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
              >{{ $t('save-address') }}</v-btn
            >
            <v-btn @click="select = 0" variant="outlined">
              {{ $t('cancel') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-dialog>
</template>

<script lang="ts" setup>
const locationStore = useLocationStore()

const { refresh } = await useAsyncData(() => locationStore.getAllLocations())

const { dialogSelectLocation, loading, type, flat, street, building, name } =
  storeToRefs(locationStore)

defineProps<{
  closeBtn?: boolean
}>()

const select = ref(0)
</script>

<!-- <style>

</style> -->
