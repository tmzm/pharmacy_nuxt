<template>
  <v-card rounded="0" elevation="0" border class="mb-md-0">
    <v-container>
      <div class="mb-8">
        <v-row>
          <v-col md="2" cols="4" v-for="item in items">
            <h3 class="mb-4">{{ item.title }}</h3>
            <div class="flex flex-col space-y-1">
              <p v-for="subItem in item.subItems" class="text-body-2 mb-0">
                {{ subItem }}
              </p>
            </div>
          </v-col>
          <v-col md="4" cols="8">
            <h3 class="mb-4">Follow Us</h3>
            <div class="d-flex space-x-4">
              <v-btn v-for="icon in icons" :icon="icon"></v-btn>
            </div>

            <div class="mt-4">
              {{ $t('site-description') }}
            </div>
          </v-col>
        </v-row>
      </div>
      <div>
        {{ $t('dev-with') }} <v-icon color="error">ri-heart-fill</v-icon>
        {{ $t('by') }}
        <strong>{{ $t('dev-name') }}</strong>
      </div>
    </v-container>
  </v-card>

  <v-container class="text-body-2 mb-14 mb-md-0">
    <div class="text-center">
      © {{ new Date().getFullYear() }} {{ $t('moafa') }}.
      {{ $t('rights-reserved') }}.
    </div>
  </v-container>
</template>

<script lang="ts" setup>
const icons = [
  'ri-facebook-line',
  'ri-twitter-line',
  'ri-linkedin-line',
  'ri-instagram-line'
]

const items = [
  {
    title: 'Moafa',
    subItems: [
      'My Profile',
      'Appointments',
      'Records',
      'Lists',
      'Family Members',
      'About myAster'
    ]
  },
  {
    title: 'Virtual Care',
    subItems: ['Instant Video Consultation', 'Specialities', 'Facilities']
  },
  {
    title: 'Pharmacy',
    subItems: ['Categories', 'Brands', 'My Orders']
  },
  {
    title: 'Policy Info',
    subItems: [
      'Terms & Conditions',
      'Privacy Policy',
      'Consent Form',
      'Patients Rights and Responsibilities',
      'Return & Refund Policy',
      'Payments'
    ]
  }
]
</script>

<!-- <style>

</style> -->
