<template>
  <VApp>
    <NuxtLayout>
      <div :dir="locale == 'ar' ? 'rtl' : 'ltr'">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </VApp>
</template>

<script setup lang="ts">
const i18nHead = useLocaleHead()
const { locale } = useI18n()

// onMessage(messaging, payload => {
//   console.log('Message received. ', payload)
//   // ...
// })

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
})
</script>
