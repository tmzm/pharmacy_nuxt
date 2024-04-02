<script lang="ts" setup>
import avatar1 from '@images/avatars/avatar-1.png'

defineProps<{
  noElevation?: boolean
}>()

const accountData = {
  avatarImg: avatar1,
  firstName: 'john',
  lastName: 'Doe',
  email: 'johnDoe@example.com',
  org: 'ThemeSelection',
  phone: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zip: '10001',
  country: 'USA',
  language: 'English',
  timezone: '(GMT-11:00) International Date Line West',
  currency: 'USD'
}

const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
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
                  v-model="accountDataLocal.firstName"
                  placeholder="John"
                  label="Full Name"
                />
              </v-col>

              <!-- Phone -->
              <v-col cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.phone"
                  label="Phone Number"
                  placeholder="+1 (917) 543-9876"
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
