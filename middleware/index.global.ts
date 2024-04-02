export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useMyAuthStore()

  const token: any = useCookie('token')

  if (!token.value && to.path.includes('admin')) {
    return navigateTo('/')
  }

  if (token.value) {
    try {
      await authStore.getUserDetails()
    } catch (e) {
      showErrorToaster('Something went wrong!')
    }

    if (to.path.includes('auth')) {
      return navigateTo(from.fullPath)
    }

    if (authStore.user?.role != 'admin' && to.path.includes('admin')) {
      return navigateTo('/')
    }

    if (authStore.user?.role != 'user' && !to.path.includes('admin')) {
      return navigateTo('/admin')
    }
  }

  return
})
