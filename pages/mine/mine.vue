<template>
	<view class="mine">
		<view class="status_bar"/>
		<view class="header">
			<view class="avatarBox">
				<view class="avatarBox_avatar"></view>
				<view class="avatarBox_desc">
					<view class="avatarBox_desc_name">某某某</view>
					<view class="avatarBox_desc_phone">180****0111</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<view class="btn_box">
				<view class="icon"></view>
				<view class="title">123</view>	
			</view>
			<view class="btn_box">
				<view class="icon"></view>
				<view class="title">123</view>
			</view>
			<view class="btn_box">
				<view class="icon"></view>
				<view class="title">123</view>
			</view>
			<view class="btn_box">
				<view class="icon"></view>
				<view class="title">123</view>
			</view>
		</view>
		<view class="btnList">
			<view class="list_item" v-for="item in 6" :key="item" @click="goto">
				<view class="list_item_left">
					<view class="list_item_img"></view>
					<view class="list_item_text">收货地址</view>
				</view>
				<view class="list_item_right">
					<u-icon name="arrow-right" size="32" color= "#777"></u-icon>
				</view>
			</view>
		</view>
<!-- 		<view class="logout" @click="$refs.logout.open()">
			<text>退出登录</text>
		</view>
		<view class="version">
			<view class="version_text"><text>用户服务协议 · 隐私权政策</text></view>
			<view class="version_desc"><text>当前版本v2.6.3</text></view>
		</view> -->
	</view>
</template>

<script>
	import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			uniPopupDialog
		},
		data() {
			return {
				
			}
		},
		methods: {
			goto () {
				console.log(111)
				uni.navigateTo({
					url:'../goodDetail/goodDetail'
				})
			},
			confirmLogout () {
				console.log('完成登出')
				// uni.showToast({
					
				// })
			}
		},
		onLoad() {

		}
	}
</script>

<style scoped>
	.mine{
		height: 100%;
		width: 100%;
	}
	.header{
		width: 100%;
		height: 300rpx;
		background-color: pink;
		position: relative;
	}
	.avatarBox{
		position: absolute;
		left: 10%;
		top: 50%;
		transform: translateY(-50%);
		width: 360rpx;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
	}
	.avatarBox_avatar{
		height: 120rpx;
		width: 120rpx;
		background-color: #0DAB2B;
		border-radius: 50%;
	}
	.avatarBox_desc{
		width: 200rpx;
		height: 100%;
		color: #fff;
		font-size: 34rpx;
	}
	.avatarBox_desc_name{
		height: 70rpx;
	}
	.avatarBox_desc_phone{
		font-size: 32rpx;
	}
	.btn{
		display: flex;
		height: 130rpx;
		margin-bottom: 15rpx;
	}
	.btn .btn_box{
		flex: 1;
		height: 100%;
		text-align: center;
	}
	.icon_box{
		height: 80rpx;
		width: 80rpx;
		background-color: #fff;
		font-size: 30rpx;
	}
	.icon{
		width: 60rpx;
		height: 60rpx;
		margin: 15rpx auto 0;
		background-color: #0DAB2B;
	}
	.title{
		height: 45rpx;
		width: 100rpx;
		text-align: center;
		margin: 8rpx auto 0;
		font-size: 30rpx;
		letter-spacing: 2rpx;
	}
	.btnList {
		border-top: 20rpx solid #eee;
	}
	.list_item{
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		border-bottom: 1px solid #ccc;
	}
	.list_item:nth-child(3n){
		height: 100rpx;
		border-bottom: 20rpx solid #eee;
	}
	.list_item_left{
		width: 300rpx;
		height: 100%;
		padding-left: 60rpx;
		display: flex;
		align-items: center;
	}
	.list_item_right{
		height: 100%;
		line-height: 80rpx;
		width: 60rpx;
		background-color: #fff;
	}
	.list_item_img{
		height: 50rpx;
		width: 50rpx;
		background-color: #0DAB2B;
		margin: auto 0;
	}
	.list_item_text{
		font-size: 30rpx;
		margin-left: 30rpx;
	}
	.logout{
		height: 100rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
		letter-spacing: 2rpx;
		border-bottom: 20rpx solid #eee;
	}
	.version{
		height: 240rpx;
		background-color: #eee;
		font-size: 28rpx;
		text-align: center;
		padding-top: 15rpx;
	}
	.version_text{
		color: #999;
		margin-bottom: 60rpx;
	}
</style>
