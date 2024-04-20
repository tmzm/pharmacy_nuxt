<script lang="ts" setup>
import type { User } from '@/types'

const authStore = useAuthStore()

defineProps<{
  noElevation?: boolean
}>()

const userDetails = ref<User>(authStore.user)
const isAccountDeactivated = ref(false)

const resetForm = () => {
  userDetails.value = authStore.user
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card title="Account Details" :elevation="noElevation ? 0 : undefined">
        <v-card-text>
          <!-- Form -->
          <VForm class="mt-6">
            <v-row>
              <!-- First Name -->
              <v-col cols="12" md="6">
                <VTextField
                  v-model="userDetails.name"
                  placeholder="John"
                  label="Full Name"
                />
              </v-col>

              <!-- Phone -->
              <v-col cols="12" md="6">
                <VTextField
                  v-model="userDetails.phone_number"
                  label="Phone Number"
                  placeholder="XXXXXXXXX"
                  :counter="9"
                />
              </v-col>

              <!-- Form Actions -->
              <v-col cols="12" class="d-flex flex-wrap gap-4">
                <v-btn elevation="0"> Save changes</v-btn>

                <v-btn
                  color="secondary"
                  variant="outlined"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </v-btn>
              </v-col>
            </v-row>
          </VForm>
        </v-card-text>
      </v-card>
    </v-col>

    <v-divider v-if="noElevation" />

    <v-col cols="12">
      <!-- Deactivate Account -->
      <v-card
        title="Deactivate Account"
        :elevation="noElevation ? 0 : undefined"
      >
        <v-card-text>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              label="I confirm my account deactivation"
            />
          </div>

          <v-btn :disabled="!isAccountDeactivated" color="error" class="mt-3">
            Deactivate Account
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
