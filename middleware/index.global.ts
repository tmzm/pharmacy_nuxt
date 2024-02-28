export default defineNuxtRouteMiddleware((to, from) => {
  const user: any = useCookie('user')

  if (!user.value && !to.path.includes('auth')) {
    return navigateTo('/auth/login')
  }

  if (user.value && to.path.includes('auth')) {
    return navigateTo('/')
  }
})
