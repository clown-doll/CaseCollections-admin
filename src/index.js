/*
* @Author: Administrator
* @Date:   2017-01-16 10:26:23
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-17 16:06:01
*/

'use strict';

import Vue from 'vue';
import App from './components/App.vue';
import VueResource from 'vue-resource'

import router from './routers';

Vue.use(VueResource);

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