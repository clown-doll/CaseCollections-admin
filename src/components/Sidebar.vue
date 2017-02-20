<template>
	<div class="col-md-3 left_col" ref="sidebar">
		<!-- logo -->
		<h1 class="navbar nav_title">
			<Logo></Logo>
		</h1>
		<!-- /logo -->
		<!-- info -->
		<div class="profile clearfix">
			<div class="profile_pic">
				<img v-if="userInfo.avatar" class="img-circle profile_img" :src="userInfo.avatar" alt="">
				<img v-else class="img-circle profile_img" src="../../src/assets/images/face-default.jpg" alt="">
			</div>
			<div class="profile_info">
				<span>Welcome,</span>
				<h2>{{userInfo.username}}</h2>
			</div>
		</div>
		<!-- /info -->
		<!-- sidebar menu -->
		<div id="sidebar-menu" class="menu">
			<ul class="nav side-menu">
				<li :class="{'active': curr.match(/articles/)}">
					<router-link to="/home/articles" >
						<i class="fa fa-files-o"></i>
						文章列表
					</router-link>
				</li>
				<li :class="{'active': curr.match(/publish/)}">
					<router-link to="/home/publish">
						<i class="fa fa-edit"></i>
						发布文章
					</router-link>
				</li>
				<li :class="{'active': curr.match(/tags/)}">
					<a href="javascript:;" @click="toggleSideNav()">
						<i class="fa fa-sitemap"></i>
						文章分类
						<span class="fa fa-chevron-down"></span>
					</a>
					<transition name="fade">
						<ul class="nav child_menu" v-show="!isClose">
							<li :class="{'active': subCurr === '/home/tagspc'}">
								<router-link to="/home/tagspc">pc端分类</router-link>
							</li>
							<li :class="{'active': subCurr === '/home/tagswap'}">
								<router-link to="/home/tagswap">移动端分类</router-link>
							</li>
						</ul>
					</transition>
				</li>
			</ul>
		</div>
		<!--/ sidebar menu -->
	</div>
</template>

<script>
    import Logo from './Logo.vue'

    export default {
        props: ['userInfo', 'isMd'],
        data () {
            return {
                isClose: true,
                curr: this.$route.name,
                subCurr: this.$route.path
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.setHeight()
            })
        },
        components: {
            Logo
        },
        watch: {
            '$route' (to) {
                this.curr = to.name
                this.subCurr = to.path
                if (to.name.match(/tags/)) {
                    if (!this.isMd) {
                        this.isClose = !this.isClose
                    }
                } else {
                    this.isClose = true
                }
            }
        },
        methods: {
            setHeight () {
                let H = 0

                if (window.innerHeight) {
                    H  = window.innerHeight
                } else if ((document.body) && (document.body.clientHeight)) {
                    H = document.body.clientHeight
                }

                this.$refs.sidebar.style.height = `${H}px`
            },
            toggleSideNav () {
                this.isClose = !this.isClose
            }
        }
    }
</script>

<style>
	/*sidebar*/
	.container.body .col-md-3.left_col {
		width:230px;
		padding:0;
		position:fixed;
		background-color: #2A3F54;
	}

	/*sidebar nav*/
	.nav_title {
		width:230px;
	}
	.nav_title .logo {
		text-overflow:ellipsis;
		overflow:hidden;
		font-weight:400;
		font-size:22px;
		width:100%;
		color:#ECF0F1!important;
		line-height:59px;
		display:block;
		height:55px;
		margin:0;
		padding-left:10px
	}
	.nav_title .logo:focus, .nav_title .logo:hover {
		text-decoration:none
	}
	.nav_title .logo strong{
		font-weight: normal;
	}

	/*sidebar user*/
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
		/*margin-top:20px;*/
		border:1px solid rgba(52, 73, 94, .44);
		padding:4px
	}
	.profile_info {
		padding:0 10px 10px;
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

	/*sidebar menu*/
	.menu{ margin-top: 30px; }
	.nav.side-menu> li.active>a ,
	.nav.side-menu> li>a:hover{
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
	.nav.side-menu>li>a:focus {
		background: transparent;
	}
	.nav.child_menu>li>a,
	.nav.side-menu>li>a {
		color:#E7E7E7;
		font-weight:500
	}
	.nav.side-menu> li.active {
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
	.nav.child_menu li:hover,
	.nav-sm .child_menu li.active{
		background:rgba(255, 255, 255, .06)
	}

	.nav.child_menu li.active a{
		font-weight: bold;
	}

	.nav.child_menu > li >a:focus,
	.nav.child_menu li a:hover {
		background:transparent;
		box-shadow:none;
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

	.nav-sm ul.nav.child_menu {
		left:100%;
		position:absolute;
		top:0;
		padding:10px;
		width:210px;
		z-index:4000;
		background:#3E5367;
	}
	.nav-sm ul.nav.child_menu li {
		padding-left:0
	}
	.nav-sm ul.nav.child_menu li a {
		text-align:left!important
	}
	.nav-sm ul.nav.child_menu li:before ,
	.nav-sm ul.nav.child_menu li:after {
		display: none;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
		opacity: 0
	}
</style>
