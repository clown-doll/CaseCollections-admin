<template>
	<div class="row">
		<div class="pages">
			<ul class="pagination">
				<li v-if="currentpage!==1">
					<a v-on:click="prevClick()">上一页</a>
				</li>
				<li v-for="index in pagenums"  v-bind:class="{ 'active': currentpage == index}">
					<a v-on:click="pageChange(index)">{{ index }}</a>
				</li>
				<li v-if="currentpage!==totlepage && totlepage !==0 ">
					<a v-on:click="nextClick()">下一页</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {API_ROOT, COUNT_PERPAGE} from '../../config';

	export default {
		props: {
			totalCount: {
				type: Number,
				default: 1,
				validator(value) {
					return value >= 0
				}
			}
		},
		data: function () {
			return {
				currentpage: 1,
				totlepage: 0,
				visiblepage: 5
			}
		},
		computed: {
			pagenums: function(){
				this.totlepage = Math.ceil(this.totalCount/COUNT_PERPAGE);

				var lowPage = 1;
				var highPage = this.totlepage;
				var pageArr = [];
				if(this.totlepage > this.visiblepage){
					var subVisiblePage = Math.ceil(this.visiblepage/2);
					if(this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage +1){
						lowPage = this.currentpage - subVisiblePage;
						highPage = this.currentpage + subVisiblePage -1;
					}else if(this.currentpage <= subVisiblePage){
						lowPage = 1;
						highPage = this.visiblepage;
					}else{
						lowPage = this.totlepage - this.visiblepage + 1;
						highPage = this.totlepage;
					}
				}

				while(lowPage <= highPage){
					pageArr.push(lowPage);
					lowPage ++;
				}

				return pageArr;
			}
		},
		methods: {
			pageChange: function(page){
				if (this.currentpage != page) {
					this.currentpage = page;
					this.$emit('page-change', this.currentpage);
				}
			},
			prevClick: function () {
				if (this.currentpage > 0) {
					this.currentpage--;
					this.$emit('page-change', this.currentpage)
				}
			},
			nextClick: function() {
				if (this.currentpage < this.totlepage) {
					this.currentpage++;
					this.$emit('page-change', this.currentpage)
				}
			}
		}
	}
</script>

<style>
	.pages{ text-align: right; }
</style>