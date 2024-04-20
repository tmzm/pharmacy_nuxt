<script lang="ts" setup>
import no_avatar from '@images/avatars/avatar-no.png'

const orderStore = useOrderStore()

const { pending, refresh } = await useAsyncData(() => orderStore.getAllOrders())

const { loading, orders } = storeToRefs(orderStore)

const search = ref()

const dialogDelete = ref(false)

const deleteId = ref()

const deleteModuleAction = (id: number) => {
  dialogDelete.value = true
  deleteId.value = id
}

const deleteOrder = () => {
  dialogDelete.value = false
  orderStore.deleteOrder(deleteId.value)
  refresh()
}
</script>

<template>
  <v-card title="All Orders">
    <delete-modal
      v-model="dialogDelete"
      :loading="loading"
      @close="dialogDelete = false"
      @delete="deleteOrder()"
    />

    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="ri-search-line"
        hide-details
      ></v-text-field>
    </template>

    <VDataTable
      :headers="orderHeaders"
      :search="search"
      :items="orders"
      :loading="pending"
      item-key="id"
      class="text-no-wrap"
    >
      <template #item.id="{ item }">
        <v-btn
          variant="outlined"
          icon
          size="small"
          class="me-2"
          @click="navigateTo(`/products/${item.id}/edit`)"
        >
          <v-icon>ri-pencil-line</v-icon>
        </v-btn>
        <v-btn icon size="small" @click="deleteModuleAction(item.id)">
          <v-icon>ri-delete-bin-2-line</v-icon>
        </v-btn>
      </template>

      <template #item.user_id="{ item }">
        <v-avatar>
          <v-img :src="item.user.avatar ?? no_avatar"></v-img>
        </v-avatar>
      </template>

      <template #item.created_at="{ item }">
        {{ $dayjs(item.created_at).format('YYYY/MM/DD') }}
      </template>

      <template #item.is_prescription="{ item }">
        <v-chip :color="item.is_prescription ? 'primary' : 'secondary'"
          >{{ item.is_prescription ? 'prescription' : 'order' }}
          {{
            item.is_prescription
              ? item.accepted_by_user
                ? ''
                : ': not accepted yet'
              : ''
          }}</v-chip
        >
      </template>

      <template #item.is_time="{ item }">
        <v-chip :color="item.is_time ? 'primary' : 'secondary'">
          {{
            !item.is_time
              ? 'as soon as it ready'
              : 'At: Today ' + $dayjs(item.time).format('hh:mm')
          }}
        </v-chip>
      </template>

      <template #item.updated_at="{ item }">
        {{ $dayjs(item.updated_at).format('YYYY/MM/DD') }}
      </template>

      <template #item.payment_status="{ item }">
        {{ item.payment_status ? 'paid' : 'not paid' }}
      </template>

      <template #item.order_items="{ item }">
        <div class="d-flex ga-3">
          <v-chip v-for="order_item in item.order_items">
            {{ order_item.product.scientific_name }} :
            {{ order_item.quantity }} item
          </v-chip>
        </div>
      </template>
    </VDataTable>
  </v-card>
</template>
