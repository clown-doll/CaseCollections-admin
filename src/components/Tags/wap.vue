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
						<input type="text" class="form-control" placeholder="标题/关键词" v-model.trim="searchKey">
					</div>
					<button type="button" class="btn btn-default" @click="doSearch()">搜索</button>
				</form>
			</div>
			<button type="button" class="btn btn-default new-btn" @click="showPop()">新建分类</button>
		</div>
		<ul class="nav nav-tabs bar-tabs">
			<li :class="{ active: belongto === 'WapTypes' }">
				<button @click="toggleCon('WapTypes')">类别</button>
			</li>
			<li :class="{ active: belongto === 'WapWays' }">
				<button @click="toggleCon('WapWays')">玩法</button>
			</li>
		</ul>

		<component v-bind:is="belongto"></component>

		<PublicFooter></PublicFooter>
		<CreateTag v-if="show" :show.sync="show" @on-change="onChange"></CreateTag>
	</div>
</template>

<script>
	import {API_ROOT, COUNT_PERPAGE} from '../../config';

	import PublicFooter from '../Home/footer.vue';
	import Pages from '../Home/pages.vue';
    import CreateTag from './create.vue';

    import WapTypes from './wapTypes.vue';
    import WapWays from './wapWays.vue';



	export default {
		data: function () {
			return {
                show: false,
                searchKey: null,
				belongto: 'WapTypes'
			}
		},
		components: {
			PublicFooter,
			Pages,
            CreateTag,
            WapTypes,
            WapWays
		},
		methods: {
            showPop: function () {
                this.show = !this.show;
            },
            onChange: function (val) {
                this.show = val;
            },
            toggleCon: function (val) {
				this.belongto = val;
				this.searchKey = '';
            },
            doSearch: function () {
				for (var i of this.$children) {
				    console.log(i.listApiUrl);
				    if (i.listApiUrl) {
                        if (this.searchKey) {
                            var keyword = this.searchKey;
                            var url = `${i.listApiUrl}?currentPage=${i.curr}&itemsPerPage=${COUNT_PERPAGE}&key=${keyword}`;
                            i.doGet(url);
                        } else {
                            i.getDefaultList();
                        }
					}
				}
            }
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
	ul.bar-tabs>li.active button {
		background:#fff;
		border-color:transparent;
	}
	ul.bar-tabs>li button {
		padding:10px 17px;
		background:#F5F7FA;
		margin:0;
		border-radius:0;
		border: none
	}
	ul.bar-tabs.right {
		padding-right:14px
	}
	ul.bar-tabs.right li {
		float:right
	}
</style>