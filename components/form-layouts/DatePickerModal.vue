<template>
  <v-menu location="bottom" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-col cols="6">
        <v-btn color="primary" block variant="outlined" v-bind="props">
          exp date:
          {{ dayjs(product?.expiration).format('YYYY/MM/DD') ?? 'YYYY/MM/DD' }}
        </v-btn>
      </v-col>
    </template>

    <v-date-picker v-model="product.expiration" width="400"></v-date-picker>
  </v-menu>
</template>

<script lang="ts" setup>
const dayjs = useDayjs()

const productStore = useProductStore()
const { product } = storeToRefs(productStore)
</script>
