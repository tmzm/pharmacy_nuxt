<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card elevation="0">
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
          <v-tab @click="logoutDialog = true">
            <v-icon start> ri-logout-box-r-line </v-icon>
            Logout
          </v-tab>
        </v-tabs>
      </v-card>
    </v-col>

    <v-col cols="12" md="6">
      <v-card elevation="0">
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
        </v-window>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog width="auto" :v-model="logoutDialog">
    <v-card
      width="400"
      prepend-icon="ri-error-warning-line"
      title="Are you sure you want to logout ?"
    >
      <v-card-text>This action is undone</v-card-text>
      <v-card-actions>
        <v-btn @click="authStore.logout()" :loading="authStore.loading">
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

const logoutDialog = ref(false)

useAsyncData(() => orderStore.getAllOrders())

const currentOrder = computed(() => {
  return orderStore.orders?.find(
    e => e.status == 'preparing' || e.status == 'shipping'
  )
})

definePageMeta({
  layout: 'user-layout'
})
</script>

<!-- <style>

</style> -->
