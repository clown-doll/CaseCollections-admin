<template>
    <div class="form-wrap">
        <form>
            <h2>帐号登录</h2>
            <div class="form-group" :class="{ 'form-group--error': $v.username.$error }">
                <input type="text" class="form-control" placeholder="用户名" v-model.trim="username" @blur="$v.username.$touch()"/>
                <span class="form-group__message" v-if="!$v.username.required">请输入用户名！</span>
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                <input type="password" class="form-control" placeholder="密码" v-model.trim="password" @blur="$v.password.$touch()"/>
                <span class="form-group__message" v-if="!$v.password.required">请输入密码！</span>
            </div>
            <div class="form-group" v-if="!result.success">
                <p class="text-danger">{{result.message}}</p>
            </div>
            <div class="form-group">
                <a class="btn btn-default submit" :disabled="$v.username.$invalid || $v.password.$invalid" @click="doLogin()">登录</a>
            </div>
        </form>
        <div class="separator">
            <Logo></Logo>
            <Copyright></Copyright>
        </div>
    </div>
</template>

<script>
    import * as api from '../api/index'
    import { required } from 'vuelidate/lib/validators'

    import Logo from './Logo.vue'
    import Copyright from './Copyright.vue'
    import '../assets/styles/form.css'

    export default {
        name: 'login',
        data () {
            return {
                username: '',
                password: '',
                result: {
                    success: true
                }
            }
        },
        validations: {
            username: {
                required
            },
            password: {
                required
            }
        },
        components: {
            Logo,
            Copyright
        },
        methods: {
            doLogin () {
                let params = {
                    username: this.username,
                    password: this.password
                }
                api.login(params).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        localStorage.setItem('token', response.data.token)
                        this.$router.push({path: '/home'})
                    } else {
                        this.result = response.data
                    }
                }).catch(function (error) {
                    console.log(error)
                    this.$router.push({path: '/err'})
                })
            }
        }
    }
</script>

<style>
    .form-wrap .separator{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #D8D8D8; text-align: center;}
    .form-wrap .separator p{ margin-top: 20px;}
    .form-wrap .separator .logo strong{ display: none}
    .form-wrap .separator a{ padding: 0 5px; }
    .form-wrap .separator a:hover{ text-decoration: underline; }
</style>
