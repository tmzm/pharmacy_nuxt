<template>
  <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background>
    <v-carousel-item v-for="n in 3">
      <div
        class="w-100 h-100 bg-cover rounded-lg d-flex flex-col items-start justify-end"
        :style="s"
      >
        <div class="text-white text-[32px] mb-12 ms-8 font-semibold">
          {{ $t('first-pharmacy') }}
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts" setup>
import image from '@/assets/images/pages/ph-baner.jpg'
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
