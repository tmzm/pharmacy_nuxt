export default defineNuxtRouteMiddleware((to, from) => {
  const token: any = useCookie('token')

  if (!token.value && !to.path.includes('auth')) {
    return navigateTo('/auth/login')
  }

  // if (token.value && user.value.role != 'admin' && to.path.includes('admin')) {
  //   return navigateTo('/')
  // }

  // if (token.value && user.value.role != 'user' && !to.path.includes('admin')) {
  //   return navigateTo('/admin')
  // }
})
