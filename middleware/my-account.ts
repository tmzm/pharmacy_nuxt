export default defineNuxtRouteMiddleware((to, from) => {
  const token: any = useCookie('token')

  if (!token.value) return navigateTo('/auth/login')
})
