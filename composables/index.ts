import { useToasterStore } from '@/stores/toaster'

export const appendNewProductData = () => {
  const dayjs = useDayjs()

  const productStore = useProductStore()

  const { product, imageFileInput, quantityShow, priceFilter } =
    storeToRefs(productStore)

  const categoryStore = useCategoryStore()
  const { categories, selectedCategories } = storeToRefs(categoryStore)

  const newCategories: any = []

  selectedCategories.value.forEach(index => {
    newCategories.push(categories.value[index as any].id)
  })

  const formData = new FormData()

  if (imageFileInput.value) {
    formData.append('image', imageFileInput.value[0].originFileObj)
  }
  formData.append('commercial_name', product.value.commercial_name)
  formData.append('scientific_name', product.value.scientific_name)
  formData.append('company_name', product.value.company_name)
  formData.append('price', product.value.price.toString())
  formData.append(
    'expiration',
    dayjs(product.value.expiration).format('YYYY/MM/DD')
  )
  for (var i = 0; i < newCategories.length; i++) {
    formData.append('categories[]', newCategories[i])
  }
  formData.append('description', product.value.description)
  formData.append('meta_description', product.value.meta_description)
  formData.append('meta_subtitle', product.value.meta_subtitle)
  formData.append('meta_title', product.value.meta_title)
  formData.append(
    'quantity',
    quantityShow.value === 2 ? product.value.quantity.toString() : '0'
  )
  formData.append('is_quantity', quantityShow.value === 0 ? '0' : '1')
  formData.append('is_offer', product.value.is_offer === false ? '0' : '1')
  formData.append(
    'offer',
    product.value.is_offer ? product.value.offer.toString() : '0'
  )

  return formData
}

export const convertToTitleCase = (input: string): string => {
  return input.replace(/\b\w/g, char => char.toUpperCase())
}

export const convertToTitleCaseWithSpace = (input: string): string => {
  return convertToTitleCase(input.replace(/-/g, ' '))
}

export const showSuccessToaster = (msg: string) => {
  const toasterStore = useToasterStore()
  toasterStore.showSuccessToaster(msg)
}

export const showErrorToaster = (msg: string) => {
  const toasterStore = useToasterStore()
  toasterStore.showErrorToaster(msg)
}
