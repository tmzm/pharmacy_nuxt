import type { Order, Product } from '@/types'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>()
  const fields = ref(1)
  const productsImages = ref<Product[]>([])

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
    console.log('store')
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
    productIds,
    fields,
    productsImages
  }
})
