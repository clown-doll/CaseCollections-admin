<template>
	<div class="top_nav">
		<div class="nav_menu">
			<nav class="clearfix">
				<!--<Toggle></Toggle>
				<User></User>-->
				<div class="nav toggle">
					<a id="menu_toggle" v-on:click="toggleNav()"><i class="fa fa-bars"></i></a>
				</div>
				<ul class="nav navbar-nav navbar-right">
					<li class="">
						<a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
							<img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
							<img v-else src="../../assets/images/face-default.jpg" alt="">
							{{userInfo.username}}
							<span class=" fa fa-angle-down"></span>
						</a>
						<ul class="dropdown-menu dropdown-usermenu animated fadeInDown pull-right">
							<li><a href="#"><i class="fa fa-sign-out pull-right"></i> 退出</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['userInfo', 'isMd'],
		data: function () {
			return {
				selfIsMd: this.isMd //①创建props属性isMd的副本--selfIsMd
			}
		},
		watch: {
			isMd(val) {
				this.selfIsMd = val; //②监听外部对props属性isMd的变更，并同步到组件内的data属性selfIsMd中
			},
			selfIsMd(val){
				this.$emit("on-change",val);//③组件内对selfIsMd变更后向外部发送事件通知
			}
		},
		methods: {
			toggleNav: function () {
				this.selfIsMd = !this.selfIsMd;
			}
		}
	}
</script>

<style>
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
	.dropdown-menu {
		border:medium none;
		box-shadow:0 0 3px;
		display:none;
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