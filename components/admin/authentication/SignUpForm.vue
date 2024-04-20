<script setup lang="ts">
// const avatarRaw = ref()

// const authStore = useAuthStore()

const isPasswordVisible = ref(false)

// const initialState = {
//   avatar: null,
//   name: '',
//   password: '',
//   number: '',
//   checkbox: null
// }

// const state: any = reactive({
//   ...initialState
// })

// const rules = {
//   avatar: { required },
//   name: { required },
//   number: { required },
//   password: { required }
// }

// // const v$ = useVuelidate(rules, state)

const signupStore = useSignupStore()
const { name, number, password } = storeToRefs(signupStore)
</script>

<template>
  <div>
    <v-card-text>
      <v-card-title class="text-center mb-4"> Welcome To Moafa </v-card-title>
      <VForm>
        <v-row>
          <!-- Name -->
          <v-col cols="12">
            <VTextField
              v-model="name"
              label="Name"
              placeholder="Johndoe"
              :counter="9"
              required
            />
          </v-col>
          <!-- PhuneNumber -->
          <v-col cols="12">
            <VTextField
              v-model="number"
              label="Phune Number"
              placeholder="xxxxxxxxx"
              :counter="9"
              required
            />
          </v-col>

          <!-- password -->
          <v-col cols="12">
            <VTextField
              v-model="password"
              label="Password"
              placeholder="············"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
              "
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              :counter="8"
              required
            />
          </v-col>

          <v-col>
            <v-btn
              block
              type="submit"
              @click="signupStore.signup()"
              :loading="signupStore.loading"
            >
              Sign Up
            </v-btn>
          </v-col>

          <!-- login instead -->
          <v-col cols="12" class="text-center text-base">
            <span>Already have an account?</span>
            <NuxtLink class="text-primary ms-2" to="login">
              Sign in instead
            </NuxtLink>
          </v-col>
        </v-row>
      </VForm>
    </v-card-text>
  </div>
</template>
