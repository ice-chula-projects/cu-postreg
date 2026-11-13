import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import "./styles/main.css"

const app = createApp(App)
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
})

app.use(router)
app.use(i18n)
app.mount('#app')
