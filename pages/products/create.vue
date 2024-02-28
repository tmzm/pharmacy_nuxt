<script setup lang="ts">
const productStore = useProductStore()
const { fileInput, loadingImport } = storeToRefs(productStore)
</script>

<template>
  <v-col cols="12">
    <ProductForm />

    <v-card title="Or Import Excel File" class="mt-8">
      <v-card-text>
        <v-row class="align-center">
          <v-col col="6">
            <v-file-input label="import" accept="excel/*" v-model="fileInput">
              import excel
            </v-file-input></v-col
          >
          <v-col col="6">
            <a href="/example.xlsx">download example sheet</a>
          </v-col>
        </v-row>

        <v-btn
          variant="outlined"
          class="mt-4"
          :loading="loadingImport"
          @click="productStore.importProducts"
          >create products</v-btn
        >
      </v-card-text>
    </v-card>
  </v-col>
</template>
