<template>
	<div class="page-main">
		<div class="page-title">
			<h3>pc端分类</h3>
		</div>
		<div class="row action-bar">
			<div class="col-xs-8 col-sm-9 col-md-9">
				<form class="form-inline" role="form">
					<div class="form-group">
						<label for="" class="sr-only">分类名称</label>
						<input type="text" class="form-control" id="" placeholder="标题/关键词" v-model.trim="searchKey">
					</div>
					<button type="button" class="btn btn-default" v-on:click="doSearch()">搜索</button>
				</form>
			</div>
			<button type="button" class="btn btn-default new-btn" v-on:click="openModifyPop()">新建分类</button>
		</div>
		<p v-if="!listData.count">暂无数据！</p>
		<div class="table-responsive" v-else>
			<table class="table table-striped custom-table">
				<thead>
					<tr>
						<th>分类名称</th>
						<th>分类id</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody v-for="item in listData.data">
					<tr>
						<td>{{item.name}}</td>
						<td>{{item._id}}</td>
						<td>
							<a href="#">修改</a>
							|
							<a href="javascript:;" v-on:click="deleteArticle(item._id)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<Pages v-if="listData.count" v-bind:totalCount="totalCount"  v-on:page-change="pageListen"></Pages>
		<PublicFooter></PublicFooter>
		<ModifyPop v-if="showPop" v-bind:showPop="showPop"></ModifyPop>
	</div>
</template>

<script>
	import {API_ROOT, COUNT_PERPAGE} from '../../config';

	import PublicFooter from '../Home/footer.vue';
	import Pages from '../Home/pages.vue';
	import ModifyPop from './modify.vue';

	export default {
		data: function () {
			return {
				curr: 1,
				totalCount: 0,
				listApiUrl: `${API_ROOT}/tags/pc/types`,
				listData: {},
				searchKey: '',
				showPop: false
			}
		},
		components: {
			PublicFooter,
			Pages,
			ModifyPop
		},
		created: function () {
			this.getDefaultList();
		},
		methods: {
			doGet: function (url) {
				this.$http.get(url)
					.then(function (response) {
						if (response.ok) {
							this.listData = response.data;
							this.totalCount = response.data.count;
						}
					})
					.catch(function (response) {

					});
			},
			getDefaultList: function () {
				var url = `${this.listApiUrl}?currentPage=${this.curr}&itemsPerPage=${COUNT_PERPAGE}`;
				this.doGet(url);
			},
			pageListen: function (page) {
				this.curr = page;
				var url = `${this.listApiUrl}?currentPage=${this.curr}&itemsPerPage=${COUNT_PERPAGE}`;
				this.doGet(url);
			},
			doSearch: function () {
				if (this.searchKey) {
					var keyword = this.searchKey;
					var url = `${this.listApiUrl}?currentPage=${this.curr}&itemsPerPage=${COUNT_PERPAGE}&key=${keyword}`;
					this.doGet(url);
				} else {
					console.log('请输入关键字');
				}
			},
			deleteArticle: function (id) {
				var url = `${API_ROOT}/tags/${id}`;

				this.$http.delete(url)
					.then(function (response) {
						console.log(response);
						if (response.ok && response.data.success) {
							this.curr = 1;
							var url = `${this.listApiUrl}?currentPage=${this.curr}&itemsPerPage=${COUNT_PERPAGE}`;
							this.doGet(url);
						}
					})
					.catch(function (response) {

					});
			},
			openModifyPop: function () {
				this.showPop = true
			}
		}
	}
</script>

<style>
	.action-bar .new-btn{ position: absolute; right: 0; }
</style>