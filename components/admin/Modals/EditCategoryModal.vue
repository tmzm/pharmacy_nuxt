<script lang="ts" setup>
const categoryStore = useCategoryStore()

const { newName } = storeToRefs(categoryStore)

defineProps<{
  loading: boolean
  name?: string
}>()
</script>

<template>
  <v-dialog max-width="500px">
    <v-card title="Edit Category">
      <v-container>
        <v-text-field v-model="newName" :label="name" :placeholder="name" />
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="$emit('close')"
          >Cancel</v-btn
        >
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="$emit('delete')"
          :loading="loading"
          >OK</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
