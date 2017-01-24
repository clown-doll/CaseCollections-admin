<template>
	<div class="pops">
		<div class="mask"></div>
		<div class="pops-con">
			<div class="form-wrap">
				<form @submit.prevent="handleSubmit">
					{{selected}}
					{{name}}
					<h2>修改分类</h2>
					<div class="form-group">
						<select class="form-control"  v-model="selected">
							<option v-for="option in typeOptions" v-bind:value="option.value">{{ option.text }}</option>
						</select>
					</div>
					<div class="form-group">
						<input id="name"  class="form-control" type="text" v-model="name">
					</div>
					<div class="form-group">
						<input class="btn btn-default" type="submit"  :disabled="invalid">
						<a class="btn btn-default" href="javascript:;" v-on:click="cancel()">取消</a>
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
		props: ['showModify', 'currItem'],
		data: function () {
			return {
				selfShow: this.showModify,
				typeOptions: [
					{ text: '选择所属类别', value: '' },
					{ text: 'PC端类别', value: 'pc-types' },
					{ text: '移动端类别', value: 'wap-types' },
					{ text: '移动端玩法', value: 'wap-ways' }
				],
				name: this.currItem.name,
				apiUrl: `${API_ROOT}/tags/${this.currItem._id}`,
				selected: ''
			}
		},
		created: function () {
			this.selected = `${this.currItem.platform}-${this.currItem.category}`;
		},
		computed: {
			errors () {
				return this.$vuerify.$errors
			},
			invalid () {
				return this.$vuerify.invalid
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
		watch: {
			showModify(val){
				this.selfShow = val;
			},
			selfShow(val){
				this.$emit("on-modify", val);
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

					this.$http.put(this.apiUrl, params)
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