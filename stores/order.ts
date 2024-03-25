import type { Order, Product } from '@/types'
import dayjs from 'dayjs'

export const useOrderStore = defineStore('order', () => {
  const cart = useCookie('cart')
  const orders = ref<Order[]>()
  const order = ref<Order>({} as Order)
  const fields = ref(1)
  const isTime = ref(false)
  const productsImages = ref<Product[]>([])
  const locationStore = useLocationStore()

  const productIds = ref<
    {
      id?: number
      quantity?: number
    }[]
  >([
    {
      id: undefined,
      quantity: undefined
    }
  ])

  const loading = ref()

  const create = async (user_id: number, prescription_id: number) => {
    loading.value = true

    try {
      const res = await api('/orders/create', {
        method: 'post',
        body: {
          is_prescription: true,
          accepted_by_user: false,
          user_id: user_id,
          products: productIds.value
        }
      })

      await api(`/prescriptions/${prescription_id}/orders/${res.data.id}`)
    } catch (e) {
      console.log(e)
      loading.value = false
    }

    loading.value = false
  }

  const createByCart = async () => {
    loading.value = true

    try {
      await api('/orders/create', {
        method: 'post',
        body: {
          location_id: locationStore.selectedLocation.id,
          time: isTime.value
            ? dayjs(order.value?.time).format('YYYY-MM-DD HH:mm:ss')
            : undefined,
          products: cart.value
        }
      })
    } catch (e) {
      console.log(e)
      loading.value = false
    }

    loading.value = false
    navigateTo('/shopping-cart')

    cart.value = null
  }

  const edit = async () => {}

  const getAllOrders = async () => {
    try {
      const res = await api('/orders')
      orders.value = res.data
    } catch (e: any) {
      console.log(e)
    }
  }

  const getOrder = async (id: number) => {}

  const deleteOrder = async (id: number) => {}

  return {
    createByCart,
    deleteOrder,
    getOrder,
    orders,
    order,
    getAllOrders,
    create,
    edit,
    loading,
    productIds,
    fields,
    cart,
    isTime,
    productsImages
  }
})
