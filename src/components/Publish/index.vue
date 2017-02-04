<template>
	<div class="page-main">
		<div class="page-title publish-page-title">
			<h3>发布文章</h3>
		</div>
		<ul><li v-for="err in errors" v-text="err"></li></ul>
		<form @submit.prevent="handleSubmit">
			<div class="form-group">
				<label><span class="text-danger">*</span>文章分类</label>
				<div class="kind-group">
					<template v-if="wapTypes.count">
						<div class="checkbox">
							移动端类别
							<a class="collapse-link" v-on:click="toggleKindGroup('wap-types')"><i class="fa fa-chevron-down"></i></a>
						</div>
						<div class="kind-sub-menu" v-show="wapTypesShow">
							<div class="checkbox kind-ti" v-for="item in wapTypes.data">
								<label><input :value="item._id" type="checkbox" v-model="wapTypesChk">{{item.name}}</label>
							</div>
						</div>
					</template>
					<template v-if="wapWays.count">
						<div class="checkbox">
							移动端玩法
							<a class="collapse-link" v-on:click="toggleKindGroup('wap-ways')"><i class="fa fa-chevron-down"></i></a>
						</div>
						<div class="kind-sub-menu" v-show="wapWaysShow">
							<div class="checkbox kind-ti"  v-for="item in wapWays.data">
								<label for="item._id"><input :id="item._id" :value="item._id" type="checkbox" v-model="wapWaysChk">{{item.name}}</label>
							</div>
						</div>
					</template>
					<template v-if="pcTypes.count">
						<div class="checkbox">
							PC端类别
							<a class="collapse-link" v-on:click="toggleKindGroup('pc-types')"><i class="fa fa-chevron-down"></i></a>
						</div>
						<div class="kind-sub-menu" v-show="pcTypesShow">
							<div class="checkbox kind-ti"  v-for="item in pcTypes.data">
								<label><input :value="item._id" type="checkbox" v-model="pcTypesChk">{{item.name}}</label>
							</div>
						</div>
					</template>

				</div>
				<input type="hidden" v-model="resultKind">
			</div>
			<div class="form-group">
				<label><span class="text-danger">*</span> 文章标题</label>
				<input class="form-control" type="text" v-model="caseTitle">
			</div>
			<div class="form-group">
				<label><span class="text-danger">*</span>案例地址</label>
				<input class="form-control" type="text" v-model="caseUrl">
			</div>
			<div class="form-group">
				<label><span class="text-danger">*</span>文章内容</label>
				<VueEditor
					:use-save-button="false"
					@editor-updated="handleUpdatedContent">
				</VueEditor>
				<input type="hidden" v-model="content">
			</div>
			<div class="form-group">
				<label>图片上传（第一张为封面图片，其余为页面预览图）</label>
				<br>
				<VueFileUpload
					:url='apiUrl'
					ref="vueFileUploader"
					v-bind:filters = "filters"
					v-bind:events = 'cbEvents'
					v-bind:request-options = "reqopts"
					v-on:onAdd = "onAddItem"></VueFileUpload>

				<table class="table table-striped">
					<tr v-for='file in files'>
						<td>
							<input type="text"  class="form-control" readonly :value="file.name">
						</td>
						<td>
							{{file.size}}
						</td>
						<td>
							{{file.progress}}
						</td>
						<td>
							{{onStatus(file)}}
						</td>
						<!--<td>
							<button type="button" @click="uploadItem(file)">上传</button>
						</td>-->
					</tr>
					<tr>
						<td><button type="button" @click="uploadAll()">上传</button></td>
					</tr>
				</table>

			</div>

			<p align="center">
				<button type="submit" name="save-content">
					发布
				</button>
			</p>
		</form>
	</div>
</template>

<script>
	import {API_ROOT} from '../../config';
    import VueFileUpload from 'vue-file-upload';
    import { VueEditor } from 'vue2-editor';

	export default {
		data: function () {
			return {
                wapTypesChk: [],
                wapWaysChk: [],
                pcTypesChk: [],
				pcTypes: {},
                wapTypes: {},
                wapWays: {},
                wapTypesShow: false,
                wapWaysShow: false,
                pcTypesShow: false,
				wapTypesApiUrl: `${API_ROOT}/tags/wap/types`,
                wapWaysApiUrl: `${API_ROOT}/tags/wap/ways`,
                pcTypesApiUrl: `${API_ROOT}/tags/pc/types`,
                caseTitle: '',
                caseUrl: '',
                htmlFromEditor: null,
                apiUrl: `${API_ROOT}/upload`,
				images: [],
                files:[],
                filters:[
                    {
                        name:"imageFilter",
                        fn(file){
                            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                        }
                    }
                ],
                //回调函数绑定
                cbEvents:{
                    onCompleteUpload:(file,response,status,header)=>{
                        //console.log(file);
                        //console.log(response);
                        this.images.push(response.images);
                        console.log("finish upload;")
                    }
                },
                //xhr请求附带参数
                reqopts:{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    responseType:'json',
                    withCredentials:false
                }
			}
		},
		created: function () {
			var pcTypesPromise = this.getTypes(this.pcTypesApiUrl);
            var wapTypesPromise = this.getTypes(this.wapTypesApiUrl);
            var wapWaysPromise = this.getTypes(this.wapWaysApiUrl);
            pcTypesPromise.then(function (value){
                this.pcTypes = value;
            });
            wapTypesPromise.then(function (value){
                this.wapTypes = value;
            });
            wapWaysPromise.then(function (value){
                this.wapWays = value;
            });
        },
        computed: {
            errors () {
                return this.$vuerify.$errors
            },
			content () {
                return this.htmlFromEditor
			},
            resultKind () {
                return [...this.pcTypesChk, ...this.wapTypesChk, ...this.wapWaysChk]
			}
        },
        components:{
            VueFileUpload,
            VueEditor
        },
        vuerify: {
            resultKind: {
                test (val) {
                    return this.pcTypesChk.length || this.wapTypesChk.length || this.wapWaysChk.length;
                },
                message: '请选择分类'
            },
		    caseTitle: {
                test: 'required',
                message: '请输入标题'
            },
            caseUrl: {
                test: 'required',
                message: '请输入案例地址'
            },
            content: {
                test (val) {
                    return this.htmlFromEditor;
                },
                message: '请输入内容'
            }
        },
        methods:{
            onStatus(file){
                console.log(file);
                if(file.isSuccess){
					return "上传成功";
                }else if(file.isError){
                    return "上传失败";
                }else if(file.isUploading){
                    return "正在上传";
                }else{
                    return "待上传";
                }
            },
            onAddItem(files){
                this.files = files;
            },
            uploadItem(file){
                //单个文件上传
                file.upload();
            },
            uploadAll(){
                //上传所有文件
                this.$refs.vueFileUploader.uploadAll();
            },
            handleUpdatedContent: function (value) {
                this.htmlFromEditor = value
            },
            handleSubmit: function () {
                if (this.$vuerify.check()) {
                    var caseImages = this.images;

                    var params = {
                        title: this.caseTitle,
                        content: this.content,
                        case_url: this.caseUrl,
                        tags: this.resultKind,
                        cover: this.images.shift(),
                        preview: this.images
                    };

                    this.$http.post(`${API_ROOT}/articles`, params)
                        .then(function (response) {
                            if (response.ok && response.status === 200) {
                                console.log(response.data);
                                this.$router.push({path: '/home'});
                            }
                        })
                        .catch(function (response) {
                            //console.log(response);
                        });
                }
            },
            toggleKindGroup: function (c) {
				switch (c) {
					case 'wap-types':
					    this.wapTypesShow = !this.wapTypesShow;
					    break;
                    case 'wap-ways':
                        this.wapWaysShow = !this.wapWaysShow;
                        break;
                    case 'pc-types':
                        this.pcTypesShow = !this.pcTypesShow;
                        break;
				}
            },
			getTypes: function (url) {
                var p = this.$http.get(url)
                    .then(function (response) {
                        if (response.ok) {
							return response.data;
                        }
                    })
                    .catch(function (response) {

                    });
				return p;
            }
        }
	}
</script>

<style>
	.publish-page-title h3{
		margin-bottom: 20px;
	}
	.kind-group {
		max-height: 200px;
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
