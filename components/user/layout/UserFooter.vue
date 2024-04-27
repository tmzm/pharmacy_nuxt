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
              We are looking for your comfort and your access to the necessary
              medication in the best way...and following up with you and
              providing medical advice and guidance.
            </div>
          </v-col>
        </v-row>
      </div>
      <div>
        Devoloped with <v-icon color="error">ri-heart-fill</v-icon> by
        <strong>Tarek Al Mozayek</strong>
      </div>
    </v-container>
  </v-card>

  <v-container
    class="text-body-2 d-md-flex items-center justify-between mb-14 mb-md-0"
  >
    <div class="d-md-flex items-center">
      <div>
        Corporate Address Al Hudaiba Awards Building, Jumeriah Interchange
        Street, Dubai, UAE.
      </div>
      <div>
        <v-icon class="mx-2 ms-md-8">ri-phone-line</v-icon> +971-800-700-600
      </div>
      <div>
        <v-icon class="mx-2 ms-md-8">ri-message-3-line</v-icon> Contact Us
      </div>
    </div>
    <div class="space-y-0 flex flex-col items-end">
      <div>© {{ new Date().getFullYear() }} Moafa. All rights reserved.</div>
      <div>Advertisement License No:</div>
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
