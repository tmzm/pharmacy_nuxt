<script setup lang="ts">
// const avatarRaw = ref()

// const authStore = useMyAuthStore()

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
    <!-- eslint-disable vue/no-v-html -->

    <v-card-item class="justify-center">
      <v-card-title class="font-weight-semibold text-2xl text-uppercase">
        MOAFA
      </v-card-title>
    </v-card-item>

    <v-card-text>
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

          <!-- login instead -->
          <v-col cols="12" class="text-center text-base">
            <span>Already have an account?</span>
            <NuxtLink class="text-primary ms-2" to="login">
              Sign in instead
            </NuxtLink>
          </v-col>

          <!-- auth providers -->
          <v-col cols="12" class="text-center">
            <AuthProvider />
          </v-col>
        </v-row>
      </VForm>
    </v-card-text>
  </div>
</template>
