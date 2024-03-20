export const api = function (url: string, options: object = {}): any {
  const runtimeConfig = useRuntimeConfig()
  const cookieToken = useCookie('token')

  const res = $fetch(url, {
    baseURL: runtimeConfig.public.apiBaseUrl,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cookieToken.value}`
    },
    ...options
  }).catch((error: any) => {
    const toasterStore = useToasterStore()

    console.log(error)

    if (error.status !== 200) {
      toasterStore.showErrorToaster(error.message)
    }

    throw error
  })

  return res
}
