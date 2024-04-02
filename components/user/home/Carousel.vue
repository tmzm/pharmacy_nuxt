<template>
  <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background>
    <v-carousel-item v-for="n in 3">
      <div class="w-100 h-100 bg-cover" :style="s">
        <v-overlay
          class="d-flex items-center justify-center"
          persistent
          contained
          :model-value="true"
        >
          <v-img width="300" class="mx-auto" :src="logo"></v-img>
          <div class="text-white text-md-h1 text-h4 font-semibold">
            {{ $t('first-pharmacy') }}
          </div>
        </v-overlay>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts" setup>
import logo from '@images/logos/logoMoafa.webp'
import image from '@images/pages/ph-baner.jpg'
const s = 'background-image: url(' + image + ');'
const length = ref(3)
const onboarding = ref(1)

const next = () => {
  onboarding.value =
    onboarding.value + 1 > length.value ? 1 : onboarding.value + 1
}
const prev = () => {
  onboarding.value =
    onboarding.value - 1 <= 0 ? length.value : onboarding.value - 1
}
</script>

<!-- <style>

</style> -->
