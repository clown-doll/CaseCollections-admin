<template>
	<div class="page-main">
		<div class="page-title">
			<h3>文章列表</h3>
		</div>
		<div class="row action-bar">
			<div class="col-xs-8 col-sm-9 col-md-9">
				<form class="form-inline">
					<div class="form-group">
						<label class="sr-only">标题/关键词</label>
						<input type="text" class="form-control" placeholder="标题/关键词" v-model.trim="searchKey">
					</div>
					<button type="button" class="btn btn-default" @click="doSearch()">搜索</button>
				</form>
			</div>
		</div>
		<p v-if="count === 0">暂无数据！</p>
		<div class="table-responsive" v-else>
			<table class="table table-striped custom-table">
				<thead>
					<tr>
						<th>标题</th>
						<th>发布时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in listData">
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
			<Pages :totalCount="count" @currentpage="getCurr"></Pages>
		</div>
		<PublicFooter></PublicFooter>
	</div>
</template>

<script>
    import * as api from '../api/index'
    import {COUNT_PERPAGE} from '../../config/global.config'

    import Pages from './Pages.vue'
    import PublicFooter from './PublicFooter.vue'

    export default {
        data () {
            return {
                listData: {},
                count: 0,
                curr: 1,
                searchKey: ''
            }
        },
        computed: {
            conditions () {
                return {
                    currentPage: this.curr,
                    itemsPerPage: COUNT_PERPAGE,
                    key: this.searchKey
                }
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.getList(this.conditions)
            })
        },
        components: {
            Pages,
            PublicFooter
        },
        methods: {
            getList (c) {
                api.fetchArticles(c).then((response) => {
                    if (response.status === 200) {
                        this.listData = response.data.data
                        this.count = response.data.count
                    }
                })
            },
            getCurr (data) {
                this.curr = data
                this.getList(this.conditions)
            },
            doSearch () {
                this.curr = 1
                this.getList(this.conditions)
            },
            deleteArticle (id) {
                api.deleteArticle(id).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        alert('删除成功')
                        this.getList(this.conditions)
                    }
                })
            }
        }
    }
</script>

<style>
	.page-main{ padding:10px 25px 0;}
	.page-main .row {
		margin: 0;
	}

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

