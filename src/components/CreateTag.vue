<template>
	<div class="pops">
		<div class="mask"></div>
		<div class="pops-con">
			<div class="form-wrap">
				<form>
					<h2>新建分类</h2>
					<div class="form-group">
						<select class="form-control">
							<option value="1">2222</option>
						</select>
					</div>
					<div class="form-group">
						<input class="form-control" type="text">
					</div>
					<div class="form-group">
						<input class="btn btn-default" type="submit" >
						<button class="btn btn-default"">取消</button>
					</div>
				</form>
				<div class="separator">
					<Logo></Logo>
					<Copyright></Copyright>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import Logo from './Logo.vue'
    import Copyright from './Copyright.vue'

    export default {
        components: {
            Logo,
            Copyright
        }
    }
</script>

<style>
	.pops{ position: fixed; left: 50%; margin-left: -175px; top: 10%; z-index: 9999;}
	.pops .mask{ position: fixed; left: 0; top:0 ; width: 100%; height: 100%; background-color: #000; opacity: 0.8; }
	.pops-con{ position: relative; background-color: #fff; padding:10px 45px; border-radius: 8px;}
	.pops-con .form-wrap{ margin-top: 0; }
</style>
