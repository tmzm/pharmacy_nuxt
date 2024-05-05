<script setup lang="ts">
const signupStore = useSignupStore()

definePageMeta({ layout: 'user-layout' })

const step = ref(1)

const next = () => {
  if (step.value == 2) {
    if (signupStore.avatarIndex == null) {
      return
    }
  }
  step.value++
}

const previous = () => {
  step.value--
}
</script>

<template>
  <div class="d-flex align-center justify-center">
    <v-card class="auth-card" max-width="448"><SignUpForm /></v-card>
  </div>
</template>

<style lang="scss">
@use '@/@core/scss/pages/page-auth.scss';
</style>
