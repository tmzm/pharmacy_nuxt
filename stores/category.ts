import type { Category } from '@/types'

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref<Category[]>([
    {
      id: 0,
      created_at: new Date(),
      updated_at: new Date(),
      name: ''
    }
  ])

  const name = ref()

  const newName = ref()

  const dialogDelete = ref(false)

  const deleteId = ref()

  const dialogEdit = ref(false)

  const editId = ref()

  const selectedCategories = ref<number[]>([])

  const loading = ref(false)

  const getAllCategories = async () => {
    const res = await api('/categories')

    categories.value = res.data
  }

  const deleteCategory = async (id: number) => {
    loading.value = true
    await api(`/categories/${id}/delete`, {
      method: 'delete'
    })
    loading.value = false
  }

  const createCategory = async () => {
    loading.value = true
    try {
      await api(`/categories/create`, {
        method: 'post',
        body: {
          name: name.value
        }
      })
    } catch (e) {}

    loading.value = false
  }

  const editCategory = async (id: number) => {
    loading.value = true
    try {
      await api(`/categories/${id}/update`, {
        method: 'post',
        body: {
          name: newName.value
        }
      })
    } catch (e) {}

    loading.value = false
  }

  return {
    dialogDelete,
    dialogEdit,
    deleteId,
    editId,
    loading,
    name,
    newName,
    categories,
    getAllCategories,
    selectedCategories,
    editCategory,
    deleteCategory,
    createCategory
  }
})
