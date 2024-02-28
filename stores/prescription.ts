import type { Prescription } from '@/types'

export const usePrescriptionStore = defineStore('prescription', () => {
  const prescriptions = ref<Prescription[]>()

  const loading = ref()

  const create = async () => {}

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
    getAllPrescriptions,
    create,
    edit,
    loading
  }
})
