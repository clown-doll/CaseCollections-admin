<template>
	<div class="footer">
		<div class="pull-right">
			<Copyright></Copyright>
			|
			<Logo></Logo>
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
	.footer{ margin-top: 30px;}
	.footer p {display: inline-block; margin-right: 8px;}
	.footer p a{ padding: 0 5px;}
	.footer p a:hover{ text-decoration: underline}
	.footer .logo{ margin-left: 8px;}
	.footer .logo strong{ font-weight: normal; font-size: 16px;}
</style>
