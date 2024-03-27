<template>
  <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background>
    <v-carousel-item v-for="n in 3">
      <div
        class="w-100 h-100 bg-cover"
        style="
          background-image: url('https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-6/375048983_260615643589888_2634043850175360036_n.jpg?stp=dst-jpg_p843x403&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mD2kXv20LusAX_bMjH_&_nc_ht=scontent-mrs2-1.xx&oh=00_AfDFqq0L_A4BeaP7g9WadXdBpiCNssFzSGLGF1UVYusHqQ&oe=6602DAA4');
        "
      ></div>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts" setup>
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
