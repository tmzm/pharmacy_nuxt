<script setup lang="ts">
const authStore = useMyAuthStore()

const user: any = useCookie('user')
</script>

<template>
  <VAvatar class="cursor-pointer" color="primary" variant="tonal">
    <v-img :src="user?.avatar" />

    <!-- SECTION Menu -->
    <VMenu activator="parent" width="230" location="bottom end" offset="14px">
      <v-list>
        <!-- User Avatar & Name -->
        <v-list-item>
          <template #prepend>
            <v-list-itemAction start>
              <VAvatar color="primary" variant="tonal">
                <v-img :src="user?.avatar" />
              </VAvatar>
            </v-list-itemAction>
          </template>

          <v-list-item-title class="font-weight-semibold">
            {{ user?.name }}
          </v-list-item-title>
          <v-list-item-subtitle>Admin</v-list-item-subtitle>
        </v-list-item>
        <VDivider class="my-2" />

        <!-- Profile -->
        <v-list-item link>
          <template #prepend>
            <v-icon class="me-2" icon="ri-user-line" size="22" />
          </template>

          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>

        <!-- Settings -->
        <v-list-item link>
          <template #prepend>
            <v-icon class="me-2" icon="ri-settings-4-line" size="22" />
          </template>

          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>

        <VDivider class="my-2" />

        <!-- Logout -->
        <v-list-item>
          <template #prepend>
            <v-icon class="me-2" icon="ri-logout-box-r-line" size="22" />
          </template>

          <v-list-item-title
            @click.close="authStore.logout()"
            style="cursor: pointer"
            >Logout</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </VMenu>
    <!-- SECTION -->
  </VAvatar>
</template>
