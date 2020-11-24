<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'uview-ui/index.scss';
	@import './uni.scss';
	@import url("./static/font/iconfont");
	view{
		box-sizing: border-box!important;
	}
	::-webkit-scrollbar{
		width: 0;
		height: 0;
		display: none!important;
	}
	html::-webkit-scrollbar,
	body::-webkit-scrollbar {
	    display: none;
	}
	uni-page-body,
	html,
	body {
		height: 100%;
		-webkit-overflow-scrolling: touch!important;
		overflow-scrolling: touch;
	}
	/* 使得ios滑动流畅 */
</style>
