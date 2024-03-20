<template>
  <v-bottom-navigation v-model="value" grow class="d-flex d-md-none">
    <v-btn class="d-flex">
      <v-badge :content="0">
        <v-icon size="24" icon="ri-heart-line" />
        <div class="text-lg ms-2">Favorites</div>
      </v-badge>
    </v-btn>

    <v-btn class="d-flex">
      <v-badge :content="0">
        <v-icon size="24" icon="ri-shopping-cart-line" />
        <div class="text-lg ms-2">cart</div>
      </v-badge>
    </v-btn>

    <v-btn>
      <div class="text-lg ms-2">
        <v-icon size="24" icon="ri-medicine-bottle-line" />
        PX
      </div>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
const value = ref(1)
</script>

<!-- <style>

</style> -->
