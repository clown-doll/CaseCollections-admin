<template>
	<div class="page-main">
		<div class="page-title">
			<h3>发布文章</h3>
		</div>
		<form>
			<div class="form-group">
				<label>文章标题</label>
				<input class="form-control" type="text">
			</div>
			<div class="form-group">
				<label>案例地址</label>
				<input class="form-control" type="text">
			</div>
			<div class="form-group">
				<label>文章内容</label>
			</div>
			<!--<div class="form-group">
				<label>封面图片</label>
				<input class="form-control">
				<input type="file">
			</div>-->
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
						<td>
							<button type="button" @click="uploadItem(file)">上传</button>
						</td>
					</tr>
				</table>

			</div>
			<p align="center">
				<button type="submit" class="btn  btn-success">发布</button>
			</p>
		</form>
	</div>
</template>

<script>
	import {API_ROOT} from '../../config';
    import VueFileUpload from 'vue-file-upload';

	export default {
		data: function () {
			return {
				//image: '',
				apiUrl: `${API_ROOT}/upload`,
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
                        console.log(file);
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
        components:{
            VueFileUpload
        },
        methods:{
            onStatus(file){
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
                console.log(files);
                this.files = files;
            },
            uploadItem(file){
                //单个文件上传
                file.upload();
            },
            uploadAll(){
                //上传所有文件
                this.$refs.vueFileUploader.uploadAll();
            }
        }
	}
</script>
