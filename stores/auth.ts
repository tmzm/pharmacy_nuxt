import type { User } from '@/types'

export const useMyAuthStore = defineStore('auth', () => {
  const loading = ref(false)

  const router = useRouter()
  const users = ref<User[]>()

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

      const cookieUser = useCookie('user')
      const cookieToken = useCookie('token')

      cookieUser.value = res.data
      cookieToken.value = res.token
    } catch (e: any) {
      loading.value = false
    }

    router.push('/')
  }

  const logout = async () => {
    await api('/users/destroy')

    const cookieUser = useCookie('user')
    const cookieToken = useCookie('token')

    cookieUser.value = null
    cookieToken.value = null

    router.push('/auth/login')
  }

  const list = async () => {
    const res = await api('/users')

    const cookieUser: any = useCookie('user')

    users.value = res.data.filter((e: any) => e.id !== cookieUser.value?.id)
  }

  const upgradeUser = async (user_id: any) => {
    await api(`users/admin/${user_id}/upgrade`, {
      method: 'post'
    })
  }

  return {
    upgradeUser,
    list,
    login,
    logout,
    loading,
    users
  }
})
