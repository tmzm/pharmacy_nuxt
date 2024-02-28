import type { Order } from '@/types'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>()

  const productIds = ref<
    {
      id?: number
      quantity?: number
    }[]
  >([
    {
      id: 0,
      quantity: 0
    }
  ])

  const loading = ref()

  const create = async () => {
    loading.value = true

    try {
      await api('/orders/create', {
        body: {
          products: productIds
        }
      })
    } catch (e) {
      loading.value = false
    }

    loading.value = false
  }

  const edit = async () => {}

  const getAllOrders = async () => {
    const res = await api('orders')

    orders.value = res.data
  }

  const getOrder = async (id: number) => {}

  const deleteOrder = async (id: number) => {}

  return {
    deleteOrder,
    getOrder,
    orders,
    getAllOrders,
    create,
    edit,
    loading,
    productIds
  }
})
