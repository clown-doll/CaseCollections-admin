// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Validations from 'vuelidate'
import VueMoment from 'vue-moment'
import App from './App'
import router from './router'

Vue.use(Validations)
Vue.use(VueMoment)

import './assets/styles/bootstrap.min.css'
import './assets/fonts/css/font-awesome.min.css'
import './assets/styles/public.css'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
