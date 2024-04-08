import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import { h } from 'vue'

export const useToasterStore = defineStore('toaster', () => {
  const showSuccessToaster = (msg: string) => {
    notification.open({
      message: 'Action Success',
      description: msg,
      icon: () => h(CheckCircleFilled, { style: 'color: #1e6f5c' })
    })
  }

  const showErrorToaster = (msg: string) => {
    notification.open({
      message: 'Error!',
      description: msg,
      icon: () => h(CloseCircleFilled, { style: 'color: #FF4C51' })
    })
  }

  return {
    showErrorToaster,
    showSuccessToaster
  }
})
