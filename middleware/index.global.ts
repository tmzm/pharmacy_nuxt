export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const favoriteStore = useFavoriteStore()

  const token: any = useCookie('token')

  if (!token.value && to.path.includes('admin')) {
    return navigateTo('/')
  }

  if (token.value) {
    try {
      await useAsyncData(() => authStore.getUserDetails())
      await useAsyncData(() => favoriteStore.listAllFavorites())
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
