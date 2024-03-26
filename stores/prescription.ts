import type { Prescription } from '@/types'

export const usePrescriptionStore = defineStore('prescription', () => {
  const prescriptions = ref<Prescription[]>()
  const prescription = ref<Prescription>({} as Prescription)
  const imageFileInput = ref()

  const loading = ref()

  const create = async () => {
    loading.value = true

    const formData = new FormData()

    try {
      formData.append('description', prescription.value.description)
      formData.append('image', imageFileInput.value)

      await api('/prescriptions/create', {
        method: 'post',
        body: formData
      })
    } catch {
      loading.value = false
    }

    loading.value = false
  }

  const edit = async () => {}

  const getAllPrescriptions = async () => {
    const res = await api('prescriptions')

    prescriptions.value = res.data
  }

  const getPrescription = async (id: number) => {}

  const deletePrescription = async (id: number) => {}

  return {
    deletePrescription,
    getPrescription,
    prescriptions,
    imageFileInput,
    getAllPrescriptions,
    prescription,
    create,
    edit,
    loading
  }
})
