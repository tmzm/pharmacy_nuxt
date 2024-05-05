<template>
  <v-locale-provider :rtl="$i18n.locale == 'ar'">
    <Sidebar @closeDrawer="drawer = !drawer" v-model="drawer" />
    <Navbar @drawer="drawer = !drawer" />
    <v-main>
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

    <SelectLocationModal v-if="token" close-btn />
  </v-locale-provider>
</template>

<script lang="ts" setup>
const i18n = useI18n()
const route = useRoute()
const productStore = useProductStore()
const drawer = ref(false)
const token: any = useCookie('token')

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
    if (breadcrumbs[lastIndex]?.title == i18n.t('products')) {
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
