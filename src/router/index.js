import Vue from 'vue'
import Router from 'vue-router'

import Login from 'components/Login'
import Err from 'components/Err'
import Home from 'components/Home'
import Articles from 'components/ArticleList'
import Publish from 'components/Publish'
import TagsPc from 'components/TagsPc'
import TagsWap from 'components/TagsWap'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/err',
            name: 'err',
            component: Err
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            redirect: '/home/articles',
            children: [
                {
                    path: 'articles',
                    name: 'articles',
                    component: Articles
                },
                {
                    path: 'publish',
                    name: 'publish',
                    component: Publish
                },
                {
                    path: 'tagspc',
                    name: 'tags-pc',
                    component: TagsPc
                },
                {
                    path: 'tagswap',
                    name: 'tags-wap',
                    component: TagsWap
                }
            ]
        }
    ]
})
