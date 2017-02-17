<template>
	<div class="rows">
		<div class="pages">
			<ul class="pagination">
				<li v-if="currentpage !== 1">
					<a href="javascript:;" @click="prevClick()">上一页</a>
				</li>
				<li v-for="index in pagenums"  :class="{ 'active': currentpage === index}">
					<a href="javascript:;" @click="pageChange(index)">{{ index }}</a>
				</li>
				<li v-if="currentpage !== totalpage && totalpage !==0 ">
					<a href="javascript:;" @click="nextClick()">下一页</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
    import Bus from '../Bus'
    import {COUNT_PERPAGE} from '../../config/global.config'

    export default {
        props: ['totalCount'],
        data () {
            return {
                currentpage: 1,
                totalpage: 0,
                visiblepage: 5
            }
        },
        components: {
            Bus
        },
        computed: {
            pagenums () {
                this.totalpage = Math.ceil(this.totalCount / COUNT_PERPAGE)

                let lowPage = 1
                let highPage = this.totalpage
                let pageArr = []

                if (this.totalpage > this.visiblepage) {
                    var subVisiblePage = Math.ceil(this.visiblepage / 2)

                    if (this.currentpage > subVisiblePage && this.currentpage < this.totalpage - subVisiblePage + 1) {
                        lowPage = this.currentpage - subVisiblePage
                        highPage = this.currentpage + subVisiblePage - 1
                    } else if (this.currentpage <= subVisiblePage){
                        lowPage = 1
                        highPage = this.visiblepage
                    } else {
                        lowPage = this.totalpage - this.visiblepage + 1
                        highPage = this.totalpage
                    }
                }

                while (lowPage <= highPage) {
                    pageArr.push(lowPage)
                    lowPage++
                }

                return pageArr
            }
        },
        methods: {
            pageChange (page) {
                if (this.currentpage !== page) {
                    this.currentpage = page
                    this.$emit('currentpage', this.currentpage)
                }
            },
            prevClick () {
                if (this.currentpage > 0) {
                    this.currentpage--
                    this.$emit('currentpage', this.currentpage)
                }
            },
            nextClick () {
                if (this.currentpage < this.totalpage) {
                    this.currentpage++
                    this.$emit('currentpage', this.currentpage)
                }
            }
        }
    }
</script>

<style>
	.pages{ text-align: right; }
	.pages .pagination{ margin: 0}
</style>
