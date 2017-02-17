<template>
	<div class="dialogs">
		<div class="dialog" :class="{ 'dialog-active': show }">
			<div class="dialog-content">
				<!--<div class="close rotate">
					<span class="iconfont icon-close" @click="close"></span>
				</div>-->
				<div class="form-wrap">
					<form>
						<slot name="header"></slot>
						<slot name="body"></slot>
						<slot name="footer"></slot>
					</form>
					<div class="separator">
						<Logo></Logo>
						<Copyright></Copyright>
					</div>
				</div>
			</div>
		</div>
		<div class="dialog-overlay"></div>
	</div>
</template>

<script>
    import Logo from './Logo.vue'
    import Copyright from './Copyright.vue'

    export default {
        props: ['show'],
        components: {
            Logo,
            Copyright
        },
        methods: {
            close: function() {
                this.show = false
            }
        }
    }
</script>

<style>
	.dialog {
		position: fixed;
		left: 50%;
		top: 1.8em;
		transform: translateX(-50%);
		z-index: 2000;
		visibility: hidden;
		backface-visibility: hidden;
		perspective: 1300px;
	}

	.dialog-active {
		visibility: visible;
	}

	.dialog-active .dialog-content {
		opacity: 1;
		transform: rotateY(0);
	}

	.dialog-active ~ .dialog-overlay {
		opacity: 1;
		visibility: visible;
	}

	.dialog-content {
		padding: 20px 30px;
		border-radius: 3px;
		background: #fff;
		overflow: hidden;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
		transition: .5s ease-in-out;
		opacity: 0;
		transform-style: preserve-3d;
		transform: rotateY(-70deg);
	}

	.dialog-header {
		background: #0090d3;
		color: #fff;
	}

	.dialog-title {
		margin: 0;
		font-size: 1.8em;
		text-align: center;
		font-weight: 200;
		line-height: 1.8em;
	}

	.dialog-body {
		padding: 2em;
	}

	.dialog-body .error {
		font-size: 1.2em;
		color: salmon;
	}

	.dialog-footer {
		margin: 0 2em;
		padding: 1em 0;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.dialog-overlay {
		content: "";
		position: fixed;
		visibility: hidden;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		opacity: 0;
		background: rgba(0, 0, 0, 0.5);
		transition: all .6s;
	}

	.dialog-content .form-wrap{margin: 0}
</style>
