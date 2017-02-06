/*
* @Author: Administrator
* @Date:   2017-01-16 10:26:23
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-18 11:28:12
*/

'use strict';

import Vue from 'vue';
import App from './components/App.vue';
import VueResource from 'vue-resource';
import Vuerify from 'vuerify';
import VueMoment from 'vue-moment';

import router from './routers';

Vue.use(VueResource);
Vue.use(Vuerify);
Vue.use(VueMoment);


// HTTP相关
Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = true;

// 拦截器
/*Vue.http.interceptors.push(function (request, next) {
    this.showLoading = true;
    next(function (response) {
        this.showLoading = false;
        return response;
    });
});*/
Vue.http.interceptors.push(function (request, next) {
    var jwtToken = localStorage.getItem('token');
    if (jwtToken) {
        Vue.http.headers.common.Authorization = `Bearer ${jwtToken}`;
    }
    next(function (response) {
        if (response.status === 400 || response.status === 401) {
            localStorage.clear();
        }
        return response;
    });
});

import './assets/styles/bootstrap.min.css';
import './assets/fonts/css/font-awesome.min.css';
import './assets/styles/public.css';

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});