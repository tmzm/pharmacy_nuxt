export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const favoriteStore = useFavoriteStore()
  const notificationStore = useNotificationStore()

  const token: any = useCookie('token')

  if (
    !token.value &&
    (to.path.includes('admin') || to.path.includes('favorites'))
  ) {
    return navigateTo('/')
  }

  if (token.value) {
    try {
      await useAsyncData(() => authStore.getUserDetails())
      await useAsyncData(() => favoriteStore.listAllFavorites())
      await useAsyncData(() => notificationStore.listAllNotification())
      // console.log('try')
    } catch (e) {
      // console.log('catch')
      showErrorToaster('Something went wrong!')
    }
    console.log('end')

    if (to.path.includes('auth')) {
      // console.log("to.path.includes('auth')")
      return navigateTo('/')
    }

    // console.log(authStore.user)

    if (authStore.user?.role != 'admin' && to.path.includes('admin')) {
      // console.log(
      //   "authStore.user?.role != 'admin' && to.path.includes('admin')"
      // )
      return navigateTo('/')
    }

    if (authStore.user?.role != 'user' && !to.path.includes('admin')) {
      // console.log(
      //   "authStore.user?.role != 'user' && !to.path.includes('admin')"
      // )
      return navigateTo('/admin')
    }
  }
  return true
})
