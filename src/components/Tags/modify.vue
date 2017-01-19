<template>
	<div class="pops">
		<div class="mask"></div>
		<div class="pops-con">
			<div class="form-wrap">
				<form>
					<h2>修改分类</h2>
					<div class="form-group">
						<select class="form-control">
							<option>选择所属类别</option>
							<option>移动端类别</option>
							<option>移动端玩法</option>
							<option>PC端类别</option>
						</select>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="分类名称" required />
					</div>
					<div class="form-group">
						<a class="btn btn-default" href="index.html">确定</a>
						<a class="btn btn-default" href="javascript:;" v-on:click="cancel()">取消</a>
					</div>
					<div class="separator">
						<h1><img src="../../assets/images/logo.png" alt="99知识平台"></h1>
						<p>Copyright © <a href="http://f2e.tming.net.cn/" target="_blank">F2E.TMING</a>All Rights Reserved. </p>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['showPop'],
		methods: {
			cancel: function () {
				console.log(112121);
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