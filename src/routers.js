/*
* @Author: Administrator
* @Date:   2017-01-16 10:27:18
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-16 10:27:38
*/

'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';

// 组件
//import Home from './components/Home/index.vue';
//import ArticleDetail from './components/Articles/detail.vue';


Vue.use(VueRouter);

// 定义路由
const router = new VueRouter({
    mode: 'history',
    routes: [
        //{ path: '/', name: '/', component: Home },
        //{ path: '/article/:id', component: ArticleDetail }
    ]
});

export default router;