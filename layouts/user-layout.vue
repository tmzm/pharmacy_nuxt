<template>
  <div>
    <Navbar />
    <v-main>
      <v-img :src="banner" v-if="route.path == '/'" cover class="mb-4 md:h-130">
        <v-overlay
          class="d-flex items-center justify-center"
          persistent
          contained
          :model-value="true"
        >
          <v-img width="300" class="mx-auto" :src="logo"></v-img>
          <div class="text-white text-md-h1 text-h4 font-semibold">
            The First Pharmacy In SYRIA ever
          </div>
        </v-overlay>
      </v-img>
      <v-breadcrumbs v-if="route.path != '/'" :items="items">
        <template v-slot:divider>
          <v-icon icon="ri-arrow-right-s-line"></v-icon>
        </template>
      </v-breadcrumbs>
      <v-divider v-if="route.path != '/'" class="mb-8" />
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <Bottombar />
    <UserFooter />
  </div>
</template>

<script lang="ts" setup>
import { convertToTitleCaseWithSpace } from '@/composables'
import logo from '@images/logos/logoMoafa.webp'
import banner from '@images/pages/ph-baner.jpg'

const route = useRoute()
const productStore = useProductStore()

const items = computed(() => {
  const path = route.path
  const pathArray = path.split('/').filter(item => item !== '')
  const breadcrumbs: any = []
  breadcrumbs.push({ title: 'Home', href: '/', disabled: false })
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
        title: convertToTitleCaseWithSpace(item),
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
