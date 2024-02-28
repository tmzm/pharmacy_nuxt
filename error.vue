<script setup lang="ts">
import misc404 from '@images/pages/404.png'
import type { NuxtError } from 'nuxt/app'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  error: NuxtError
}>()

const isDev = process.dev

const errToShow = computed(() => {
  const is404 =
    props.error?.statusCode === 404 || props.error.message?.includes('404')

  if (is404) {
    return {
      title: 'Page Not Found',
      description: "We couldn't find the page you are looking for."
    }
  } else if (isDev) {
    return {
      title: props.error?.statusMessage,
      description: props.error.message
    }
  }

  return {
    title: 'Oops! Something went wrong.',
    description: "We are working on it and we'll get it fixed as soon as we can"
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout name="blank">
    <div class="misc-wrapper">
      <ErrorHeader
        :status-code="props.error.statusCode"
        :title="errToShow.title"
        :description="errToShow.description"
      />

      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="isDev"
        style="max-inline-size: 80dvw; overflow-x: scroll"
        v-html="error.stack"
      />
      <!-- eslint-enable -->

      <!-- Image -->
      <div class="misc-avatar w-100 text-center">
        <v-img
          :src="misc404"
          alt="Coming Soon"
          :max-width="800"
          class="mx-auto"
        />
        <v-btn class="mt-10" @click="handleError"> Back to Home </v-btn>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
@use '@core/scss/pages/misc.scss';

.misc-footer-tree {
  inline-size: 15.625rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 0.375rem;
}
</style>
