import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './plugins/api'
import registerGlobalComponents from './plugins/global-components'
import './index.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.config.globalProperties.$api = api

registerGlobalComponents(app)

app.mount('#app')
