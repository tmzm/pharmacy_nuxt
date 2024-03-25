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

    <div class="d-flex pa-8 bg-white text-center">
      <div>
        <div class="pa-2 mb-4 rounded-xl bg-primary-darken-1">
          <v-img :src="logo" width="180"></v-img>
        </div>
        <div>Moafa Pharmacy - Syria - Free zone - Damascus</div>
        <div class="pa-4 mt-4 rounded-xl" style="background-color: #dbfff6">
          Got Question? Call us
          <div><v-icon>ri-phone-line</v-icon>+963 999 999 999</div>
        </div>
      </div>

      <v-divider class="mx-8" vertical />

      <div class="d-flex flex-column">
        <div>
          We are looking for your comfort and your access to the necessary
          medication in the best way...and following up with you and providing
          medical advice and guidance.
        </div>

        <div class="d-flex mt-4 w-295 mx-auto">
          <div>{{ new Date().getFullYear() }} — <strong>Moafa</strong></div>
          <v-spacer />
          <div>
            Devoloped with <v-icon>ri-heart-line</v-icon> by Tarek Al Mozayek
          </div>
        </div>
      </div>
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
import logo from '@images/logos/logoMoafa.webp'
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
