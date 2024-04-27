<script lang="ts" setup>
const prescriptionStore = usePrescriptionStore()

const { prescriptions } = storeToRefs(prescriptionStore)

const { pending } = await useAsyncData(() =>
  prescriptionStore.getAllPrescriptions()
)
</script>

<template>
  <v-skeleton type="card-avatar, actions" :loading="pending">
    <v-row v-if="prescriptions?.filter(p => !p.order_id)?.length as any > 0">
      <v-col md="6" cols="12" v-for="prescription in prescriptions">
        <PrescriptionCard
          :prescription="prescription"
          v-if="!prescription.order"
        />
      </v-col>
    </v-row>
    <div v-else>no prescriptions yet</div>
  </v-skeleton>
</template>
