<template>
	<div class="page-main" ref="publish">
		<div class="page-title publish-page-title">
			<h3>修改文章</h3>
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
									<input type="checkbox" :value="item._id" v-model.trim="pcTypesChk">{{item.name}}
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
									<input type="checkbox" :value="item._id" v-model.trim="wapTypesChk">{{item.name}}
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
									<input type="checkbox" :value="item._id" v-model.trim="wapWaysChk">{{item.name}}
								</label>
							</div>
						</div>
					</template>
					<!--/移动端玩法-->
					<input type="hidden" v-model="tags" @blur="$v.tags.$touch()">
				</div>

			</div>
			<div class="form-group" :class="{ 'form-group--error': $v.article.title.$error }">
				<label><span class="text-danger">*</span> 文章标题</label>
				<input class="form-control" type="text" v-model.trim="article.title" @blur="$v.article.title.$touch()">
				<span class="form-group__message" v-if="!$v.article.title.required">请填写文章标题！</span>
			</div>
			<div class="form-group" :class="{ 'form-group--error': $v.article.url.$error }">
				<label><span class="text-danger">*</span>案例地址</label>
				<input class="form-control" type="text" v-model.trim="article.url" @blur="$v.article.url.$touch()">
				<span class="form-group__message" v-if="!$v.article.url.required">请填写案例地址！</span>
			</div>
			<div class="form-group">
				<label><span class="text-danger">*</span>文章内容</label>
				<quillEditor
					ref="myTextEditor"
					:content="article.content"
					:config="editorOption"
					@change="onEditorChange($event)"
					@blur="$v.article.content.$touch()">
				</quillEditor>
				<span class="form-group__message" v-if="!$v.article.content.required">请输入文章内容！</span>
			</div>
			<div class="form-group">
				<label>封面图<span class="upload-tips">（允许上传.jpg, .png, .gif格式的图片）</span></label>
				<div class="img-file-wrap">
					<ul class="detail-img-list" v-if="article.cover[0]">
						<li v-for="(item, index) in article.cover">
							<img :src="item" alt="">
							<a href="javascript:;" @click="deleteImg('cover', index)" class="close">&times;</a>
						</li>
					</ul>
					<table class="img-list-table">
						<tr v-for="(file, index) in coverFiles">
							<!--<td>
								<input type="text" readonly :value="file.name"  class="form-control">
							</td>-->
							<td v-if="file.success">
								<span class="text-success">{{file.name}} - 上传成功</span>
							</td>
							<td v-if="file.error">
								<span class="text-danger">{{file.name}} - 上传失败</span>
							</td>
							<td><input type="hidden" id="cover" :value="file.response.images"></td>
						</tr>
					</table>
					<FileUpload v-show="coverFiles.length === 0"
						title="添加封面图"
						:auto="auto"
						:extensions="extensions"
						:events="events"
						:multiple="false"
						:files="coverFiles"
						ref="coverUpload">
					</FileUpload>
				</div>
				<!--<button v-if="coverUpload.active" type="submit" @click.prevent="coverUpload.active = !coverUpload.active" class="btn-upload">暂停上传</button>
				<button class="btn-upload" type="submit" @click.prevent="coverUpload.active = !coverUpload.active"  v-else>开始上传</button>-->
			</div>
			<div class="form-group">
				<label>页面预览图<span class="upload-tips">（允许上传.jpg, .png, .gif格式的图片）</span></label>
				<div class="img-file-wrap">
					<ul class="detail-img-list" v-if="article.preview[0]">
						<li v-for="(item, index) in article.preview">
							<img :src="item" alt="">
							<a href="javascript:;" @click="deleteImg('preview', index)" class="close">&times;</a>
						</li>
					</ul>
					<table class="img-list-table">
						<tr v-for="(file, index) in previewFiles">
							<!--<td>
								<input type="text" readonly :value="file.name"  class="form-control">
							</td>-->
							<td v-if="file.success">
								<span class="text-success">{{file.name}} - 上传成功</span>
							</td>
							<td v-if="file.error">
								<span class="text-danger">{{file.name}} - 上传失败</span>
							</td>
							<td><input type="hidden" :id="'preview-' + index" :value="file.response.images"></td>
						</tr>
					</table>
					<FileUpload
						title="添加预览图"
						:auto="auto"
						:events="events"
						:extensions="extensions"
						:multiple="true"
						:files="previewFiles"
						ref="previewUpload">
					</FileUpload>
				</div>
				<!--<button class="btn-upload" v-if="previewUpload.active" type="submit" @click.prevent="previewUpload.active = !previewUpload.active">暂停上传</button>
				<button class="btn-upload" type="submit" @click.prevent="previewUpload.active = !previewUpload.active"  v-else>开始上传</button>-->
			</div>
			<div class="form-group submit-group">
				<button class="btn-article" type="button" :disabled="$v.tags.$invalid || $v.article.title.$invalid || $v.article.url.$invalid || $v.article.content.$invalid" @click="saveArticle()">提交</button>
			</div>
		</form>
	</div>
</template>

<script>
    import * as api from '../api/index'
    import { required } from 'vuelidate/lib/validators'
    import FileUpload from 'vue-upload-component'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data () {
            return {
                wapTypesChk: [],
                wapWaysChk: [],
                pcTypesChk: [],
                pcTypesData: {},
                wapTypesData: {},
                wapWaysData: {},
                wapTypesShow: false,
                wapWaysShow: false,
                pcTypesShow: false,
                article: {
                    pctypes: [],
                    waptypes: [],
                    wapways: [],
                    cover: [],
                    preview: [],
                    title: '',
                    url: '',
                    content: ''
                },
                editorOption: {},
                extensions: 'gif,jpg,png',
                auto: true,
                coverFiles: [],
                previewFiles: [],
                coverUpload: [],
                previewUpload: [],
                events: {
                    add (file, component) {
                        if (this.$parent.auto) {
                            component.active = true
                        }
                        file.headers['X-Filename'] = encodeURIComponent(file.name)
                        file.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
                        file.data.finename = file.name
                        file.postAction = 'http://192.168.238.24:9000/admin/upload'
                    },
                    after (file, component) {
                        if (file.success) {
                            if (component.title.indexOf('封面') !== -1) {
                                this.$parent.article.cover.push(file.response.images)
                            }

                            if (component.title.indexOf('预览') !== -1) {
                                this.$parent.article.preview.push(file.response.images)
                            }
                        }
                    }
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            },
            tags () {
                return [...this.pcTypesChk, ...this.wapTypesChk, ...this.wapWaysChk]
            }
        },
        validations: {
            tags: {
                required
            },
            article: {
                title: {
                    required
                },
                url: {
                    required
                },
                content: {
                    required
                }
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.getArticleData(this.$route.params.aid)
                this.getTags('pc', 'types')
                this.getTags('wap', 'types')
                this.getTags('wap', 'ways')
                this.coverUpload = this.$refs.coverUpload.$data
                this.previewUpload = this.$refs.previewUpload.$data
            })
        },
        components: {
            FileUpload,
            quillEditor
        },
        methods: {
            getArticleData (id) {
                api.fetchSingleArticle(id).then((response) => {
                    if (response.status === 200) {
                        let articleData = response.data.data
                        this.article.title = articleData.title
                        this.article.url = articleData.case_url
                        this.article.content = articleData.content
                        this.article.cover = articleData.cover.split(',')
                        this.article.preview = articleData.preview.split(',')

                        for (var v of articleData.tags) {
                            var chkName = `${v.platform}${v.category.substring(0, 1).toUpperCase() + v.category.substring(1)}Chk`
                            switch (chkName) {
                                case 'wapTypesChk':
                                    this.wapTypesChk.push(v._id)
                                    break
                                case 'wapWaysChk':
                                    this.wapWaysChk.push(v._id)
                                    break
                                case 'pcTypesChk':
                                    this.pcTypesChk.push(v._id)
                                    break
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
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
            onEditorChange ({ editor, html, text }) {
                if (text.replace(/(^\s*)|(\s*$)/g, '')) {
                    this.article.content = html
                }
            },
            saveArticle () {
                let c = []
                if (this.coverFiles.length) {
                    c.push(document.getElementById('cover').value)
                }

                let p = []

                if (this.previewFiles.length) {
                    for (var i = 0; i < this.previewFiles.length; i++) {
                        p.push(document.getElementById(`preview-${i}`).value)
                    }
                }

                let params = {
                    title: this.article.title,
                    content: this.article.content,
                    case_url: this.article.url,
                    tags: this.tags,
                    cover: c,
                    preview: p
                }

                api.updateArticle(this.$route.params.aid, params).then((response) => {
                    if (response.status === 200 && response.data.success) {
                        this.$router.push({path: '/home/articles'})
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            deleteImg (type, index) {
                if (type === 'cover') {
                    this.article.cover.splice(0, 1)
                }

                if (type === 'preview') {
                    this.article.preview.splice(0, 1)
                }
            }
        }
    }
</script>
<style>
	.detail-img-list{ padding: 0; list-style: none}
	.detail-img-list li{
		position: relative;
		display: inline-block;
		width: 150px;
		padding: 15px 15px 15px 0;
	}
	.detail-img-list li .close{
		position: absolute;
		right: 0;
		top: 0;
		display: none;
	}
	.detail-img-list li:hover .close{
		display: block;
	}
	.detail-img-list li img{ width: 100%;}
</style>
