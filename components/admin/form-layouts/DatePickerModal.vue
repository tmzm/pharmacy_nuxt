<template>
  <!-- Menu component with date picker -->
  <v-menu location="bottom" :close-on-content-click="false">
    <!-- Activator slot to trigger menu -->
    <template v-slot:activator="{ props }">
      <!-- Button to activate the menu -->
      <v-col cols="6">
        <v-btn color="primary" block variant="outlined" v-bind="props">
          <!-- Display expiration date -->
          exp date:
          {{ dayjs(product?.expiration).format('YYYY/MM/DD') ?? 'YYYY/MM/DD' }}
        </v-btn>
      </v-col>
    </template>

    <!-- Date picker component inside the menu -->
    <v-date-picker
      show-adjacent-months
      v-model="product.expiration"
      width="400"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts" setup>
// Importing day.js library
const dayjs = useDayjs()

// Accessing product store
const productStore = useProductStore()
const { product } = storeToRefs(productStore)
</script>
