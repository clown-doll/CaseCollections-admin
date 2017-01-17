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
import Login from './components/Login/index.vue';
import Home from './components/Home/index.vue'
import Articles from './components/Articles/index.vue';
import Publish from './components/Publish/index.vue';
import PcTags from './components/Tags/pc.vue';
import WapTags from './components/Tags/wap.vue';


Vue.use(VueRouter);

// 定义路由
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Login },
        {
            path: '/home',
            component: Home,
            children: [
                { path: 'articles', component: Articles },
                { path: 'publish', component: Publish },
                { path: 'pctags', component: PcTags },
                { path: 'waptags', component: WapTags },
            ]
        }
        /*
        { path: '/articles', component: Articles },
        { path: '/publish', component: Publish }*/
    ]
});

export default router;