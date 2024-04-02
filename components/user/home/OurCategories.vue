<template>
  <BaseHeadingCard
    :item="{
      keyword: $t('product-categories'),
      title: $t('product-categories-title'),
      text: $t('product-categories-text')
    }"
  />

  <v-row>
    <v-col v-for="(c, index) in categoryStore.categories" cols="6" md="3">
      <v-card class="rounded-xl">
        <v-img
          height="250"
          cover
          class="text-white text-h3 pa-4"
          :lazy-src="no_img"
          src="https://www.asterpharmacy.ae/fileadmin/user_upload/xLifestyleC_01.jpg.pagespeed.ic.kcfjJXXI_j.webp"
        >
          <v-icon>ri-bubble-chart-line</v-icon>
          <div>{{ c.name }}</div>
          <v-btn
            @click="filterProductsByCategory(index)"
            size="small"
            color="white"
            variant="outlined"
            append-icon="ri-arrow-right-line"
          >
            {{ $t('view-products') }}
          </v-btn>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import no_img from '@images/no-img.jpeg'
const categoryStore = useCategoryStore()

const filterProductsByCategory = (index: number) => {
  categoryStore.selectedCategories = [index]
  navigateTo(`/products`)
}
</script>

<!-- <style>

</style> -->
