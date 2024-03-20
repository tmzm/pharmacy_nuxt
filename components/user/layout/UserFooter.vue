<template>
  <div class="mb-md-0 mb-14">
    <div class="bg-contain bg-repeat pa-8 px-16" :style="bgStyle">
      <v-row class="text-center text-md font-semibold">
        <v-col cols="12" md="6">
          Subscribe For The Latest Discount & Trends
          <v-text-field
            color="black"
            label="Enter Your Email address"
            class="mt-4"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="mb-4">Download the app</div>
          <v-btn class="mr-4" color="black" prepend-icon="ri-google-play-line">
            Google Play
          </v-btn>
          <v-btn color="black" prepend-icon="ri-app-store-line">
            AppStore
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="text-center d-flex flex-column pa-8 bg-white">
      <div>
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </div>

      <v-divider></v-divider>

      <div>{{ new Date().getFullYear() }} — <strong>Vuetify</strong></div>
    </div>

    <div :style="bgStyle" class="pa-4 w-100 text-center">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="outlined"
        color="black"
      ></v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import bg from '@images/pages/bg-download.jpg'

const bgStyle = `background-image: url(${bg})`

const icons = [
  'ri-facebook-line',
  'ri-twitter-line',
  'ri-linkedin-line',
  'ri-instagram-line'
]
</script>

<!-- <style>

</style> -->
