<style>
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
<template>
	<ul class="nav navbar-nav navbar-right">
		<li class="">
			<a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				<img src="../../assets/images/logo.png" alt="">John Doe
				<span class=" fa fa-angle-down"></span>
			</a>
			<ul class="dropdown-menu dropdown-usermenu animated fadeInDown pull-right">
				<li><a href="#"><i class="fa fa-sign-out pull-right"></i> 退出</a>
				</li>
			</ul>
		</li>
	</ul>
</template>