export default defineNuxtRouteMiddleware((to, from) => {
  const cart = useCookie('cart')
  const token: any = useCookie('token')

  if (!token.value || cart?.value?.length == 0) return navigateTo('/auth/login')

  if (!cart.value || cart?.value?.length == 0) return navigateTo(from.fullPath)
})
