import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import { h } from 'vue'

export const useToasterStore = defineStore('toaster', () => {
  const showSuccessToaster = (msg: string) => {
    notification.open({
      message: msg,
      icon: () => h(CheckCircleFilled, { style: 'color: #108ee9' })
    })
  }

  const showErrorToaster = (msg: string) => {
    notification.open({
      message: msg,
      icon: () => h(CloseCircleFilled, { style: 'color: #FF4C51' })
    })
  }

  return {
    showErrorToaster,
    showSuccessToaster
  }
})
