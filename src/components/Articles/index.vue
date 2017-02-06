<template>
	<div class="page-main">
		<div class="page-title">
			<h3>文章列表</h3>
		</div>
		<div class="row action-bar">
			<div class="col-xs-8 col-sm-9 col-md-9">
				<form class="form-inline" role="form">
					<div class="form-group">
						<label for="" class="sr-only">标题/关键词</label>
						<input type="text" class="form-control" placeholder="标题/关键词" v-model.trim="searchKey">
					</div>
					<button type="button" class="btn btn-default" @click="doSearch()">搜索</button>
				</form>
			</div>
		</div>
		<div class="table-responsive">
			<p v-if="!listData.count">暂无数据！</p>
			<table class="table table-striped custom-table" v-else>
				<thead>
					<tr>
						<th>标题</th>
						<th>发布时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in listData.data">
						<td>{{item.title}}</td>
						<td>{{item.publish_time | moment("YYYY-MM-DD")}}</td>
						<td>
							<router-link :to="{ name: 'articles', params: { aid: item._id }}">修改</router-link>
							|
							<button @click="deleteArticle(item._id)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<Pages v-if="listData.count" v-bind:totalCount="totalCount"  v-on:page-change="pageListen"></Pages>
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
				listData: {},
				curr: 1,
				totalCount: 0,
				listApiUrl: `${API_ROOT}/articles`,
				searchKey: ''
			}
		},
		components: {
			PublicFooter,
			Pages
		},
		created: function () {
			this.getDefaultList();
		},
		methods: {
			doGet: function (url) {
				this.$http.get(url)
					.then(function (response) {
						if (response.ok) {
							//this.userInfo = response.data;
							//console.log(response.data);
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
			doSearch: function () {
				if (this.searchKey) {
					var keyword = this.searchKey;
					var url = `${this.listApiUrl}?currentPage=${this.curr}&itemsPerPage=${COUNT_PERPAGE}&key=${keyword}`;
					this.doGet(url);
				} else {
                    this.getDefaultList();
				}
			},
			pageListen: function (page) {
				this.curr = page;
				var url = `${this.listApiUrl}?currentPage=${this.curr}&itemsPerPage=${COUNT_PERPAGE}`;
				this.doGet(url);
			},
			deleteArticle: function (id) {
				var url = `${this.listApiUrl}/${id}`;

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
			}
		}
	}
</script>

<style>
	.custom-table{
		border: 1px solid rgba(221,221,221,.78);
	}
	.custom-table thead{
		background:rgba(52, 73, 94, .94);
		color:#ECF0F1
	}

	.custom-table td button{
		background: none;
		border: 0;
	}
	.custom-table td button:hover{
		text-decoration: underline;
	}

	.action-bar{ position: relative; padding: 15px 0; }
	.action-bar .form-inline .form-group{     display: inline-block;
		margin-bottom: 0;
		vertical-align: middle;}
	.action-bar .form-inline .form-control{display: inline-block;
		width: auto;
		vertical-align: middle;}
	.action-bar .col-xs-8, .action-bar .col-sm-9,  .action-bar .col-md-9{ padding: 0; }
</style>