<template>
	<div class="login">
		<form>
			<h2>帐号登录</h2>

			<div class="form-group">
				<input type="text" name="username" v-model.trim="item.username" class="form-control" placeholder="用户名" required />
			</div>
			<div class="form-group">
				<input type="password" name="password" v-model.trim="item.password" class="form-control" placeholder="密码" required />
			</div>
			<div class="form-group">
				<a class="btn btn-default submit" v-on:click="doLogin()">登录</a>
			</div>
			<p class="info">{{info}}</p>
			<div class="separator">
				<h1><img src="../../assets/images/logo.png" alt="99知识平台"></h1>
				<p>Copyright © <a href="http://f2e.tming.net.cn/" target="_blank">F2E.TMING</a>All Rights Reserved. </p>
			</div>
		</form>
	</div>
</template>

<script>
	import {ROOT} from '../../config';

	export default {
		data(){
			return {
				apiUrl: `${ROOT}/auth/local`,
				info: '',
				item: {}
			}
		},
		methods: {
			clearInfo: function () {
				this.info = '';
			},
			doLogin: function () {
				if (!this.item.username.length) return this.info = '请输入用户名';
				if (!this.item.password.length) return this.info = '请输入密码';

				this.$http.post(this.apiUrl, this.item)
					.then(function (response) {
						if (response.ok) {
							localStorage.setItem('token', response.data.token);
							this.$router.push({path: '/home'});
						}
					})
					.catch(function (response) {
						console.log(response);
					});

			}
		}
	}

</script>

<style>
	.login{ margin: 15% auto 0; max-width: 350px; min-width: 280px;}
	.login form{ margin-top: 20px;  position: relative;}
	.login h2{ margin-bottom: 30px; font: 400 25px Helvetica,Arial,sans-serif; letter-spacing: -.05em; line-height: 20px; text-align: center;}
	.login h2:after, .login h2:before{ content: ""; height: 1px; position: absolute; top: 10px; width: 20%; }
	.login h2:before{ background:#7e7e7e;
		background:-moz-linear-gradient(right, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		background:-webkit-linear-gradient(right, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		background:-o-linear-gradient(right, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		background:-ms-linear-gradient(right, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		background:linear-gradient(right, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		left:0;}
	.login h2:after{ background:#7e7e7e;
		background:-moz-linear-gradient(left, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		background:-webkit-linear-gradient(left, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		background:-o-linear-gradient(left, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		background:-ms-linear-gradient(left, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		background:linear-gradient(left, rgba(126, 126, 126, 1)0, rgba(255, 255, 255, 1)100%);
		right:0;}
	.login form input[type=email], .login form input[type=password], .login form input[type=text] {
		-webkit-border-radius:3px;
		-moz-border-radius:3px;
		-ms-border-radius:3px;
		-o-border-radius:3px;
		border-radius:3px;
		-webkit-box-shadow:0 1px 0 #fff, 0 -2px 5px rgba(0, 0, 0, .08)inset;
		-moz-box-shadow:0 1px 0 #fff, 0 -2px 5px rgba(0, 0, 0, .08)inset;
		-ms-box-shadow:0 1px 0 #fff, 0 -2px 5px rgba(0, 0, 0, .08)inset;
		-o-box-shadow:0 1px 0 #fff, 0 -2px 5px rgba(0, 0, 0, .08)inset;
		box-shadow:0 1px 0 #fff, 0 -2px 5px rgba(0, 0, 0, .08)inset;
		-webkit-transition:all .5s ease;
		-moz-transition:all .5s ease;
		-ms-transition:all .5s ease;
		-o-transition:all .5s ease;
		transition:all .5s ease;
		border:1px solid #c8c8c8;
		color:#777;
		margin:0 0 20px;
		width:100%
	}
	.login form input[type=email]:focus, .login form input[type=password]:focus, .login form input[type=text]:focus ,.login form select:focus{
		-webkit-box-shadow:0 0 2px #AA77B4 inset;
		-moz-box-shadow:0 0 2px #ed1c24 inset;
		-ms-box-shadow:0 0 2px #ed1c24 inset;
		-o-box-shadow:0 0 2px #ed1c24 inset;
		box-shadow:0 0 2px #A97AAD inset;
		background-color:#fff;
		border:1px solid #A878AF;
		outline:0
	}
	.login .form-group{ text-align: center; }
	.login .separator{ margin-top: 20px; padding-top: 10px; border-top: 1px solid #D8D8D8; text-align: center;}
	.login .separator h1{ margin-bottom: 30px; }
	.login .separator a{ padding: 0 5px; }
	.login .separator a:hover{ text-decoration: underline; }
</style>