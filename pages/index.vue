<template>
  <v-card class="my-4" elevation="0">
    <v-window v-model="onboarding">
      <v-window-item v-for="n in length" :key="`card-${n}`" :value="n">
        <v-card class="d-flex justify-center align-center" height="200">
          <span class="text-h2"> Card {{ n }} </span>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn icon="ri-arrow-left-s-line" variant="plain" @click="prev"></v-btn>
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot="{ isSelected, toggle }"
          :value="n"
        >
          <v-btn
            :variant="isSelected ? 'outlined' : 'text'"
            icon="ri-focus-fill"
            @click="toggle"
          ></v-btn>
        </v-item>
      </v-item-group>
      <v-btn icon="ri-arrow-right-s-line" variant="plain" @click="next"></v-btn>
    </v-card-actions>
  </v-card>

  <TopSellers />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'user-layout'
})

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
