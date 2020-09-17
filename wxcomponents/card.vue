<template >
	<view style="display: flex;padding: 20rpx 0;border-bottom: 1px solid #ccc;">
		<view style="height: 240rpx;background-color: #0DAB2B;margin-right: 15rpx;flex: 2;">
			图片
		</view>
		<view style="flex: 3;display: flex;flex-direction: column;justify-content: space-between;">
			<view style="font-weight: bold;font-size: 40rpx;letter-spacing: 1px;">{{data.title}}</view>
			<view style="font-weight: 500;color: #999;font-size: 28rpx;">{{data.description}}</view>
			<view ><text style="font-size: 26rpx;background-color: #eee;color: #444;text-align: center;font-weight: 500;letter-spacing: 1px;border-radius: 15rpx;padding: 0 20rpx;">{{data.type}}</text></view>
			<view style="font-size: 50rpx;color: #0DAB2B;">
				<text>{{'￥'+data.newPrice}}</text>
				<text style="font-size: 30rpx;color: #999;text-decoration: line-through;margin-left: 15rpx;">{{'￥'+ data.oldPrice}}</text>
			</view>
		</view>
		<view style="position: relative;width: 100rpx;flex: 1;">
			<view style="width: 40rpx;height: 40rpx;border-radius: 50%;background-color: #0DAB2B;color: #fff;text-align: center;line-height: 38rpx;position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);" @click="addPrice(data)">＋</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "card",
		props: {
			data: Object
		},
		data(){
			return{
				currentData:{}
			}
		},
		methods:{
			addPrice(data){
				this.currentData=data
				this.$emit('data',this.currentData)
			}
		}
	}
</script>

<style>

</style>
