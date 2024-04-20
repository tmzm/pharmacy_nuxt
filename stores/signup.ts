export const useSignupStore = defineStore('signup', () => {
  const avatarIndex = ref()
  const name = ref('')
  const number = ref()
  const password = ref()
  const loading = ref()
  const router = useRouter()

  const signup = async () => {
    loading.value = true

    try {
      const res = await api('/users/create', {
        method: 'post',
        body: {
          phone_number: number.value,
          password: password.value,
          name: name.value,
          role: 'user'
        }
      })

      const cookieToken = useCookie('token')

      cookieToken.value = res.token
    } catch (e: any) {
      loading.value = false
    }

    loading.value = false

    router.push('/')
  }

  return {
    avatarIndex,
    signup,
    name,
    number,
    loading,
    password
  }
})
