import { useTheme } from 'vuetify/lib/framework.mjs'

export const useThemeStore = defineStore('theme', () => {
  const currentGlobalTheme = useCookie('globalTheme')
  const theme = useTheme()

  theme.global.name.value = currentGlobalTheme.value ?? 'light'

  const changeTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    // console.log(theme.global.name.value)

    currentGlobalTheme.value = theme.global.name.value
  }

  // const { name: themeName, global: globalTheme }: any = useTheme()

  // const {
  //   state: currentThemeName,
  //   next: getNextThemeName,
  //   index: currentThemeIndex
  // } = useCycleList(
  //   themes.map(t => t.name),
  //   { initialValue: themeName }
  // )

  // const changeTheme = () => {
  //   globalTheme.name.value = getNextThemeName()
  //   currentGlobalTheme.value = getNextThemeName()
  // }

  return {
    theme,
    changeTheme
  }
})
