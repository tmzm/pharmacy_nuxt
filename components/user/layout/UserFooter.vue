<template>
  <div class="mb-md-0 mb-14">
    <div class="d-flex pa-8 bg-primary-darken-1 text-center">
      <div>
        <v-img :src="logo" width="180"></v-img>
        <div>Moafa Pharmacy - Syria - Free zone - Damascus</div>
        <div class="pa-4 mt-4 rounded-xl" style="background-color: #dbfff6">
          Got Question? Call us
          <div><v-icon>ri-phone-line</v-icon>+963 999 999 999</div>
        </div>
      </div>

      <v-divider class="mx-8" vertical />

      <div class="text-white d-flex flex-column">
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
