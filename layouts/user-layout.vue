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
        <slot />
      </v-container>
    </v-main>
    <Bottombar />
    <UserFooter />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const items = computed(() => {
  const path = route.path
  const pathArray = path.split('/').filter(item => item !== '')
  const breadcrumbs = []
  breadcrumbs.push({ title: 'Home', href: '/', disabled: false })
  let fullPath = ''
  let lastIndex = 0
  pathArray.forEach((item, index) => {
    fullPath += '/' + item
    breadcrumbs.push({ title: item, href: fullPath, disabled: false })
    lastIndex = index
  })
  breadcrumbs[lastIndex + 1].disabled = true
  return breadcrumbs
})
</script>

<!-- <style></style> -->
