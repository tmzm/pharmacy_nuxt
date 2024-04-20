<script setup lang="ts">
const headers = [
  { title: 'User', key: 'username' },
  { title: 'Role', key: 'role' }
]

const authStore = useAuthStore()

const { pending, refresh } = await useAsyncData(() => authStore.list())

const { users } = storeToRefs(authStore)
</script>

<template>
  <v-card>
    <div v-if="!pending">
      <VDataTable
        :loading="pending"
        :headers="headers"
        :items="users ?? []"
        item-value="id"
        class="text-no-wrap"
      >
        <!-- User -->
        <template #item.username="{ item }">
          <div class="d-flex align-center gap-x-4">
            <VAvatar size="34" :variant="undefined" :color="undefined">
              <v-img :src="item?.avatar" />
            </VAvatar>

            <div class="d-flex flex-column">
              <h6 class="text-h6 font-weight-medium user-list-name">
                {{ item?.name }}
              </h6>
            </div>
          </div>
        </template>
        <!-- Role -->
        <template #item.role="{ item }">
          <div class="d-flex gap-4">
            <div class="text-capitalize text-high-emphasis">
              {{ item?.role }}
            </div>
          </div>
        </template>

        <template #bottom />
      </VDataTable>
    </div>
  </v-card>
</template>
