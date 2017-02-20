import axios from 'axios'
import {DOMAIN} from '../../config/global.config'

axios.defaults.timeout = 5000
axios.defaults.baseURL = `${DOMAIN}/admin`
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''

export const login = (conditions) => {
    return axios.post(`${DOMAIN}/auth/local`, conditions)
}

export const fetchUserInfo = () => {
    return axios.get(`/user/me`)
}

export const fetchArticles = (conditions) => {
    return axios.get(`/articles`, {params: conditions})
}

export const createArticle = (conditions) => {
    return axios.post(`/articles`, conditions)
}

export const deleteArticle = (id) => {
    return axios.delete(`/articles/${id}`)
}

export const fetchTags = (platform, category, conditions) => {
    return axios.get(`/tags/${platform}/${category}`, {params: conditions})
}

export const createTag = (conditions) => {
    return axios.post(`/tags`, conditions)
}

export const updateTag = (id, conditions) => {
    return axios.put(`/tags/${id}`, conditions)
}

export const deleteTag = (id) => {
    return axios.delete(`/tags/${id}`)
}
