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
			}
		}
	}
</script>

<style lang="scss">
	.cardBody {
		display: flex;
		padding: 12rpx 0;
		border-bottom: 1px solid #ccc;
	}

	.img {
		height: 220rpx;
		width: 240rpx;
		background-color: $baseColor;
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
		font-size: 36rpx;
		color: $baseColor;
	}

	.oldPrice {
		font-size: 24rpx;
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
		width: 46rpx;
		height: 46rpx;
		border-radius: 50%;
		background-color: $baseColor;
		color: #fff;
		text-align: center;
		line-height: 46rpx;
		font-size: 36rpx;
	}
</style>
