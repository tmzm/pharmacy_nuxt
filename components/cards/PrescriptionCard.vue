<script lang="ts" setup>
import type { Prescription } from '@/types'

const orderStore = useOrderStore()

const { productIds, loading } = storeToRefs(orderStore)

defineProps<{
  prescription: Prescription
}>()

const fields = ref(1)

const navigationTab = ref('Prescription')
const tabItems = ['Prescription', 'Create Order']

const decrease = () => {
  if (fields.value > 1) fields.value--
  productIds.value.splice(fields.value, 1)
}

const increase = () => {
  fields.value++
  productIds.value.push({})
}
</script>

<template>
  <v-card>
    <VTabs v-model="navigationTab" align-tabs="center">
      <VTab v-for="item in tabItems" :key="item" :value="item">
        {{ item }}
      </VTab>
    </VTabs>

    <!-- tabs content -->
    <VWindow v-model="navigationTab">
      <VWindowItem value="Prescription">
        <v-img :src="`http://127.0.0.1:8000${prescription.image}`">
          <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
            <template v-slot:append>
              <v-menu :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <v-btn icon="ri-equalizer-line" v-bind="props"></v-btn>
                </template>

                <v-list>
                  <v-list-item
                    ><v-icon>ri-delete-bin-2-line</v-icon> delete
                  </v-list-item>

                  <v-list-item
                    ><v-icon>ri-edit-2-fill</v-icon> edit
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-toolbar>
        </v-img>

        <v-card-item
          :prepend-avatar="prescription.user.avatar"
          :title="prescription.user.name"
        />

        <v-card-text>
          {{ prescription.description }}
        </v-card-text>
      </VWindowItem>

      <VWindowItem value="Create Order">
        <form class="ma-4" @submit.prevent="orderStore.create()">
          <div class="d-flex ga-4" v-for="i in fields">
            <v-text-field
              type="number"
              class="mb-4"
              label="Product ID"
              prepend-inner-icon=""
              v-model="productIds[i - 1].id"
              required
              :rules="[v => !!v || 'product id is required']"
            >
              <template #prepend-inner>
                <v-icon> ri-hashtag </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              type="number"
              class="mb-4"
              label="quantity"
              v-model="productIds[i - 1].quantity"
              required
              :rules="[v => !!v || 'quantity is required']"
            />
          </div>
          <div class="d-flex ga-4">
            <v-btn @click="increase()" icon><v-icon>ri-add-line</v-icon></v-btn>
            <v-btn @click="decrease()" icon
              ><v-icon>ri-subtract-line</v-icon></v-btn
            >
            <v-btn type="submit" variant="outlined" :loading="loading"
              >Create Order</v-btn
            >
          </div>
        </form>
      </VWindowItem>
    </VWindow>
  </v-card>
</template>
