<style>
	.nav_menu {
		/* float:left; */
		background:#EDEDED;
		border-bottom:1px solid #D9DEE4;
		margin-bottom:10px;
		width:100%
	}
</style>
<template>
	<div class="top_nav">
		<div class="nav_menu">
			<nav class="clearfix">
				<Toggle></Toggle>
				<User></User>
			</nav>
		</div>
	</div>
</template>

<script>
	import Toggle from './toggle.vue';
	import User from './user.vue';

	export default {
		components: {
			Toggle,
			User
		}
	}
</script>