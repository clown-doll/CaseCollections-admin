<template>
	<div class="page-main">
		<div class="page-title">
			<h3>移动端分类</h3>
		</div>
		<div class="row action-bar">
			<div class="col-xs-8 col-sm-9 col-md-9">
				<form class="form-inline" role="form">
					<div class="form-group">
						<label for="" class="sr-only">分类名称/id</label>
						<input type="text" class="form-control" id="" placeholder="标题/关键词">
					</div>
					<button type="submit" class="btn btn-default">搜索</button>
				</form>
			</div>
			<button type="button" class="btn btn-default new-btn">新建分类</button>
		</div>
		<ul class="nav nav-tabs bar-tabs">
			<!--<li v-for="(tab, index) in tabs" :class="{active:active===index}" @click="toggle(index, tab.view)">
				<a href="javascript:;">{{tab.name}}</a>
			</li>-->
			<li>
				<router-link to="/home/waptags/types">类别</router-link>
			</li>
			<li>
				<router-link to="/home/waptags/ways">玩法</router-link>
			</li>
		</ul>
		<router-view></router-view>
		<Pages></Pages>
		<PublicFooter></PublicFooter>
	</div>
</template>

<script>
	import {API_ROOT, COUNT_PERPAGE} from '../../config';

	import PublicFooter from '../Home/footer.vue';
	import Pages from '../Home/pages.vue';



	export default {
		data: function () {
			return {
				/*currentView: 'types',
				active: 0,
				tabs: [
					{
						name: '类别',
						view: 'types'
					},
					{
						name: '玩法',
						view: 'ways'
					}
				]*/
			}
		},
		components: {
			PublicFooter,
			Pages
		},
		methods: {
			/*toggle(i, v){
				this.active = i;
				this.currentView = v;
			}*/
		}
	}
</script>

<style>
	ul.bar-tabs {
		overflow:visible;
		background:#F5F7FA;
		height:25px;
		margin:21px 0 14px;
		padding-left:14px;
		position:relative;
		z-index:1;
		width:100%;
		border-bottom:1px solid #E6E9ED
	}
	ul.bar-tabs>li {
		border:1px solid #E6E9ED;
		color:#333!important;
		margin-top:-17px;
		margin-left:8px;
		background:#fff;
		border-bottom:none;
		border-radius:4px 4px 0 0
	}
	ul.bar-tabs>li.active {
		border-right:6px solid #D3D6DA;
		border-top:0;
		margin-top:-15px
	}
	ul.bar-tabs>li.active a {
		background:#fff;
		border-color:transparent
	}
	ul.bar-tabs>li a {
		padding:10px 17px;
		background:#F5F7FA;
		margin:0;
		border-radius:0
	}
	ul.bar-tabs.right {
		padding-right:14px
	}
	ul.bar-tabs.right li {
		float:right
	}
</style>