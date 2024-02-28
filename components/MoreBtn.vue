<script lang="ts" setup>
const props = defineProps<{
  menuList?: unknown[]
  itemProps?: boolean
}>()
</script>

<template>
  <IconBtn>
    <v-icon icon="ri-more-2-line" />

    <VMenu v-if="props.menuList" activator="parent">
      <v-list :items="props.menuList" :item-props="props.itemProps" />
    </VMenu>
  </IconBtn>
</template>
