import paginationParams from '@/composables/paginationParams'
import type { Product } from '@/types'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>()
  const quantityShow = ref()
  const fileInput = ref()
  const categoryStore = useCategoryStore()
  const { selectedCategories, categories: currentCategories } =
    storeToRefs(categoryStore)
  const search = ref()
  const productsTotalCount = ref(15)
  const paginationOptions = ref({
    groupBy: [],
    itemsPerPage: 10,
    page: 1,
    sortBy: []
  })

  const priceFilter = ref()

  const imageFileInput = ref()

  const product = ref<Product>({
    id: 0,
    created_at: new Date(),
    updated_at: new Date(),
    scientific_name: '',
    commercial_name: '',
    company_name: '',
    price: 0,
    is_offer: false,
    offer: 1,
    quantity: 0,
    is_quantity: false,
    image: '',
    expiration: new Date(),
    description: '',
    category_products: []
  })

  const categories = computed(() => {
    return selectedCategories.value.map(e => {
      return currentCategories.value[e].id
    })
  })

  const loadingImport = ref()
  const loading = ref()
  const router = useRouter()

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

    router.push('/admin/products/list')
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

    router.push(`/admin/products/${id}`)
  }

  const getAllProducts = async () => {
    const res = await api('/products', {
      method: 'post',
      body: {
        price: priceFilter.value,
        categories: categories.value,
        search: search.value ?? undefined,
        ...paginationParams(paginationOptions.value, productsTotalCount.value)
      }
    })

    products.value = res.data
  }

  const getTopProductSellers = async () => {
    const res = await api('/products/top_sellers')

    products.value = res.data
  }

  const getPrice = async (id: number) => {
    try {
      const res = await api(`/products/${id}/price`)
      return res.data
    } catch (e) {
      console.log(e)
      return 0
    }
  }

  const getTotalCount = async () => {
    try {
      const res = await api(`/products_total_count`)
      productsTotalCount.value = res.data
    } catch (e) {
      console.log(e)
      productsTotalCount.value = 15
    }
  }

  const getImage = async (id: number) => {
    try {
      const res = await api(`/products/${id}/image`)
      return res.data
    } catch (e) {
      console.log(e)
      return null
    }
  }

  const getProduct = async (id: number) => {
    if (id) {
      try {
        const res = await api(`/products/${id}`)
        product.value = res.data
        return res.data
      } catch (e) {
        console.log('text', e)
        product.value = {} as Product
        return {} as Product
      }
    } else {
      return {} as Product
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
    getTopProductSellers,
    getPrice,
    getTotalCount,
    getImage,
    create,
    edit,
    loading,
    loadingImport,
    product,
    paginationOptions,
    priceFilter,
    productsTotalCount,
    search
  }
})
