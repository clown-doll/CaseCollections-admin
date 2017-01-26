<template>
	<div class="table-responsive">
		<table class="table table-striped custom-table">
			<thead>
				<tr>
					<th>types 分类名称</th>
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
				<tr>
					<td>游戏资料</td>
					<td>123044</td>
					<td>
						<a href="#">修改</a>
						|
						<a href="#">删除</a>
					</td>
				</tr>
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
</template>


<script>
	import {API_ROOT, COUNT_PERPAGE} from '../../config';

	export default {
		data: function () {
			return {

			}
		},
		components: {

		},
		methods: {

		}
	}
</script>