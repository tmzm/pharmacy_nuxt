<script lang="ts" setup>
import avatar1 from '@images/avatars/avatar-1.png'

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

const refInputEl = ref<HTMLElement>()

const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

// changeAvatar function
const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

const timezones = [
  '(GMT-11:00) International Date Line West',
  '(GMT-11:00) Midway Island',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-08:00) Tijuana',
  '(GMT-07:00) Arizona',
  '(GMT-07:00) Chihuahua',
  '(GMT-07:00) La Paz',
  '(GMT-07:00) Mazatlan',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central America',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-06:00) Guadalajara',
  '(GMT-06:00) Mexico City',
  '(GMT-06:00) Monterrey',
  '(GMT-06:00) Saskatchewan',
  '(GMT-05:00) Bogota',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT-05:00) Indiana (East)',
  '(GMT-05:00) Lima',
  '(GMT-05:00) Quito',
  '(GMT-04:00) Atlantic Time (Canada)',
  '(GMT-04:00) Caracas',
  '(GMT-04:00) La Paz',
  '(GMT-04:00) Santiago',
  '(GMT-03:30) Newfoundland',
  '(GMT-03:00) Brasilia',
  '(GMT-03:00) Buenos Aires',
  '(GMT-03:00) Georgetown',
  '(GMT-03:00) Greenland',
  '(GMT-02:00) Mid-Atlantic',
  '(GMT-01:00) Azores',
  '(GMT-01:00) Cape Verde Is.',
  '(GMT+00:00) Casablanca',
  '(GMT+00:00) Dublin',
  '(GMT+00:00) Edinburgh',
  '(GMT+00:00) Lisbon',
  '(GMT+00:00) London'
]

const currencies = [
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'BRL',
  'CAD',
  'CNY',
  'CZK',
  'DKK',
  'HKD',
  'HUF',
  'INR'
]
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card title="Account Details">
        <v-card-text class="d-flex">
          <!-- Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <v-btn color="primary" @click="refInputEl?.click()">
                <v-icon icon="ri-upload-cloud-line" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </v-btn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              />

              <v-btn
                type="reset"
                color="error"
                variant="outlined"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <v-icon icon="ri-refresh-line" class="d-sm-none" />
              </v-btn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </v-card-text>

        <VDivider />

        <v-card-text>
          <!-- Form -->
          <VForm class="mt-6">
            <v-row>
              <!-- First Name -->
              <v-col md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.firstName"
                  placeholder="John"
                  label="First Name"
                />
              </v-col>

              <!-- Last Name -->
              <v-col md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.lastName"
                  placeholder="Doe"
                  label="Last Name"
                />
              </v-col>

              <!-- Email -->
              <v-col cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.email"
                  label="E-mail"
                  placeholder="johndoe@gmail.com"
                  type="email"
                />
              </v-col>

              <!-- Organization -->
              <v-col cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.org"
                  label="Organization"
                  placeholder="ThemeSelection"
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

              <!-- Address -->
              <v-col cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.address"
                  label="Address"
                  placeholder="123 Main St, New York, NY 10001"
                />
              </v-col>

              <!-- State -->
              <v-col cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.state"
                  label="State"
                  placeholder="New York"
                />
              </v-col>

              <!-- Zip Code -->
              <v-col cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.zip"
                  label="Zip Code"
                  placeholder="10001"
                />
              </v-col>

              <!-- Country -->
              <v-col cols="12" md="6">
                <VSelect
                  v-model="accountDataLocal.country"
                  label="Country"
                  :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                  placeholder="Select Country"
                />
              </v-col>

              <!-- Language -->
              <v-col cols="12" md="6">
                <VSelect
                  v-model="accountDataLocal.language"
                  label="Language"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'Arabic', 'Hindi', 'Urdu']"
                />
              </v-col>

              <!-- Timezone -->
              <v-col cols="12" md="6">
                <VSelect
                  v-model="accountDataLocal.timezone"
                  label="Timezone"
                  placeholder="Select Timezone"
                  :items="timezones"
                  :menu-props="{ maxHeight: 200 }"
                />
              </v-col>

              <!-- Currency -->
              <v-col cols="12" md="6">
                <VSelect
                  v-model="accountDataLocal.currency"
                  label="Currency"
                  placeholder="Select Currency"
                  :items="currencies"
                  :menu-props="{ maxHeight: 200 }"
                />
              </v-col>

              <!-- Form Actions -->
              <v-col cols="12" class="d-flex flex-wrap gap-4">
                <v-btn>Save changes</v-btn>

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

    <v-col cols="12">
      <!-- Deactivate Account -->
      <v-card title="Deactivate Account">
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
