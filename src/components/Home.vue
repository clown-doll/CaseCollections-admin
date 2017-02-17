<template>
	<div class="nav-md" ref="main" :class="{ 'nav-md': isMd, 'nav-sm': !isMd }">
		<div class="container body">
			<div class="main_container">
				<Sidebar :isMd="isMd" :userInfo="userInfo"></Sidebar>
				<div class="right_col">
					<div class="top_nav">
						<div class="nav_menu">
							<nav class="clearfix">
								<div class="nav toggle">
									<a href="javascript:;" @click="toggleNav()"><i class="fa fa-bars"></i></a>
								</div>
								<ul class="nav navbar-nav navbar-right">
									<li class="">
										<a href="javascript:;" class="user-profile dropdown-toggle" @click="toggleExitBtn()">
											<img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
											<img v-else src="../../src/assets/images/face-default.jpg" alt="">
											{{userInfo.username}}
											<span class=" fa fa-angle-down"></span>
										</a>
										<ul class="dropdown-menu" v-show="isShow">
											<li>
												<a href="javascript:;" @click="doExit()">
													<i class="fa fa-sign-out pull-right"></i>
													退出
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</nav>
						</div>
					</div>
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import * as api from '../api/index'
    import Sidebar from './Sidebar.vue'

    export default {
        data () {
            return {
                userInfo: {},
                isShow: false,
                isMd: true
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.getUserInfo()
            })
        },
        components: {
            Sidebar
        },
        methods: {
            getUserInfo () {
                api.fetchUserInfo().then((response) => {
                    if (response.status === 200) {
                        this.userInfo = response.data
                    }
                })
            },
            toggleExitBtn () {
                this.isShow = !this.isShow
            },
            doExit () {
                this.$router.push({path: '/'})
            },
            toggleNav () {
                this.isMd = !this.isMd
            }
        }
    }
</script>

<style>
	.container.body {
		width:100%;
		padding:0
	}

	.nav-md .container.body .right_col {
		margin-left:230px
	}

	@media (max-width:991px) {
		.nav-md .container.body .right_col,
		.nav-md .container.body .top_nav {
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



	.nav_menu {
		/* float:left; */
		background:#EDEDED;
		border-bottom:1px solid #D9DEE4;
		margin-bottom:10px;
		width:100%
	}

	.toggle {
		float:left;
		margin:0;
		padding-top:16px;
		width:70px
	}
	.toggle a {
		padding:15px 15px 0;
		margin:0
	}
	.toggle a i {
		font-size:26px
	}

	.top_nav .navbar-right {
		margin:0;
		width:70%;
		float:right
	}
	.top_nav .navbar-right li {
		display:inline-block;
		float:right
	}
	.user-profile img {
		width:29px;
		height:29px;
		border-radius:50%;
		margin-right:10px
	}
	.navbar-nav .dropdown-menu {
		border:medium none;
		box-shadow:0 0 3px;
		display: block;
		float:left;
		font-size:12px;
		left:0;
		list-style:none outside none;
		padding:0;
		position:absolute;
		text-shadow:none;
		top:100%;
		z-index:1000;
		border-radius:2px;
		/* border-top:1px solid #999 */
	}
	.dropdown-menu:after {
		border-bottom:6px solid #999;
		border-left:6px solid transparent;
		border-right:6px solid transparent;
		content:"";
		display:inline-block;
		right:6%;
		position:absolute;
		top:-6px
	}
	.dropdown-menu>li>a {
		color:#5A738E
	}
	.navbar-nav .open .dropdown-menu {
		position:absolute;
		background:#fff;
		margin-top:0;
		border:1px solid #D9DEE4;
		-webkit-box-shadow:none
	}
	.top_nav .dropdown-menu {
		min-width:220px
	}
	.top_nav .dropdown-menu li {
		width:100%
	}
	.top_nav .dropdown-menu li a {
		width:100%;
		padding:12px 20px
	}
	.top_nav li a i {
		font-size:15px
	}

</style>
