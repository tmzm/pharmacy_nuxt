import { InfoCircleFilled } from '@ant-design/icons-vue'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

export default defineNuxtPlugin(nuxtApp => {
  const authStore = useAuthStore()
  const token = useCookie('token')

  const firebaseConfig = {
    apiKey: 'AIzaSyAmgFZaPrI6L3nM42CrVu1W39zxWDolqEo',
    authDomain: 'even-crossing-400500.firebaseapp.com',
    projectId: 'even-crossing-400500',
    storageBucket: 'even-crossing-400500.appspot.com',
    messagingSenderId: '584194731992',
    appId: '1:584194731992:web:782ea2d0c59b753a664cad',
    measurementId: 'G-VSJC2RDJLR'
  }

  initializeApp(firebaseConfig)

  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  const messaging = getMessaging()
  onMessage(messaging, payload => {
    notification.open({
      message: payload.notification?.title,
      description: payload.notification?.body,
      icon: () => h(InfoCircleFilled, { style: 'color: #16B1FF' })
    })
  })
  Notification.requestPermission().then(permission => {
    if (token.value && permission === 'granted') {
      getToken(messaging, {
        vapidKey:
          'BJsfvv3By1pNdgjMROUtQacVSOx8k8P3u5jpzEmaat7L8xfAd_rl-UCtDjMfbMpwoyVC8yS1HS0jcL0zOtgRtEQ'
      }).then(async t => {
        if (t) {
          await authStore.editFCMToken(t)
        }
      })
    }
  })
})
