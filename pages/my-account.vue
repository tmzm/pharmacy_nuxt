<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-card class="py-4">
        <v-list-item
          base-color="secondary"
          :title="$t('dash')"
          prepend-icon="ri-home-3-line"
        />
        <v-tabs v-model="tab" color="secondary" direction="vertical">
          <v-tab @click="t.action" v-for="t in tabs" :value="t.value">
            <v-icon start> {{ t.icon }} </v-icon>
            {{ $t(t.title) }}
          </v-tab>
        </v-tabs>
      </v-card>
    </v-col>

    <v-col cols="12" md="9">
      <v-window v-model="tab">
        <!-- <v-window-item value="option-1">
          <v-card>
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

              <v-divider class="my-4" />

              You don't have any product yet!
            </v-card-text>
          </v-card>
        </v-window-item> -->
        <v-window-item value="option-2">
          <v-card
            flat
            v-if="!orderStore.orders || orderStore.orders?.length == 0"
          >
            <v-card-text>
              {{ $t('no-order-made') }}
              <v-btn
                to="/products"
                variant="outlined"
                append-icon="ri-arrow-right-line"
              >
                {{ $t('continue-shopping') }}
              </v-btn></v-card-text
            >
          </v-card>
          <v-card v-else>
            <v-card-title> {{ $t('current-order') }} </v-card-title>
            <v-card-text>
              <CurrentOrderCard
                v-if="currentOrder"
                :current-order="currentOrder"
              />

              <div v-else>
                {{ $t('no-current-order') }}...
                <nuxt-link color="secondary" to="/products">{{
                  $t('continue-shopping')
                }}</nuxt-link>
              </div>
            </v-card-text>

            <v-divider class="my-4" />

            <v-card-title>{{ $t('recent-orders') }}:</v-card-title>

            <v-card-text>
              <div
                v-if="
                  orderStore.orders.filter(e => e.status == 'delivered')
                    .length == 0
                "
              >
                {{ $t('no-recent-orders') }}
              </div>
              <div v-else></div>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-3">
          <v-card :title="$t('all-locations') + ' :'" flat>
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
          <v-card>
            <v-card-text>
              <a-upload-dragger
                class="my-4"
                v-model:fileList="imageFileInput"
                name="file"
                @change="handleChange"
                @drop="handleDrop"
                :max-count="1"
              >
                <v-icon size="45" color="secondary">ri-inbox-line</v-icon>
                <div class="my-4">
                  <p class="ant-upload-text">
                    {{ $t('Click or drag file to this area to upload') }}
                  </p>
                </div>
              </a-upload-dragger>

              <div class="d-flex">
                <v-text-field
                  hide-details
                  v-model="prescriptionStore.prescription.description"
                  prepend-inner-icon="ri-sticky-note-line"
                  :placeholder="$t('add-note')"
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
                  >{{ $t('upload-new-p') }}</v-btn
                >
              </div>
            </v-card-text>

            <v-divider class="my-8" />

            <v-card-title class="mb-4"> {{ $t('recent-p') }}: </v-card-title>

            <v-card-text>
              <div
                v-if="
                  !prescriptionStore.prescriptions ||
                  prescriptionStore.prescriptions?.length == 0
                "
              >
                {{ $t('no-recent-p') }}
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
    </v-col>
  </v-row>

  <v-dialog width="auto" v-model="logoutDialog">
    <v-card
      width="350"
      prepend-icon="ri-error-warning-line"
      :title="$t('logout')"
    >
      <v-card-text>{{ $t('sure-to-logout') }}</v-card-text>
      <v-card-actions>
        <v-btn
          prepend-icon="ri-logout-circle-r-line"
          @click="authStore.logout()"
          :loading="authStore.loading"
        >
          {{ $t('logout') }}
        </v-btn>
        <v-btn @click="logoutDialog = false"> {{ $t('cancel') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { UploadChangeParam } from 'ant-design-vue'

const tabs = [
  // {
  //   title: 'dash',
  //   value: 'option-1',
  //   icon: 'ri-home-3-line'
  // },
  {
    title: 'orders',
    value: 'option-2',
    icon: 'ri-box-3-line'
  },
  {
    title: 'addresses',
    value: 'option-3',
    icon: 'ri-map-pin-line'
  },
  {
    title: 'account-details',
    value: 'option-4',
    icon: 'ri-admin-line'
  },
  {
    title: 'prescriptions',
    value: 'option-5',
    icon: 'ri-medicine-bottle-line'
  },
  {
    title: 'logout',
    action: () => {
      logoutDialog.value = true
    },
    icon: 'ri-logout-box-r-line'
  }
]

const tab = ref('option-1')
const orderStore = useOrderStore()
const locationStore = useLocationStore()
const authStore = useAuthStore()
const prescriptionStore = usePrescriptionStore()

const logoutDialog = ref(false)

await useAsyncData(() => orderStore.getAllOrders())
const { refresh } = await useAsyncData(() =>
  prescriptionStore.getAllPrescriptions()
)

const currentOrder = computed(() => {
  return orderStore.orders?.find(
    e => e.status == 'preparing' || e.status == 'shipping'
  )
})

const { imageFileInput, loading } = storeToRefs(prescriptionStore)

const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status

  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`)
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`)
  }
}
function handleDrop(e: DragEvent) {
  console.log(e)
}

definePageMeta({
  middleware: 'my-account',
  layout: 'user-layout'
})
</script>

<!-- <style>

</style> -->
