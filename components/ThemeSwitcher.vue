<script setup lang="ts">
const themeStore = useThemeStore()
</script>

<template>
  <IconBtn @click="themeStore.changeTheme()">
    <v-icon
      :icon="
        themeStore.theme.global.name == 'light'
          ? themes[0].icon
          : themes[1].icon
      "
    />
    <VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
      <span class="text-capitalize">{{ themeStore.theme.global.name }}</span>
    </VTooltip>
  </IconBtn>
</template>
