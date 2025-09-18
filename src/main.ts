import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useGuards } from './guard/useGuards'

async function bootstrap() {
  if (import.meta.env.MODE === 'development') {
    await import('./mocks/axiosMock')
      .then(() => console.log('✅ Mock de API ativado'))
      .catch((err) => console.error('⛔ Erro ao ativar mock de API:', err))
  }

  const app = createApp(App)

  app.use(createPinia())
  router.beforeEach(useGuards)
  app.use(router)

  app.mount('#app')
}

bootstrap()
