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
      <VForm>
        <v-row>
          <!-- Name -->
          <v-col cols="12">
            <VTextField
              v-model="name"
              :label="$t('name')"
              placeholder="Johndoe"
              :counter="9"
              required
            />
          </v-col>
          <!-- PhuneNumber -->
          <v-col cols="12">
            <VTextField
              v-model="number"
              :label="$t('phone')"
              placeholder="xxxxxxxxx"
              :counter="9"
              required
            />
          </v-col>

          <!-- password -->
          <v-col cols="12">
            <VTextField
              v-model="password"
              :label="$t('password')"
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
              {{ $t('register') }}
            </v-btn>
          </v-col>

          <!-- login instead -->
          <v-col cols="12" class="text-center text-base">
            <span>{{ $t('have-account') }}</span>
            <NuxtLink class="text-primary ms-2" to="login">
              {{ $t('log-in-instead') }}
            </NuxtLink>
          </v-col>
        </v-row>
      </VForm>
    </v-card-text>
  </div>
</template>
