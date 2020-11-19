<template>
	<view class="cardBody" @click="gotoDetail(data._id)">
		<view class="img">
			图片
		</view>
		<view style="flex: 1;display: flex;flex-direction: column;justify-content: space-between;">
			<view class="title">{{data.title}}</view>
			<view class="remark">{{`"${data.remark}"`}}</view>
			<view>
				<text class="specs">{{data.specs}}</text>
			</view>
			<view class="bottomBox">
				<view>
					<text class="newPrice">{{'￥' + data.new_price}}</text>
					<text class="oldPrice">{{'￥' + data.old_price}}</text>
				</view>
				<view>
					<view class="addButton" @click.stop="addToCar(data)">＋</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "card",
		props: {
			data: Object
		},
		data() {
			return {
				currentData: {}
			}
		},
		methods: {
			gotoDetail(id) {
				uni.navigateTo({
					url: '../goodDetail/goodDetail?goodId=' + id
				})
			},
			addToCar(data) {
				uni.showToast({
					icon:'success',
					mask: true,
					title:'已添加至购物车'
				})
				console.log(data);
			}
		}
	}
</script>

<style>
	.cardBody {
		display: flex;
		padding: 15rpx 0;
		border-bottom: 1px solid #ccc;
	}

	.img {
		height: 220rpx;
		width: 240rpx;
		background-color: #0DAB2B;
		margin-right: 15rpx;

	}

	.title {
		font-weight: bold;
		font-size: 33rpx;
		letter-spacing: 1px;
	}

	.remark {
		font-weight: 500;
		color: #999;
		font-size: 28rpx;
	}

	.specs {
		font-size: 26rpx;
		background-color: #eee;
		color: #444;
		text-align: center;
		font-weight: 500;
		letter-spacing: 1px;
		border-radius: 15rpx;
		padding: 0 20rpx;
	}

	.newPrice {
		font-size: 42rpx;
		color: #0DAB2B;
	}

	.oldPrice {
		font-size: 26rpx;
		color: #999;
		text-decoration: line-through;
		margin-left: 15rpx;
	}

	.bottomBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 20rpx;
	}

	.addButton {
		display: block;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-color: #0DAB2B;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
		font-size: 50rpx;
	}
</style>
