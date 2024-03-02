<script setup lang="ts">
const signupStore = useSignupStore()

definePageMeta({ layout: 'blank' })

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
  <div class="auth-wrapper d-flex align-center justify-center">
    <v-stepper alt-labels class="auth-card mt-4" v-model="step">
      <v-stepper-header class="d-none">
        <v-stepper-item flat title="Enter important informations" :value="1" />

        <v-divider></v-divider>

        <v-stepper-item title="Select Avatar" :value="2" />

        <v-divider></v-divider>

        <v-stepper-item title="Interview Process" :value="3" />
      </v-stepper-header>

      <v-stepper-window v-model="step">
        <v-stepper-window-item :value="1">
          <v-card max-width="448" flat>
            <SignUpForm />
          </v-card>
        </v-stepper-window-item>

        <v-stepper-window-item :value="2">
          <v-card max-width="448" flat>
            <SelectAvatar />
          </v-card>
        </v-stepper-window-item>

        <v-stepper-window-item :value="3">
          <v-card width="448" flat>
            <v-btn
              block
              type="submit"
              @click="signupStore.signup"
              :loading="signupStore.loading"
            >
              Sign Up
            </v-btn>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>

      <v-stepper-actions @click:next="next" @click:prev="previous" />
    </v-stepper>
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>
