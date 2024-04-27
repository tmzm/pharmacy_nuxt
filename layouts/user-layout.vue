<template>
  <Navbar />
  <v-main>
    <Carousel
      :src="banner"
      v-if="route.path == '/' || route.path == '/en'"
      class="mb-4 md:h-130"
    />
    <v-container>
      <v-breadcrumbs
        :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
        class="d-md-block d-none"
        v-if="route.path != '/' && route.path != '/en'"
        :items="items"
      />
      <slot />
    </v-container>
  </v-main>
  <Bottombar />
  <UserFooter />
</template>

<script lang="ts" setup>
import { convertToTitleCaseWithSpace } from '@/composables'
import banner from '@images/pages/ph-baner.jpg'

const i18n = useI18n()
const route = useRoute()
const productStore = useProductStore()

const items = computed(() => {
  const path = route.path
  const pathArray = path.split('/').filter(item => item !== '')
  const breadcrumbs: any = []
  breadcrumbs.push({ title: i18n.t('Home'), href: '/', disabled: false })
  let fullPath = ''
  let lastIndex = 0
  pathArray.forEach((item, index) => {
    lastIndex = index
    fullPath += '/' + item
    if (breadcrumbs[lastIndex]?.title == 'Products') {
      breadcrumbs.push({
        title: productStore.product.commercial_name,
        href: fullPath,
        disabled: false
      })
    } else {
      breadcrumbs.push({
        title: convertToTitleCaseWithSpace(i18n.t(item)),
        href: fullPath,
        disabled: item == 'auth' ? true : false
      })
    }
  })

  breadcrumbs[lastIndex + 1].disabled = true
  return breadcrumbs
})
</script>

<!-- <style></style> -->
