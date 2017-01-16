<template>
	<div id="app">
		<div class="nav-md">
			<div class="container body">
				<div class="main_container">
					<SideBar></SideBar>
					<MainContent></MainContent>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import SideBar from './Sidebar/index.vue';
	import MainContent from './MainContent/index.vue';

	export default {
		components: {
			SideBar,
			MainContent
		}
	}
</script>