<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :loading="productStore.loading"
      :width="!cartProduct ? 200 : undefined"
      :class="{ 'ma-3': !cartProduct }"
    >
      <v-row no-gutters>
        <v-col :cols="cartProduct ? 4 : 12">
          <v-img
            @click="navigateTo(`/products/${product.slug}`)"
            class="cursor-pointer"
            :height="cartProduct ? undefined : 140"
            cover
            :lazy-src="no_img"
            :src="
              product.image ? `http://127.0.0.1:8000${product.image}` : no_img
            "
          >
            <div class="text-right pa-3" v-if="product.is_offer">
              <span
                class="pa-2 me-2 bg-error text-body-2 rounded-l-1 relative offer-tag"
              >
                {{ product.offer + '% ' + $t('off') }}
                <div class="dot"></div>
              </span>
            </div>
          </v-img>
        </v-col>

        <v-col :cols="cartProduct ? 8 : 12">
          <v-card-text
            class="cursor-pointer"
            @click="navigateTo(`/products/${product.slug}`)"
          >
            <div
              style="
                overflow: hidden;
                block-size: 70px;
                text-overflow: ellipsis;
              "
            >
              {{ product.commercial_name }}
            </div>
            <div>
              <strong class="text-h6">
                {{
                  Math.ceil(
                    product.price -
                      product.price *
                        (product.is_offer ? product.offer / 100 : 0)
                  )
                }}
                {{ $t('sp') }}</strong
              >

              <span
                v-if="
                  product.is_offer &&
                  !(product.is_quantity && product.quantity == 0)
                "
                class="text-decoration-line-through text-body-1 ms-2"
              >
                {{ product.price }} {{ $t('sp') }}
              </span>
            </div>
          </v-card-text>

          <v-card-actions v-if="cartProduct">
            <div class="d-flex items-center space-x-4">
              <v-btn
                width="40"
                elevation="0"
                variant="outlined"
                color="secondary"
                @click="
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
                @click="
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
                @click="
            () => {
                if(product.is_quantity) if(cart?.find((c: any) => (c.id == product.id))?.quantity == product.quantity || product.quantity == 0) return
                cart.find((c: any) => (c.id == product.id)).quantity++
              }
            "
                >+</v-btn
              >
            </div>
          </v-card-actions>
          <v-card-actions v-else>
            <v-btn
              :disabled="
            cart?.find((p:any) => p.id == product.id) != null || (product.is_quantity && product.quantity == 0) == 1
          "
              :loading="loading"
              prepend-icon="ri-shopping-cart-fill"
              variant="flat"
              color="secondary"
              @click="addProductToCart"
            >
              {{
                $t(
                  product.is_quantity && product.quantity == 0
                    ? 'out-of-stock'
                    : cart?.find((p: any) => p.id == product.id) != null
                    ? 'added'
                    : 'add-to-cart'
                )
              }}
            </v-btn>
            <v-btn
              v-if="token"
              :loading="favoriteLoading"
              :icon="isInFavorite ? 'ri-heart-fill' : 'ri-heart-line'"
              color="secondary"
              @click="
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
            >
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script lang="ts" setup>
import type { Product } from '@/types'
import no_img from '@images/no-img.jpeg'
const cart: any = useCookie('cart')
const productStore = useProductStore()
const favoriteStore = useFavoriteStore()
const token = useCookie('token')

const loading = ref(false)
const favoriteLoading = ref(false)

const props = defineProps<{
  cartProduct?: boolean
  productValue?: Product
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
  return favoriteStore.favorites.find(f => f.product_id === product.value.id)
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
