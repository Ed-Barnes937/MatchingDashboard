import '@babel/polyfill'
import './plugins/vuetify'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

//css
import './App.css'

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
