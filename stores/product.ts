import type { Product } from '@/types'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>()
  const quantityShow = ref()
  const fileInput = ref()
  const categoryStore = useCategoryStore()
  const imageFileInput = ref<
    { name: string; size: number; type: string; lastModified: number }[]
  >([])

  const product = ref<Product>({
    id: 0,
    created_at: new Date(),
    updated_at: new Date(),
    scientific_name: '',
    commercial_name: '',
    company_name: '',
    price: 0,
    quantity: 0,
    is_quantity: false,
    image: '',
    expiration: new Date(),
    description: '',
    category_products: []
  })

  const loadingImport = ref()
  const loading = ref()
  const router = useRouter()

  const { selectedCategories } = storeToRefs(categoryStore)

  const create = async () => {
    loading.value = true

    try {
      const formData = appendNewProductData()

      await api('/products/create', {
        method: 'post',
        body: formData
      })
    } catch (e: any) {
      const toasterStore = useToasterStore()
      toasterStore.showErrorToaster(e.message)
      loading.value = false
    }

    selectedCategories.value = []

    loading.value = false

    router.push('/products/list')
  }

  const edit = async () => {
    loading.value = true
    const id = product.value.id

    try {
      const formData = appendNewProductData()

      await api(`/products/${id}/update`, {
        method: 'post',
        body: formData
      })
    } catch (e: any) {
      const toasterStore = useToasterStore()
      toasterStore.showErrorToaster(e.message)
      loading.value = false
    }

    selectedCategories.value = []

    loading.value = false

    router.push(`/products/${id}`)
  }

  const getAllProducts = async () => {
    loading.value = true

    const res = await api('/products')

    products.value = res.data

    loading.value = false
  }

  const getProduct = async (id: number) => {
    try {
      const res = await api(`/products/${id}`)
      product.value = res.data
      return res.data
    } catch (e) {
      console.log(e)
      product.value = {} as Product
    }
  }

  const importProducts = async () => {
    loadingImport.value = true
    const formData = new FormData()

    formData.append('excel', fileInput.value[0])

    await api('/products/import', {
      method: 'post',
      body: formData
    })

    loadingImport.value = false
  }

  const deleteProduct = async (id: number) => {
    loading.value = true

    await api(`/products/${id}/delete`, {
      method: 'delete'
    })

    loading.value = false
  }

  return {
    deleteProduct,
    getProduct,
    imageFileInput,
    fileInput,
    importProducts,
    quantityShow,
    products,
    getAllProducts,
    create,
    edit,
    loading,
    loadingImport,
    product
  }
})
