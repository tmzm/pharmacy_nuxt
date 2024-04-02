<template>
  <v-card rounded="0" elevation="0" border class="mb-md-0 mb-14">
    <v-container>
      <div class="mb-8">
        <v-row class="text-h6 text-md-h5 text-truncate">
          <v-col cols="3"> myAster </v-col>
          <v-col cols="3"> Virtual Care </v-col>
          <v-col cols="3"> Pharmacy </v-col>
          <v-col cols="3"> Policy Info </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
        <v-row v-for="n in 5" class="text-body-2 text-md-body-1 text-truncate">
          <v-col cols="3"> My Profile </v-col>
          <v-col cols="3"> Instant Video </v-col>
          <v-col cols="3"> Categories </v-col>
          <v-col cols="3"> Terms & Conditions </v-col>
        </v-row>
      </div>
      <div class="text-center">
        <div>
          We are looking for your comfort and your access to the necessary
          medication in the best way...and following up with you and providing
          medical advice and guidance.
        </div>

        <div class="d-flex mt-4">
          <div>{{ new Date().getFullYear() }} — <strong>Moafa</strong></div>
          <v-spacer />
          <div>
            Devoloped with <v-icon color="error">ri-heart-fill</v-icon> by
            <div><strong>Tarek Al Mozayek</strong></div>
          </div>
        </div>
      </div>

      <v-divider />

      <div class="pa-4 w-100 text-center">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-4"
          variant="outlined"
          color="black"
        ></v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
const icons = [
  'ri-facebook-line',
  'ri-twitter-line',
  'ri-linkedin-line',
  'ri-instagram-line'
]
</script>

<!-- <style>

</style> -->
