<template>
  <v-card
    @click="navigateTo(`/products/${product.slug}`)"
    v-bind="props"
    :loading="productStore.loading"
    :width="
      !cartProduct && !favoriteCard
        ? maxWidthUndefined
          ? width > 756
            ? 200
            : undefined
          : 200
        : undefined
    "
    :class="{ 'ma-3': !cartProduct && !favoriteCard }"
  >
    <v-row no-gutters>
      <v-col :cols="cartProduct || favoriteCard ? 4 : 12">
        <v-img
          class="relative"
          :height="cartProduct ? 190 : favoriteCard ? 180 : 140"
          :lazy-src="no_img"
          :cover="!product.image"
          :src="
            product.image ? `http://127.0.0.1:8000${product.image}` : no_img
          "
        >
          <div class="absolute mt-3 ms-2" v-if="product.is_offer">
            <span
              class="pa-2 bg-error text-body-2 rounded-l-1 relative offer-tag"
            >
              {{ product.offer + '% ' + $t('off') }}
              <div class="dot"></div>
            </span>
          </div>
          <div
            class="pa-1 rounded-full bg-white w-fit float-end ma-2 border-md border-secondary"
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
            <div>
              <v-btn
                :disabled="
                    cart?.find((p:any) => p.id == product.id) != null || (product.is_quantity && product.quantity == 0) == 1
                  "
                :loading="loading"
                icon="ri-shopping-cart-fill"
                variant="text"
                color="secondary"
                @click.stop="addProductToCart"
                v-if="!cartProduct"
              >
              </v-btn>
            </div>
          </div>
        </v-img>
      </v-col>

      <v-col :cols="cartProduct || favoriteCard ? 8 : 12">
        <v-card-title>{{ product.commercial_name }}</v-card-title>
        <v-card-subtitle>
          <v-chip
            class="my-2"
            size="x-small"
            v-for="c in product.category_products.slice(0, 2)"
          >
            {{ c.category.name }}
          </v-chip>
        </v-card-subtitle>
        <v-card-text>
          <div
            style="
              overflow: hidden;
              inline-size: 180px;
              text-overflow: ellipsis;
            "
          >
            <strong class="text-body-1">
              {{
                Math.ceil(
                  product.price -
                    product.price * (product.is_offer ? product.offer / 100 : 0)
                )
              }}
              {{ $t('sp') }}</strong
            >

            <span
              v-if="
                product.is_offer &&
                !(product.is_quantity && product.quantity == 0)
              "
              class="text-decoration-line-through text-body-2 ms-2"
            >
              {{ product.price }} {{ $t('sp') }}
            </span>
          </div>

          <div v-if="cartProduct && !favoriteCard">
            <div class="d-flex items-center space-x-4 mt-4">
              <v-btn
                width="40"
                elevation="0"
                variant="outlined"
                color="secondary"
                @click.stop="
                  cart.splice(
                    cart.findIndex((e: any) => e.id == product.id),
                    1
                  )
                "
                ><v-icon>ri-delete-bin-5-line</v-icon></v-btn
              >
              <v-btn
                width="40"
                elevation="0"
                variant="outlined"
                color="secondary"
                @click.stop="
                    () => {
                      if(cart?.find((c: any) => (c.id == product.id))?.quantity > 1)
                      cart.find((c: any) => (c.id == product.id)).quantity--
                    }
                  "
                >-</v-btn
              >
              <span>{{
                cart?.find((c: any) => c.id == product.id)?.quantity
              }}</span>
              <v-btn
                width="40"
                elevation="0"
                variant="outlined"
                color="secondary"
                @click.stop.self="
            () => {
                if(product.is_quantity) if(cart?.find((c: any) => (c.id == product.id))?.quantity == product.quantity || product.quantity == 0) return
                cart.find((c: any) => (c.id == product.id)).quantity++
              }
            "
                >+</v-btn
              >
            </div>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import type { Product } from '@/types'
import no_img from '@images/no-img.jpeg'
const cart: any = useCookie('cart')
const productStore = useProductStore()
const favoriteStore = useFavoriteStore()
const token = useCookie('token')
const { width } = useWindowSize()

const loading = ref(false)
const favoriteLoading = ref(false)

const props = defineProps<{
  maxWidthUndefined?: boolean
  cartProduct?: boolean
  productValue?: Product
  favoriteCard?: boolean
  id?: number
}>()

const product = ref(
  !props.id
    ? props.productValue
    : await productStore.getProductById(props.id as any)
)

const isInFavorite = computed(() => {
  return (
    favoriteStore.favorites.find(f => f.product_id === product.value.id) !==
    undefined
  )
})

const favoriteDetails = computed(() => {
  return favoriteStore.favorites.find(f => f.product_id == product.value.id)
})

const addProductToCart = () => {
  try {
    if (!cart.value) {
      cart.value = []
    }
    cart.value.push({
      id: props.id ?? props.productValue?.id,
      quantity: 1
    })
    showSuccessToaster('Added To cart successfully')
  } catch (e: any) {
    showErrorToaster('Try again later')
  }
}
</script>
