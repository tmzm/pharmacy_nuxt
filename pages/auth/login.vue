<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const authStore = useAuthStore()

const isPasswordVisible = ref(false)

const initialState = {
  password: '',
  number: '',
  checkbox: null
}

const state = reactive({
  ...initialState
})

const rules = {
  number: { required },
  password: { required },
  checkbox: { required }
}

const v$ = useVuelidate(rules, state)

const loginUser = () => {
  authStore.login(state.number, state.password)
}

definePageMeta({ layout: 'user-layout' })
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="d-flex align-center justify-center pa-4">
    <v-card class="auth-card" max-width="448">
      <v-card-title class="text-center my-4">
        Welcome Again! To MOAFA
      </v-card-title>

      <v-card-text>
        <VForm @submit.prevent="loginUser()">
          <v-row>
            <!-- number -->
            <v-col cols="12">
              <VTextField
                v-model="state.number"
                label="phone Number"
                type="text"
                :error-messages="v$.number.$errors.map((e:any) => e.$message)"
                :counter="9"
                required
                @input="v$.number.$touch"
                @blur="v$.number.$touch"
              />
            </v-col>

            <!-- password -->
            <v-col cols="12">
              <VTextField
                v-model="state.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="
                  isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :error-messages="v$.password.$errors.map((e:any) => e.$message)"
                :counter="8"
                required
                @input="v$.password.$touch"
                @blur="v$.password.$touch"
              />

              <!-- remember me checkbox -->
              <div
                class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
              >
                <VCheckbox v-model="state.checkbox" label="Remember me" />

                <a class="ms-2 mb-1" href="javascript:void(0)">
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <v-btn block type="submit" :loading="authStore.loading">
                Login
              </v-btn>
            </v-col>

            <!-- create account -->
            <v-col cols="12" class="text-center text-base">
              <span>New on our platform?</span>
              <NuxtLink class="text-primary ms-2" to="/auth/register">
                Create an account
              </NuxtLink>
            </v-col>
          </v-row>
        </VForm>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>
