<template>
	<div class="page-main">
		<div class="page-title">
			<h3>pc端分类</h3>
		</div>
		<div class="row action-bar">
			<div class="col-xs-8 col-sm-9 col-md-9">
				<form class="form-inline">
					<div class="form-group">
						<label class="sr-only">分类名称</label>
						<input type="text" class="form-control" placeholder="标题/关键词" v-model.trim="searchKey">
					</div>
					<button type="button" class="btn btn-default" @click="doSearch()">搜索</button>
				</form>
			</div>
			<button type="button" class="btn btn-default new-btn" @click="showPop()">新建分类</button>
		</div>
		<p v-if="count === 0">暂无数据！</p>
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
					<tr v-for="item in listData">
						<td>{{item.name}}</td>
						<td>{{item._id}}</td>
						<td>
							<button @click="showPop(item)">修改</button>
							|
							<button @click="doDelete(item._id)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>
			<Pages :totalCount="count" @currentpage="getCurr"></Pages>
		</div>
		<PublicFooter></PublicFooter>

		<ModalDialog :show.sync="show">
			<h2 slot="header">
				{{ item.id ? '修改分类' : '新建分类' }}
			</h2>
			<template slot="body">
				<div class="form-group" :class="{ 'form-group--error': $v.item.selected.$error }">
					<select class="form-control" v-model.trim="item.selected" @blur="$v.item.selected.$touch()">
						<option v-for="option in typeOptions" :value="option.value">{{ option.text }}</option>
					</select>
					<span class="form-group__message" v-if="!$v.item.selected.required">请选择所属类别！</span>
				</div>
				<div class="form-group" :class="{ 'form-group--error': $v.item.name.$error }">
					<input class="form-control" type="text" v-model.trim="item.name" @blur="$v.item.name.$touch()">
					<span class="form-group__message" v-if="!$v.item.name.required">请输入分类名称！</span>
				</div>
				<div class="form-group">
					<button class="btn btn-default" :disabled="$v.item.selected.$invalid || $v.item.name.$invalid" @click="doSave()">提交</button>
					<button class="btn btn-default" @click="closePop()">取消</button>
				</div>
			</template>
		</ModalDialog>
	</div>
</template>

<script>
    import * as api from '../api/index'
    import { required } from 'vuelidate/lib/validators'
    import {COUNT_PERPAGE} from '../../config/global.config'

    import Pages from './Pages.vue'
    import PublicFooter from './PublicFooter.vue'
    import ModalDialog from './ModalDialog.vue'

    export default {
        data () {
            return {
                listData: {},
                count: 0,
                curr: 1,
                searchKey: '',
                platform: 'pc',
                category: 'types',
                show: false,
                item: {
                    selected: '',
                    name: '',
                    id: ''
                },
                typeOptions: [
                    { text: '选择所属类别', value: '' },
                    { text: '类别', value: 'pc-types' }
                ]
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
        validations: {
            item: {
                selected: {
                    required
                },
                name: {
                    required
                }
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.getList(this.platform, this.category, this.conditions)
            })
        },
        components: {
            Pages,
            PublicFooter,
            ModalDialog
        },
        watch: {
            show (newVal) {
                if (!newVal) {
                    this.item = {
                        selected: '',
                        name: '',
                        id: ''
                    }
                }
            }
        },
        methods: {
            getList (p, c, params) {
                api.fetchTags(p, c, params).then((response) => {
                    if (response.status === 200) {
                        this.listData = response.data.data
                        this.count = response.data.count
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            getCurr (data) {
                this.curr = data
                this.getList(this.platform, this.category, this.conditions)
            },
            doSearch () {
                this.curr = 1
                this.getList(this.platform, this.category, this.conditions)
            },
            showPop (i) {
                if (i) {
                    this.item.selected = `${i.platform}-${i.category}`
                    this.item.name = i.name
                    this.item.id = i._id
                }

                this.show = true
            },
            closePop () {
                this.show = false
            },
            doSave () {
                this.item.id ? this.doUpdate() : this.doCreate()
                this.show = false
            },
            doUpdate () {
                let arr = this.item.selected.split('-')
                let params = {
                    name: this.item.name,
                    platform: arr[0],
                    category: arr[1]
                }

                api.updateTag(this.item.id, params).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        this.getList(this.platform, this.category, this.conditions)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            doCreate () {
                let arr = this.item.selected.split('-')
                let params = {
                    name: this.item.name,
                    platform: arr[0],
                    category: arr[1]
                }

                api.createTag(params).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        this.getList(this.platform, this.category, this.conditions)
                    }
                }).catch((err) => {
                    alert(err.response.data.msg)
                })
            },
            doDelete (id) {
                api.deleteTag(id).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        alert('删除成功')
                        this.getList(this.platform, this.category, this.conditions)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style>
	.action-bar .new-btn{ position: absolute; right: 0; }
</style>
