export default defineNuxtRouteMiddleware((to, from) => {
  const cart = useCookie('cart')
  if (!cart.value || cart?.value?.length == 0) navigateTo(from.fullPath)
})
