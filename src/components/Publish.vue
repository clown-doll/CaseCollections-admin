<template>
	<div class="page-main">
		<div class="page-title publish-page-title">
			<h3>发布文章</h3>
		</div>
		<form>
			<div class="form-group">
				<label><span class="text-danger">*</span>文章分类</label>
				<div class="kind-group">
					<!--pc端类别-->
					<template v-if="pcTypesData.count > 0">
						<div class="checkbox">
							PC端类别
							<a class="collapse-link" @click="toggleKindGroup('pc-types')"><i class="fa fa-chevron-down"></i></a>
						</div>
						<div class="kind-sub-menu" v-show="pcTypesShow">
							<div class="checkbox kind-ti" v-for="item in pcTypesData.data">
								<label>
									<input type="checkbox" :value="item._id">{{item.name}}
								</label>
							</div>
						</div>
					</template>
					<!--/pc端类别-->
					<!--移动端类别-->
					<template v-if="wapTypesData.count > 0">
						<div class="checkbox">
							移动端类别
							<a class="collapse-link" @click="toggleKindGroup('wap-types')"><i class="fa fa-chevron-down"></i></a>
						</div>
						<div class="kind-sub-menu" v-show="wapTypesShow">
							<div class="checkbox kind-ti" v-for="item in wapTypesData.data">
								<label>
									<input type="checkbox" :value="item._id">{{item.name}}
								</label>
							</div>
						</div>
					</template>
					<!--/移动端类别-->
					<!--移动端玩法-->
					<template v-if="wapWaysData.count > 0">
						<div class="checkbox">
							移动端玩法
							<a class="collapse-link" @click="toggleKindGroup('wap-ways')"><i class="fa fa-chevron-down"></i></a>
						</div>
						<div class="kind-sub-menu" v-show="wapWaysShow">
							<div class="checkbox kind-ti" v-for="item in wapWaysData.data">
								<label>
									<input type="checkbox" :value="item._id">{{item.name}}
								</label>
							</div>
						</div>
					</template>
					<!--/移动端玩法-->
				</div>

			</div>
			<div class="form-group">
				<label><span class="text-danger">*</span> 文章标题</label>
				<input class="form-control" type="text">
			</div>
			<div class="form-group">
				<label><span class="text-danger">*</span>案例地址</label>
				<input class="form-control" type="text">
			</div>
			<div class="form-group">
				<label>封面图</label>
				<div class="img-file-wrap">
					<table>
						<tr v-for="(file, index) in files">
							<td>
								<input type="text" readonly :value="file.name">
							</td>
							<td @click="remove(file)">x</td>
						</tr>
					</table>
					<FileUpload
						title="+"
						:events="events"
						:size="size"
						:extensions="extensions"
						:accept="accept"
						:multiple="false"
						:files="files"
						:name="name"
						:drop="drop"
						ref="upload"
						post-action="http://192.168.238.24:9000/admin/upload"
						put-action="http://192.168.238.24:9000/admin/upload">
					</FileUpload>
				</div>

				<button v-if="upload.active" type="submit" @click.prevent="upload.active = !upload.active">Stop upload</button>
				<button v-else type="submit" @click.prevent="upload.active = !upload.active">Start upload</button>
			</div>
			<div class="form-group">
				<label>页面预览图</label>
		</form>
	</div>
</template>

<script>
    import * as api from '../api/index'
    import FileUpload from 'vue-upload-component'

    export default {
        data () {
            return {
                pcTypesData: {},
                wapTypesData: {},
                wapWaysData: {},
                wapTypesShow: false,
                wapWaysShow: false,
                pcTypesShow: false,
                size: 1024 * 1024 * 10,
                extensions: 'gif,jpg,png',
                accept: 'image/*',
                multiple: true,
                files: [],
                name: 'file',
                drop: false,
                auto: false,
                upload: [],
                events: {
                    add(file, component) {
                        console.log('add')
                        if (this.$parent.auto) {
                            component.active = true
                        }
                        file.headers['X-Filename'] = encodeURIComponent(file.name)
                        file.data.finename = file.name

                        // file.putAction = 'xxx'
                        // file.postAction = 'xxx'
                    },
                    progress(file, component) {
                        console.log('progress ' + file.progress)
                    },
                    after(file, component) {
                        console.log('after')
                    },
                    before(file, component) {
                        console.log('before')
                    }
                }
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.getTags('pc', 'types')
                this.getTags('wap', 'types')
                this.getTags('wap', 'ways')
                this.upload = this.$refs.upload.$data
            })
        },
        components: {
            FileUpload
        },
        methods: {
            getTags (p, c) {
                api.fetchTags(p, c).then((response) => {
                    if (response.status === 200) {
                        let conditions = `${p}-${c}`
                        switch (conditions) {
                            case 'pc-types':
                                this.pcTypesData = response.data
                                break
                            case 'wap-types':
                                this.wapTypesData = response.data
                                break
                            case 'wap-ways':
                                this.wapWaysData = response.data
                                break
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            toggleKindGroup (c) {
                switch (c) {
                    case 'wap-types':
                        this.wapTypesShow = !this.wapTypesShow
                        this.wapWaysShow = false
                        this.pcTypesShow = false
                        break
                    case 'wap-ways':
                        this.wapWaysShow = !this.wapWaysShow
                        this.wapTypesShow = false
                        this.pcTypesShow = false
                        break
                    case 'pc-types':
                        this.pcTypesShow = !this.pcTypesShow
                        this.wapWaysShow = false
                        this.wapTypesShow = false
                        break
                }
            },
            remove(file) {
                var index = this.files.indexOf(file)
                if (index !== -1) {
                    this.files.splice(index, 1)
                }
            }
        }
    }
</script>

<style>
	.publish-page-title h3{
		margin-bottom: 20px;
	}
	.kind-group {
		max-height: 500px;
		overflow-y: auto;
		margin: 0 0 10px 0
	}
	.kind-ti {
		text-indent: 1em
	}
	.row .collapse-link {
		margin-left:5px
	}
	.kind-group .radio, .kind-group .checkbox {
		margin-top:0
	}
	.kind-label {
		margin-top:10px
	}

</style>
