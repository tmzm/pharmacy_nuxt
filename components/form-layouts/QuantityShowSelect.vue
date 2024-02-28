<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-slider
        v-bind="props"
        v-model="quantityShow"
        :max="2"
        step="1"
        :show-ticks="isHovering"
        tick-size="3"
        :thumb-label="isHovering"
      >
        <template v-slot:thumb-label="{ modelValue }">
          {{
            modelValue == 0
              ? 'always available'
              : modelValue == 1
              ? 'not available'
              : 'available with quantity'
          }}
        </template>
      </v-slider>
    </template>
  </v-hover>
</template>

<script lang="ts" setup>
const productStore = useProductStore()

const { quantityShow, product } = storeToRefs(productStore)

const route = useRoute()

const id = computed(() => {
  return (route.params as { id: number }).id
})

if (id) {
  quantityShow.value =
    product.value.is_quantity && product.value.quantity > 0
      ? 2
      : product.value.is_quantity && product.value.quantity == 0
      ? 1
      : 0
} else {
  quantityShow.value = 0
}
</script>
