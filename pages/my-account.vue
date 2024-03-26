<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card>
        <v-tabs
          class="my-4"
          v-model="tab"
          color="secondary"
          direction="vertical"
        >
          <v-tab value="option-1">
            <v-icon start> ri-home-3-line </v-icon>
            Dashboard
          </v-tab>
          <v-tab value="option-2">
            <v-icon start> ri-box-3-line </v-icon>
            Orders
          </v-tab>
          <v-tab value="option-3">
            <v-icon start> ri-map-pin-line </v-icon>
            Addresses
          </v-tab>
          <v-tab value="option-4">
            <v-icon start> ri-admin-line </v-icon>
            Account Details
          </v-tab>
          <v-tab value="option-5">
            <v-icon start> ri-medicine-bottle-line </v-icon>
            Prescriptions
          </v-tab>
          <v-tab @click="logoutDialog = true">
            <v-icon start> ri-logout-box-r-line </v-icon>
            Logout
          </v-tab>
        </v-tabs>
      </v-card>
    </v-col>

    <v-col cols="12" md="8">
      <v-card>
        <v-window v-model="tab">
          <v-window-item value="option-1">
            <v-card flat>
              <v-card-text>
                Hello ! From your account dashboard you can view your
                <span
                  class="text-decoration-underline text-secondary cursor-pointer"
                  @click="tab = 'option-2'"
                >
                  recent orders </span
                >, manage your
                <span
                  class="text-decoration-underline text-secondary cursor-pointer"
                  @click="tab = 'option-3'"
                >
                  shipping and billing addresses</span
                >, and edit your
                <span
                  class="text-decoration-underline text-secondary cursor-pointer"
                  @click="tab = 'option-4'"
                  >account details</span
                >.
              </v-card-text>
            </v-card>

            <v-divider />

            <v-card flat title="Recent Purchases">
              <v-card-text> You don't have any product yet! </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="option-2">
            <v-card
              flat
              v-if="!orderStore.orders || orderStore.orders?.length == 0"
            >
              <v-card-text> No order has been made yet.</v-card-text>
              <v-card-actions
                v-if="!orderStore.orders || orderStore.orders?.length == 0"
              >
                <v-btn variant="outlined" append-icon="ri-arrow-right-line">
                  Go Shopping
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card v-else>
              <v-card-title> Current Order: </v-card-title>
              <v-card-text>
                <CurrentOrderCard
                  v-if="currentOrder"
                  :current-order="currentOrder"
                />

                <div v-else>
                  No current order right now...
                  <nuxt-link color="secondary" to="/products"
                    >go shopping</nuxt-link
                  >
                </div>
              </v-card-text>

              <v-divider class="my-4" />

              <v-card-title>Recent Orders:</v-card-title>

              <v-card-text>
                <div
                  v-if="
                    orderStore.orders.filter(e => e.status == 'delivered')
                      .length == 0
                  "
                >
                  No recent orders yet
                </div>
                <div v-else></div>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="option-3">
            <v-card title="All Locations:" flat>
              <v-card-text>
                <LocationCard
                  class="my-4"
                  v-for="l in locationStore.locations"
                  :location="l"
                  :key="l.id"
                  card-border
                />
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="option-4">
            <AccountSettingsAccount no-elevation />
          </v-window-item>

          <v-window-item value="option-5">
            <!-- Image upload drop zone -->
            <v-card
              ref="imageDropZoneRef"
              class="pa-16 border-dashed rounded-2xl"
            >
              <v-card-title>Upload new prescription:</v-card-title>
              <v-card
                :border="true"
                class="text-center pa-8 mx-5 mt-4"
                @click=""
              >
                <!-- Drop zone instructions -->
                <v-card-title>upload Image</v-card-title>
                {{
                  !imageFileInput
                    ? !isOverDropZone
                      ? 'drag and drop images (allowed: images and png)'
                      : 'drop'
                    : `image: ${imageFileInput.name}, size: ${imageFileInput.size}`
                }}
              </v-card>

              <v-card-text class="d-flex">
                <v-text-field
                  hide-details
                  v-model="prescriptionStore.prescription.description"
                  prepend-inner-icon="ri-sticky-note-line"
                  placeholder="Add a note of the prescription"
                  label="Add Note"
                  class="me-2"
                />

                <v-btn
                  variant="outlined"
                  @click="
                    () => {
                      prescriptionStore.create()
                      refresh()
                    }
                  "
                  :loading="loading"
                  height="48"
                  >Upload Prescription</v-btn
                >
              </v-card-text>

              <v-divider class="my-8" />

              <v-card-title class="mb-4"> Recent Prescriptions: </v-card-title>

              <v-card-text>
                <div
                  v-if="
                    !prescriptionStore.prescriptions ||
                    prescriptionStore.prescriptions?.length == 0
                  "
                >
                  No recent Prescription yet.. Upload one
                </div>
                <v-row v-else>
                  <v-col
                    cols="12"
                    md="6"
                    v-for="p in prescriptionStore.prescriptions"
                  >
                    <v-card :border="true">
                      <v-img
                        height="200"
                        cover
                        :src="`http://127.0.0.1:8000${p.image}`"
                      ></v-img>
                      <v-card-text class="text-center">
                        <div class="mb-2">
                          <strong>Uploaded At:</strong>
                          {{ $dayjs(p.created_at).format('YYYY/MM/DD hh:mm') }}
                        </div>
                        <strong>Note:</strong>
                        {{ p.description }}
                        <v-chip v-if="!p.order" class="mt-2">pending</v-chip>
                        <v-chip
                          @click="tab = 'option-2'"
                          append-icon="ri-arrow-right-line"
                          v-else
                          class="mt-2"
                          >Go to your order</v-chip
                        >
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog width="auto" :model-value="logoutDialog">
    <v-card
      width="400"
      prepend-icon="ri-error-warning-line"
      title="Are you sure you want to logout ?"
    >
      <v-card-text>This action is undone</v-card-text>
      <v-card-actions>
        <v-btn
          prepend-icon="ri-logout-circle-r-line"
          @click="authStore.logout()"
          :loading="authStore.loading"
        >
          logout
        </v-btn>
        <v-btn @click="logoutDialog = false"> cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const tab = ref('option-1')
const orderStore = useOrderStore()
const locationStore = useLocationStore()
const authStore = useMyAuthStore()
const prescriptionStore = usePrescriptionStore()

const logoutDialog = ref(false)

useAsyncData(() => orderStore.getAllOrders())
const { refresh } = useAsyncData(() => prescriptionStore.getAllPrescriptions())

const currentOrder = computed(() => {
  return orderStore.orders?.find(
    e => e.status == 'preparing' || e.status == 'shipping'
  )
})

const { imageFileInput, loading } = storeToRefs(prescriptionStore)

// Reference to the drop zone for image uploads
const imageDropZoneRef = ref<HTMLElement>()

// Function to handle image drop event
function onImageDrop(files: File[] | null) {
  imageFileInput.value = []
  if (files) {
    imageFileInput.value = files[0]
  }
}

// Configuring drop zone for image uploads
const { isOverDropZone } = useDropZone(imageDropZoneRef, {
  dataTypes: ['image/png'],
  onDrop: onImageDrop
})

definePageMeta({
  middleware: 'my-account',
  layout: 'user-layout'
})
</script>

<!-- <style>

</style> -->
