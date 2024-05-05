<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card>
        <v-img
          height="400"
          :src="
            product.image ? `http://127.0.0.1:8000${product.image}` : no_img
          "
        >
          <div class="absolute mt-3 ms-2" v-if="product.is_offer">
            <span
              class="pa-2 bg-error text-body-2 rounded-s-1 relative offer-tag"
            >
              {{ product.offer + '% ' + $t('off') }}
              <div class="dot"></div>
            </span>
          </div>
          <div
            class="pa-1 rounded-full bg-white w-fit ma-2 border-md border-secondary"
            :class="{
              'float-left': $i18n.locale == 'ar',
              'float-right': $i18n.locale !== 'ar'
            }"
          >
            <div>
              <v-btn
                v-if="token"
                :loading="favoriteLoading"
                :icon="isInFavorite ? 'ri-heart-fill' : 'ri-heart-line'"
                color="secondary"
                @click.stop="
                () => {
                  favoriteLoading = true
                  !isInFavorite
                    ? favoriteStore.addToFavorite(product.id)
                    : favoriteStore.removeFromFavorites(favoriteDetails?.id as any)
                  favoriteStore.listAllFavorites()
                  favoriteLoading = false
                }
              "
                variant="text"
              />
            </div>
          </div>
        </v-img>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>
          {{ product.commercial_name }}
          <div class="text-body-1">
            {{ product.scientific_name }}
          </div>
        </v-card-title>
        <v-card-text>
          <div>
            <v-chip
              variant="outlined"
              color="secondary"
              class="me-2"
              v-for="c in product.category_products"
              >{{ c.category.name }}</v-chip
            >
          </div>
          <div class="my-4">
            <strong>
              {{
                Math.ceil(
                  product.price -
                    product.price * (product.is_offer ? product.offer / 100 : 0)
                )
              }}
              {{ $t('sp') }}</strong
            >
            <span
              v-if="product.is_offer"
              class="text-decoration-line-through text-body-1 ms-2"
            >
              {{ product.price }} {{ $t('sp') }}
            </span>
          </div>

          <div class="my-4">
            {{ $t('company') }}:
            <span class="text-primary">{{ product.company_name }}</span>
          </div>

          <div class="my-4">
            <div v-if="!product.is_quantity">
              <span class="text-success"
                ><v-icon>{{ 'ri-check-line' }}</v-icon>
                {{ $t('in-stock') }}</span
              >
              - {{ $t('order-now') }}
            </div>
            <div v-else-if="product.is_quantity && product.quantity > 0">
              <span class="text-info"
                ><v-icon>{{ 'ri-information-line' }}</v-icon>
                {{ $tc('in-stock-with-only') }} {{ product.quantity }}</span
              >
              - {{ $t('order-now') }}
            </div>
            <div v-else>
              <span class="text-error"
                ><v-icon>{{ 'ri-error-warning-line' }}</v-icon>
                {{ $t('out-stock') }}</span
              >
            </div>
          </div>

          <div class="d-flex items-center space-x-4">
            <v-btn
              :disabled="
                (product.is_quantity && product.quantity == 0) || isInCart
              "
              elevation="0"
              variant="outlined"
              color="secondary"
              @click="
                () => {
                  if (cartCount > 1) cartCount--
                }
              "
              >-</v-btn
            >
            <span>{{ cartCount }}</span>
            <v-btn
              :disabled="
                (product.is_quantity && product.quantity == 0) || isInCart
              "
              elevation="0"
              variant="outlined"
              color="secondary"
              @click="
                () => {
                  if (product.is_quantity && cartCount >= product.quantity)
                    return
                  cartCount++
                }
              "
              >+</v-btn
            >
            <v-btn
              :disabled="isInCart"
              elevation="0"
              color="secondary"
              @click="addProductToCart"
            >
              {{
                $t(
                  product.is_quantity && product.quantity == 0
                    ? 'out-stock'
                    : cart?.find((p: any) => p.id == product.id) != null
                    ? 'added-to-cart'
                    : 'add-to-cart'
                )
              }}
            </v-btn>
            <v-btn
              v-if="cart?.find((p: any) => p.id == product.id) != undefined"
              elevation="0"
              variant="outlined"
              color="secondary"
              prepend-icon="ri-delete-bin-5-line"
              @click="
                cart.splice(
                  cart.findIndex((e: any) => e.id == product.id),
                  1
                )
              "
              ><span class="d-none d-md-block">{{
                $t('remove-from-cart')
              }}</span></v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-card v-if="product.description" class="mt-8" :title="$t('details') + ':'">
    <v-card-text>
      <div class="mb-2 desc" v-html="product.description"></div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import no_img from '@/assets/images/no-img.jpeg'

const productStore = useProductStore()
const route = useRoute()
const cart: any = useCookie('cart')
const favoriteLoading = ref(false)
const favoriteStore = useFavoriteStore()
const token = useCookie('token')

const { product } = storeToRefs(productStore)

const isInFavorite = computed(() => {
  return (
    favoriteStore.favorites.find(f => f.product_id === product.value.id) !==
    undefined
  )
})

const favoriteDetails = computed(() => {
  return favoriteStore.favorites.find(f => f.product_id === product.value.id)
})

const cartCount = ref(1)

const slug = computed(() => {
  return (route.params as any).slug
})

const isInCart = computed(() => {
  return (
    cart.value?.find((p: any) => p.id == product.value.id) != undefined ||
    (product.value.is_quantity && product.value.quantity == 0)
  )
})

if (slug.value as any) {
  await useAsyncData(() => productStore.getProduct(slug.value))
}

const addProductToCart = () => {
  try {
    if (!cart.value) {
      cart.value = []
    }
    cart.value.push({
      id: product.value.id,
      quantity: cartCount
    })
    showSuccessToaster('Added To cart successfully')
  } catch (e: any) {
    showErrorToaster('Try again later')
  }
}

useSeoMeta({
  title: product.value.meta_title,
  ogTitle: product.value.meta_title,
  description: product.value.meta_description,
  ogDescription: product.value.meta_description
})

useHead({
  titleTemplate: { textContent: product.value.meta_title }
})

definePageMeta({
  layout: 'user-layout'
})
</script>
