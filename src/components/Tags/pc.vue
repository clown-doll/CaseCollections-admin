<template>
	<div class="page-main">
		<div class="page-title">
			<h3>pc端分类</h3>
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
		<div class="table-responsive">
			<table class="table table-striped custom-table">
				<thead>
					<tr>
						<th>分类名称</th>
						<th>分类id</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>游戏资料</td>
						<td>123044</td>
						<td>
							<a href="#">修改</a>
							|
							<a href="#">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
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
				listApiUrl: `${API_ROOT}/tags/pc/types`,
				listData: {}
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
							this.listData = response.data;
							console.log(response.data);
						}
					})
					.catch(function (response) {

					});
			},
			getDefaultList: function () {
				//var url = `${this.listApiUrl}?currentPage=${this.curr}&itemsPerPage=${COUNT_PERPAGE}`;
				this.doGet(this.listApiUrl);
			}
		}
	}
</script>

<style>
	.action-bar .new-btn{ position: absolute; right: 0; }
</style>