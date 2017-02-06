<template>
	<div>
		<div class="table-responsive">
			<p v-if="!listData.count">暂无数据！</p>
			<table class="table table-striped custom-table" v-else>
				<thead>
					<tr>
						<th>分类名称</th>
						<th>分类id</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in listData.data">
						<td>{{item.name}}</td>
						<td>{{item._id}}</td>
						<td>
							<button @click="showModifyPop(item)">修改</button>
							|
							<button @click="deleteTags(item._id)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<Pages v-if="listData.count" v-bind:totalCount="totalCount"  v-on:page-change="pageListen"></Pages>
		<ModifyTag v-if="showModify" v-bind:showModify.sync="showModify" v-bind:currItem.sync="currItem" @on-modify="onModify"></ModifyTag>
	</div>
</template>


<script>
    import {API_ROOT, COUNT_PERPAGE} from '../../config';
    import Pages from '../Home/pages.vue';
    import ModifyTag from './modify.vue';


    export default {
        data: function () {
            return {
                curr: 1,
                totalCount: 0,
                listApiUrl: `${API_ROOT}/tags/wap/ways`,
                listData: {},
                showModify: false,
                currItem: {}
            }
        },
        components: {
            Pages,
            ModifyTag
        },
        created: function () {
            this.getDefaultList();
        },
        methods: {
            doGet: function (url) {
                this.$http.get(url)
                    .then(function (response) {
                        if (response.ok) {
                            console.log(response.data);
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
            deleteTags: function (id) {
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
            showModifyPop: function (item) {
                this.currItem = item;
                this.showModify = !this.showModify;
            },
            onModify: function (val) {
                this.showModify = val;
            }
        }
    }
</script>