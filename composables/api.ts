export const api = function (url: string, options: object = {}): any {
  const runtimeConfig = useRuntimeConfig()
  const cookieToken = useCookie('token')

  return $fetch(url, {
    baseURL: runtimeConfig.public.apiBaseUrl,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cookieToken.value}`
    },
    ...options
  }).catch((error: any) => {
    const toasterStore = useToasterStore()

    if (error.status !== 200) {
      toasterStore.showErrorToaster(error.data.message)
    }

    throw error
  })
}
