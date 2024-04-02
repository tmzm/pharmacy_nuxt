<template>
  <!-- Menu component with date picker -->
  <v-menu :close-on-content-click="false">
    <!-- Activator slot to trigger menu -->
    <template v-slot:activator="{ props }">
      <!-- Button to activate the menu -->
      <v-col cols="6">
        <v-btn color="primary" block variant="outlined" v-bind="props">
          <!-- Display expiration date -->
          exp date:
          {{ $dayjs(product?.expiration).format('YYYY/MM/DD') }}
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
// Accessing product store
const productStore = useProductStore()
const { product } = storeToRefs(productStore)

product.value.expiration = product.value.expiration
  ? new Date(product.value.expiration)
  : new Date()
</script>
