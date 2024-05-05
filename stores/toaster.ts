import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
import { h } from 'vue'

export const useToasterStore = defineStore('toaster', () => {
  const isRtl = computed(() => {
    return useNuxtApp().$i18n.locale == 'ar'
  })

  const showSuccessToaster = (msg: string) => {
    notification.open({
      message: 'Action Success',
      description: msg,
      icon: () => h(CheckCircleFilled, { style: 'color: #1e6f5c' }),
      style: {
        direction: isRtl.value ? 'rtl' : 'ltr'
      }
    })
  }

  const showErrorToaster = (msg: string) => {
    notification.open({
      message: 'Error!',
      description: msg,
      icon: () => h(CloseCircleFilled, { style: 'color: #FF4C51' }),
      style: {
        direction: isRtl.value ? 'rtl' : 'ltr'
      }
    })
  }

  return {
    showErrorToaster,
    showSuccessToaster
  }
})
