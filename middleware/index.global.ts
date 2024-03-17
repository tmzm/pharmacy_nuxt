export default defineNuxtRouteMiddleware((to, from) => {
  const user: any = useCookie('user')

  if (!user.value && !to.path.includes('auth')) {
    return navigateTo('/auth/login')
  }

  if (user.value && user.value.role != 'admin' && to.path.includes('admin')) {
    return navigateTo('/')
  }

  if (user.value && user.value.role != 'user' && !to.path.includes('admin')) {
    return navigateTo('/admin')
  }
})
