<template>
	<div id="app">
		<div class="nav-md" v-bind:class="{ 'nav-md': isMd, 'nav-sm': !isMd }">
			<div class="container body">
				<div class="main_container">
					<div class="col-md-3 left_col">
						<!-- logo -->
						<h1 class="navbar nav_title">
							<a href="#" class="site_title">
								<i class="fa fa-paw"></i>
								99知识平台
							</a>
						</h1>
						<!-- /logo -->
						<!-- info -->
						<div class="profile clearfix">
							<div class="profile_pic">
								<img v-if="userInfo.avatar" class="img-circle profile_img" :src="userInfo.avatar" alt="">
								<img v-else class="img-circle profile_img" src="../../assets/images/face-default.jpg" alt="">
							</div>
							<div class="profile_info">
								<span>Welcome,</span>
								<h2>{{userInfo.username}}</h2>
							</div>
						</div>
						<!-- /info -->
						<!-- sidebar menu -->
						<div class="menu" id="sidebar-menu">
							<ul class="nav side-menu">
								<li>
									<router-link to="/home/articles" >
										<i class="fa fa-files-o"></i>
										文章列表
									</router-link>
								</li>
								<li>
									<router-link to="/home/publish">
										<i class="fa fa-edit"></i>
										发布文章
									</router-link>
								</li>
								<li>
									<a v-on:click="toggleSideNav()">
										<i class="fa fa-sitemap"></i>
										文章分类
										<span class="fa fa-chevron-down"></span>
									</a>
									<ul class="nav child_menu" v-show="!isClose">
										<li class="current-page">
											<router-link to="/home/pctags">pc端分类</router-link>
										</li>
										<li>
											<router-link to="/home/waptags">移动端分类</router-link>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<!-- /sidebar menu -->
					</div>
					<div class="right_col">
						<TopNav v-bind:userInfo="userInfo" v-bind:isMd.sync="isMd" @on-change="onChange"></TopNav>
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {API_ROOT} from '../../config';
	import TopNav from '../TopNav/index.vue';

	export default {
		data(){
			return {
				userApiUrl: `${API_ROOT}/user/me`,
				userInfo: {},
				isMd: true,
				isClose: true
			}
		},
		created: function () {
			this.getUserInfo();
			//console.log(this.$route.path)
		},
		components: {
			TopNav
		},
		methods: {
			getUserInfo: function () {
				this.$http.get(this.userApiUrl)
					.then(function (response) {
						if (response.ok) {
							this.userInfo = response.data;
							//console.log(response.data);
						}
					})
					.catch(function (response) {
						if (response.status === 401 && response.statusText === 'Unauthorized') {
							this.$router.push({path: '/'});
						}
					});
			},
			onChange(val){
				this.isMd = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
			},
			toggleSideNav: function () {
				this.isClose = !this.isClose;
			}
		}
	}
</script>

<style>
	.container {
		width:100%;
		padding:0
	}
	.container.body .col-md-3.left_col {
		width:230px;
		padding:0;
		position:absolute;
		/* display:flex; */
	}
	.right_col {
		min-height: 1110px
	}
	body .container.body .right_col {
		background:#F7F7F7
	}
	.nav-md .container.body .right_col {
		/* padding:10px 20px 0; */
		margin-left:230px
	}


	.nav_title {
		width:230px;
		/* float:left;
		background:#2A3F54;
		border-radius:0;
		height:57px */
	}
	.site_title {
		text-overflow:ellipsis;
		overflow:hidden;
		font-weight:400;
		font-size:22px;
		width:100%;
		color:#ECF0F1!important;
		/* margin-left:0!important; */
		line-height:59px;
		display:block;
		height:55px;
		margin:0;
		padding-left:10px
	}
	.site_title:focus, .site_title:hover {
		text-decoration:none
	}
	.navbar .site_title .fa-paw, .separator .fa-paw, .footer .fa-paw {
		background:url(../../assets/images/logo.png) no-repeat;
		display:inline-block;
		width:36px;
		height:36px;
		vertical-align:middle;
		line-height:9999px;
		overflow:hidden
	}


	.profile_pic {
		width:35%;
		float:left
	}
	.img-circle.profile_img {
		width:70%;
		background:#fff;
		margin-left:15%;
		z-index:1000;
		position:inherit;
		margin-top:20px;
		border:1px solid rgba(52, 73, 94, .44);
		padding:4px
	}
	.profile_info {
		padding:25px 10px 10px;
		width:65%;
		float:left
	}
	.profile_info span {
		font-size:13px;
		line-height:30px;
		color:#BAB8B8
	}
	.profile_info h2 {
		font-size:14px;
		color:#ECF0F1;
		margin:0;
		font-weight:300
	}



	.menu{ margin-top: 30px; }
	.nav.side-menu> li.active>a {
		color:#E7E7E7;
		text-shadow:rgba(0, 0, 0, .25)0 -1px 0;
		background:-webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0%, #5b6479), color-stop(100%, #4c5566)), #686e78;
		background:-webkit-linear-gradient(#334556, #2C4257), #2A3F54;
		background:-moz-linear-gradient(#334556, #2C4257), #2A3F54;
		background:-o-linear-gradient(#334556, #2C4257), #2A3F54;
		background:linear-gradient(#334556, #2C4257), #2A3F54;
		-webkit-box-shadow:rgba(0, 0, 0, .25)0 1px 0, inset rgba(255, 255, 255, .16)0 1px 0;
		-moz-box-shadow:rgba(0, 0, 0, .25)0 1px 0, inset rgba(255, 255, 255, .16)0 1px 0;
		box-shadow:rgba(0, 0, 0, .25)0 1px 0, inset rgba(255, 255, 255, .16)0 1px 0
	}
	.nav.child_menu>li>a, .nav.side-menu>li>a {
		color:#E7E7E7;
		font-weight:500
	}
	.nav.side-menu> li>a:hover {
		color:#F2F5F7
	}
	.nav>li>a:focus, .nav>li>a:hover {
		background-color:transparent
	}
	.nav.side-menu> li.active, .nav.side-menu> li.current-page {
		border-right:5px solid #1ABB9C
	}
	#sidebar-menu .fa {
		width:26px;
		opacity:.99;
		display:inline-block;
		font-family:FontAwesome;
		font-style:normal;
		font-weight:400;
		font-size:18px;
		-webkit-font-smoothing:antialiased;
		-moz-osx-font-smoothing:grayscale
	}
	#sidebar-menu span.fa {
		float:right;
		text-align:center;
		margin-top:5px;
		font-size:10px!important;
		min-width:inherit;
		color:#C4CFDA
	}
	.nav.child_menu li:hover {
		background-color:rgba(255, 255, 255, .06)
	}
	.nav.child_menu li {
		padding-left:36px
	}
	.nav-md ul.nav.child_menu li:before {
		background:#425668;
		bottom:auto;
		content:"";
		height:8px;
		left:23px;
		margin-top:15px;
		position:absolute;
		right:auto;
		width:8px;
		z-index:1;
		-webkit-border-radius:50%;
		-moz-border-radius:50%;
		border-radius:50%
	}
	.nav-md ul.nav.child_menu li:after {
		border-left:1px solid #425668;
		bottom:0;
		content:"";
		left:27px;
		position:absolute;
		top:0
	}


	.nav-sm .container.body .left_col {
		width:70px;
		padding:0;
		position:fixed;
		height:100%;
		z-index:200
	}
	.nav-sm .nav.side-menu li a {
		text-align:center!important;
		font-weight:400;
		font-size:10px;
		padding:10px 5px
	}
	.nav-sm .nav.side-menu li.active-sm {
		border-right:5px solid #1ABB9C
	}
	.nav-sm>.nav.side-menu>li.active-sm>a {
		color:#1ABB9C!important
	}
	.nav-sm .nav.side-menu li a i.toggle-up {
		display:none!important
	}
	.nav-sm .nav.side-menu li a i {
		font-size:25px!important;
		text-align:center;
		width:100%!important;
		margin-bottom:5px
	}
	.nav-sm span.fa {
		display:none!important
	}
	.nav-sm .profile{
		display: none;
	}
	.nav-sm .container.body .right_col {
		/*padding:10px 20px;*/
		margin-left:70px;
		z-index:2
	}
	.nav-sm .navbar.nav_title {
		width:70px
	}
	.nav-sm .navbar.nav_title a span {
		display:none
	}


	.page-main{ padding:10px 25px 0;}
	.row {
		margin: 0;
		/* margin-right:-10px;
		margin-left:-10px */
	}


	@media (max-width:991px) {
		.nav-md .container.body .right_col, .nav-md .container.body .top_nav {
			width:100%;
			margin:0
		}
		.nav-md .container.body .col-md-3.left_col {
			display:none
		}
		.nav-md .container.body .right_col {
			width:100%;
			padding-right:0
		}
	}
</style>