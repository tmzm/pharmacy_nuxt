import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const loading = ref(false)

  const router = useRouter()
  const users = ref<User[]>([])
  const user = ref<User>({} as User)

  const login = async (phone_number: string, password: string) => {
    loading.value = true

    try {
      const res = await api('/users/store', {
        method: 'post',
        body: {
          phone_number: phone_number,
          password: password
        }
      })

      const cookieToken = useCookie('token')

      cookieToken.value = res.token

      showSuccessToaster('Login successfully')

      router.push('/')
    } catch (e: any) {
      loading.value = false
    }
  }

  const logout = async () => {
    await api('/users/destroy')

    const cookieToken = useCookie('token')

    cookieToken.value = null

    router.push('/auth/login')
  }

  const list = async () => {
    const res = await api('/users')

    users.value = res.data.filter((e: any) => e.id !== user.value?.id)
  }

  const getUserDetails = async () => {
    const res = await api(`users/show`)

    user.value = res.data
  }

  const editFCMToken = async (fcm_token: string) => {
    await api('/users/fcm_token_edit', {
      method: 'post',
      body: {
        fcm_token
      }
    })
  }

  return {
    getUserDetails,
    editFCMToken,
    user,
    list,
    login,
    logout,
    loading,
    users
  }
})
