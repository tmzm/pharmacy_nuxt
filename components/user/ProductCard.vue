<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      variant="outlined"
      color="secondary"
      :border="true"
      :width="!cartProduct ? 230 : undefined"
      class="ma-3"
    >
      <v-row>
        <v-col :cols="cartProduct ? 4 : 12">
          <v-img
            height="190"
            cover
            :lazy-src="no_img"
            :src="
              product.image ? `http://127.0.0.1:8000${product.image}` : no_img
            "
          >
            <v-expand-transition>
              <div
                v-if="isHovering"
                class="d-flex text-center items-center justify-center transition-fast-in-fast-out bg-primary v-card--reveal text-h3"
                style="block-size: 100%"
              >
                {{
                  Math.ceil(
                    product.price -
                      product.price *
                        (product.is_offer ? product.offer / 100 : 0)
                  )
                }}
                SP

                <span
                  v-if="
                    product.is_offer &&
                    !(product.is_quantity && product.quantity == 0)
                  "
                  class="text-decoration-line-through text-body-1 ms-2"
                >
                  {{ product.price }} SP
                </span>
                <strong v-if="product.is_quantity && product.quantity == 0"
                  >out of stock</strong
                >
              </div>
            </v-expand-transition>
            <!-- <div class="absolute">
          <v-icon color="primary">ri-star-fill</v-icon> 4.5
        </div> -->
            <div class="text-right pa-3" v-if="product.is_offer">
              <span class="pa-2 bg-error rounded-full text-body-2"
                >{{ product.offer }}% OFF</span
              >
            </div>
          </v-img>
        </v-col>

        <v-col :cols="cartProduct ? 8 : 12">
          <v-card-text>
            <div
              class="d-inline-block text-truncate"
              style="max-inline-size: 200px"
            >
              {{ product.commercial_name }}
            </div>
          </v-card-text>

          <v-card-actions v-if="cartProduct">
            <v-btn
              icon
              color="black"
              @click="
                cart.splice(
                  cart.findIndex((e: any) => e.id == product.id),
                  1
                )
              "
              ><v-icon>ri-delete-bin-5-line</v-icon></v-btn
            >
            <v-btn
              icon
              color="black"
              @click="
              () => {
                if(cart.find((c: any) => (c.id == product.id)).quantity > 1)
                cart.find((c: any) => (c.id == product.id)).quantity--
              }
            "
              ><v-icon>ri-indeterminate-circle-line</v-icon></v-btn
            >
            {{ cart.find((c: any) => c.id == product.id).quantity }}
            <v-btn
              icon
              color="black"
              @click="
            () => {
                if(product.is_quantity) if(cart.find((c: any) => (c.id == product.id)).quantity == product.quantity) return
                cart.find((c: any) => (c.id == product.id)).quantity++
              }
            "
              ><v-icon>ri-add-circle-line</v-icon></v-btn
            >
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
                cart?.find((p: any) => p.id == product.id)
                  ? 'Added to cart'
                  : 'Add to cart'
              }}
            </v-btn>
            <v-btn icon="ri-heart-line" color="secondary" variant="text">
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

const loading = ref(false)

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

const addProductToCart = () => {
  console.log(cart)
  if (!cart.value) {
    cart.value = []
  }
  cart.value.push({
    id: props.id ?? props.productValue?.id,
    quantity: 1
  })
}
</script>
