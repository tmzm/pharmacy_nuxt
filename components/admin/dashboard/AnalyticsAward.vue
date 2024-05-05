<script setup lang="ts">
import trophy from '@/assets/images/misc/trophy.png'
</script>

<template>
  <v-card class="position-relative">
    <v-card-text>
      <div class="mb-2">
        <h5 class="text-h5">
          Congratulations John! <span class="text-high-emphasis">🎉</span>
        </h5>
        <div class="text-body-1">Best seller of the month</div>
      </div>
      <h4 class="text-h4 text-primary">$42.8k</h4>
      <div class="text-body-1 mb-2">
        78% of target <span class="text-high-emphasis">🚀</span>
      </div>
      <v-btn size="small"> View Sales </v-btn>
    </v-card-text>

    <!-- Trophy -->
    <v-img :src="trophy" class="trophy" />
  </v-card>
</template>

<style lang="scss">
.v-card .trophy {
  position: absolute;
  inline-size: 5.188rem;
  inset-block-end: 1.25rem;
  inset-inline-end: 1.25rem;
}
</style>
