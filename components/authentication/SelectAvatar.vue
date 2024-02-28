<script setup lang="ts">
const signupStore = useSignupStore()
const { avatarIndex } = storeToRefs(signupStore)
</script>

<template>
  <v-card-item class="justify-center">
    <v-card-title class="font-weight-semibold text-2xl text-uppercase">
      Select your avatar
    </v-card-title>
  </v-card-item>

  <v-item-group v-model="avatarIndex" mandatory>
    <v-row>
      <v-col v-for="(item, i) in avatars" :key="i" md="3">
        <v-item v-slot="{ isSelected, selectedClass, toggle }">
          <div @click="toggle">
            <v-avatar
              :variant="isSelected ? 'tonal' : 'flat'"
              size="80"
              :class="{ selectedClass }"
              class="cursor-pointer"
            >
              <v-img :src="item.avatar"> </v-img>
            </v-avatar>
          </div>
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>
