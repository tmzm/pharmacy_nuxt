export default defineNuxtRouteMiddleware((to, from) => {
  const cart = useCookie('cart')
  const token: any = useCookie('token')

  if (!token.value) {
    showErrorToaster('Please Login first')
    return navigateTo('/auth/login')
  }

  if (!cart.value || cart?.value?.length == 0) {
    showErrorToaster('Please fill your cart first')
    return navigateTo(from.fullPath ?? '/')
  }
})
