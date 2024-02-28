<script lang="ts" setup>
const prescriptionStore = usePrescriptionStore()

const { prescriptions } = storeToRefs(prescriptionStore)

const { pending } = useAsyncData(() => prescriptionStore.getAllPrescriptions())
</script>

<template>
  <v-row>
    <v-col md="6" cols="12" v-for="prescription in prescriptions">
      <PrescriptionCard
        :prescription="prescription"
        v-if="!prescription.order"
      />
    </v-col>
  </v-row>
</template>
