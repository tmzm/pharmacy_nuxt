<template>
  <div>
    <Navbar />
    <v-main>
      <v-container fluid>
        <v-breadcrumbs v-if="route.path != '/'" :items="items">
          <template v-slot:divider>
            <v-icon icon="ri-arrow-right-s-line"></v-icon>
          </template>
        </v-breadcrumbs>
        <v-divider class="mb-8" />
        <slot />
      </v-container>
    </v-main>
    <Bottombar />
    <UserFooter />
  </div>
</template>

<script lang="ts" setup>
import { convertToTitleCaseWithSpace } from '@/composables'

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
