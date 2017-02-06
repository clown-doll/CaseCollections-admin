<template>
	<div class="pops">
		<div class="mask"></div>
		<div class="pops-con">
			<div class="form-wrap">
				<form @submit.prevent="handleSubmit">
					<h2>新建分类</h2>
					<div class="form-group">
						<select class="form-control" v-model="selected">
							<!--<option value="">请选择</option>
							<option value="pc">pc</option>-->
							<option v-for="option in typeOptions" :value="option.value">{{ option.text }}</option>
						</select>
					</div>
					<div class="form-group">
						<input id="name"  class="form-control" type="text" v-model="name">
					</div>
					<div class="form-group">
						<input class="btn btn-default" type="submit" :disabled="invalid">
						<button class="btn btn-default" @click="cancel()">取消</button>
					</div>
				</form>
				<ul><li v-for="err in errors" v-text="err"></li></ul>
				<div class="separator">
					<h1><img src="../../assets/images/logo.png" alt="99知识平台"></h1>
					<p>Copyright © <a href="http://f2e.tming.net.cn/" target="_blank">F2E.TMING</a>All Rights Reserved. </p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {API_ROOT} from '../../config';

	export default {
		props: ['show'],
		data: function () {
			return {
				selfShow: this.show,
				selected: '',
				typeOptions: [
					{ text: '选择所属类别', value: '' },
					{ text: 'PC端类别', value: 'pc-types' },
					{ text: '移动端类别', value: 'wap-types' },
					{ text: '移动端玩法', value: 'wap-ways' }
				],
				name: '',
				apiUrl: `${API_ROOT}/tags`
			}
		},
		computed: {
			errors () {
				return this.$vuerify.$errors
			},
			invalid () {
				return this.$vuerify.invalid
			}
		},
		watch: {
			show(val){
				this.selfShow = val;
			},
			selfShow(val){
				this.$emit("on-change", val);
			}
		},
		vuerify: {
			name: {
				test: 'required',
				message: '请填写名称'
			},
			selected: {
				test: 'required',
				message: '请选择所属分类'
			}
		},
		methods: {
			cancel: function () {
				this.selfShow = !this.selfShow;
			},
			handleSubmit: function () {
				if (this.$vuerify.check()) {
					var arr = this.selected.split('-');
					var params = {
						platform: arr[0],
						category: arr[1],
						name: this.name
					};

					this.$http.post(this.apiUrl, params)
						.then(function (response) {
							if (response.ok && response.status === 200) {
								this.selfShow = !this.selfShow;
								this.$parent.getDefaultList();
							}
						})
						.catch(function (response) {
							console.log(response);
						});
				}
			}
		}
	}
</script>

<style>
	.pops{ position: fixed; left: 50%; margin-left: -175px; top: 10%; z-index: 9999;}
	.pops .mask{ position: fixed; left: 0; top:0 ; width: 100%; height: 100%; background-color: #000; opacity: 0.8; }
	.pops-con{ position: relative; background-color: #fff; padding:10px 45px; border-radius: 8px;}
	.pops-con .form-wrap{ margin-top: 0; }
</style>