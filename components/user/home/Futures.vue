<template>
  <v-row class="my-2">
    <v-col v-for="item in items" cols="6" md="3">
      <v-card class="rounded-xl" @click="() => {}">
        <div
          class="d-block d-md-flex items-center text-center justify-space-between"
        >
          <v-img :src="item.src" width="150" height="150" />
          <v-card-title> {{ item.title }} </v-card-title>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import pr from '@images/prescription.png'

const items = [
  { src: pr, title: 'Upload Prescription' },
  { src: pr, title: 'Brand Deals' },
  { src: pr, title: 'Doctor Appointment' },
  { src: pr, title: 'Hermon Wellness' }
]
</script>

<!-- <style>

</style> -->
