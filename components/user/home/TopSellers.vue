<template>
  <div class="my-24">
    <BaseHeadingCard
      :item="{
        keyword: home ? $t('our-products') : undefined,
        title: home ? $t('our-products-title') : $t('top-sellers'),
        text: home ? $t('our-products-text') : undefined,
        link: {
          title: $t('view-products'),
          icon: '',
          to: '/products'
        }
      }"
    >
      <v-slide-group
        class="my-8"
        v-model="model"
        selected-class="bg-primary"
        show-arrows
      >
        <v-slide-group-item
          v-for="product in productStore.products"
          :key="product.id"
        >
          <ProductCard :product-value="product" />
        </v-slide-group-item>
      </v-slide-group>
    </BaseHeadingCard>
  </div>
</template>

<script lang="ts" setup>
const model = ref()
const productStore = useProductStore()

defineProps<{
  home?: boolean
}>()

const { pending } = await useAsyncData(() =>
  productStore.getTopProductSellers()
)
</script>

<!-- <style>

</style> -->
