import App from './App.vue'
import { createApp } from 'vue'
import misroutes from './router/router.apis'

const app = createApp(App)
app.use(misroutes)
app.mount('#app')


