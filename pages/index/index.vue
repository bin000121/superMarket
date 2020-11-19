<template>
	<view class="content">
		<view class="carIcon">
			<view style="font-size: 24rpx;padding: 0 15rpx;">
				<text>图</text>
				<text>￥1581.7</text>
			</view>
		</view>

		<view class="top">
			<view class="location">
			</view>
		</view>
		<view class="topSearch">
			<view class="searchBox" @click="gotoSearch">
				<view>
					<text>快来搜索您中意的商品吧~~</text>
				</view>
				<view style="padding-top: 10rpx;">
					<icon type="search" size="18"></icon>
				</view>
			</view>
		</view>

		<view style="margin: 90rpx 0 15rpx;">
			<u-swiper :list="swiperList" mode="round" interval="3000" border-radius="15" height="300" :effect3d="true">

			</u-swiper>
		</view>

		<view style="padding: 20rpx;display: flex; flex-wrap: wrap;border-bottom: 18rpx solid #eee;">
			<view v-for="(item, i) in iconList" :key="i" style="width: 142rpx;color: #444;text-align: center;margin-bottom: 15rpx;"
			 @click="gotoClassify(i)">
				<view :class="item.icon" style="font-size: 60rpx;"></view>
				<text style="font-size: 25rpx;">{{item.text}}</text>
			</view>
		</view>

		<view style="padding: 20rpx;">
			<view style="color: #0dab2b;font-size: 32rpx;text-align: center;border-bottom: 1px solid #eee;padding-bottom: 15rpx;">本周热销
				&gt;</view>
		</view>

		<view style="padding: 0 20rpx 5rpx; border-bottom: 18rpx solid #eee;">
			<scroll-view scroll-x class="scroll">
				<view class="scrollView" v-for="item in hotSale" :key="item.id" @click="gotoGoodDetail">
					<view style="width: 100%;height: 160rpx;background-color: #0DAB2B;">
						图片
					</view>
					<view style="font-size: 24rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;margin-top: 10rpx;">{{item.title}}</view>
					<view style="font-size: 22rpx;display: flex;align-items: center;justify-content: space-around;margin-top: 30rpx;">
						<view style="width: 100rpx;font-size: 36rpx;color: red;">￥{{item.new_price}}</view>
						<view style="text-decoration: line-through;color: #999;">￥{{item.old_price}}</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view style="padding: 20rpx;">
			<view style="color: #0dab2b;font-size: 32rpx;text-align: center;border-bottom: 1px solid #eee;padding-bottom: 15rpx;">掌柜推荐
				&gt;</view>
		</view>
		<view style="padding: 0 20rpx 10rpx; border-bottom: 18rpx solid #eee;">
			<scroll-view scroll-x class="scroll">
				<view class="scrollView" v-for="item in recommend" :key="item.id" @click="gotoGoodDetail(item.id)">
					<view style="width: 100%;height: 140rpx;background-color: #0DAB2B;">
						图片
					</view>
					<view style="font-size: 26rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.title}}</view>
					<view style="font-size: 22rpx">
						<view style="text-align: center;font-size: 34rpx;color: #0DAB2B;margin: 5rpx 0">￥{{item.new_price}}</view>
						<view style="width: 140rpx;height: 50rpx;line-height: 50rpx;margin: 0 auto;background-color: #0DAB2B;text-align: center;border-radius: 15rpx;">
							<text style="color: #fff;letter-spacing: 1px;font-size: 26rpx;">＋购物车</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view style="padding: 20rpx;border-bottom: 18rpx solid #eee;">
			<view>
				<text style="color: #0DAB2B;font-weight: bold;font-size: 36rpx;letter-spacing: 1px;">银鹭优选</text>
			</view>
			<view>
				<card :data="item" v-for="item in cardList" :key=item.id></card>
				<view style="text-align: center;font-size: 30rpx;color: #666;margin-top: 15rpx;">更多 &gt;</view>
			</view>
		</view>
		<view style="height: 300rpx; padding: 20rpx;">
			<text style="color: #0DAB2B;font-weight: bold;font-size: 36rpx;letter-spacing: 1px;">人气商品</text>
		</view>

	</view>
</template>

<script>
	import card from '../../wxcomponents/card.vue'
	export default {
		data() {
			return {
				currentPage: 1,
				pageSize: 10,
				swiperList: [{
						image: '../../static/img/swipe1.png'
					},
					{
						image: '../../static/img/swipe2.png'
					},
					{
						image: '../../static/img/swipe3.png'
					},
					{
						image: '../../static/img/swipe4.png'
					}
				],
				iconList: [],
				recommend: [],
				hotSale: [],
				cardList: []
			}
		},
		onLoad() {},
		methods: {
			gotoSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			gotoClassify(data) {
				uni.navigateTo({
					url: '../classify/classify?index=' + data
				})
			},
			gotoGoodDetail() {
				uni.navigateTo({
					url: '../goodDetail/goodDetail'
				})
			},
			async getData() {
				let res = await this.$api.get('/good/info', {
					hotSale: true,
					recommend: true
				})
				if (res.data.code === 0) {
					let {
						cardList,
						recommend,
						hotSale
					} = res.data
					this.cardList = cardList
					this.recommend = recommend
					this.hotSale = hotSale
				}
			},
			async getClassify() {
				let res = await this.$api.get('/classify/info', {
					all: true
				})
				if (res.data.code === 0) {
					this.iconList = res.data.data
					uni.setStorageSync('iconList', this.iconList)
				}
			}
		},
		created() {
			this.getData()
			this.getClassify()
		},
		components: {
			card
		}

	}
</script>

<style>
	.topSearch {
		background-color: #0DAB2B;
		height: 80rpx;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.searchBox {
		width: 85%;
		margin: 0 auto;
		height: 60rpx;
		background-color: #fff;
		border-radius: 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 25rpx;
		color: #999;
	}

	.carIcon {
		position: fixed;
		left: 0;
		bottom: 15%;
		min-width: 100rpx;
		height: 60rpx;
		background-color: #0DAB2B;
		color: #fff;
		z-index: 999;
		border-top-right-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		line-height: 60rpx;
	}

	.top {
		background-color: #0dab2b;
		padding: 0 30rpx 16rpx;
		color: #fff;
		width: 100%;
		z-index: 999;
		position: fixed;
		top: -1rpx;
		left: 0;
	}

	.swiper-item {
		width: 90%;
		height: 100%;
		margin-left: 40rpx;
	}

	.scroll {
		white-space: nowrap;
		display: flex;
		color: #444;
		height: 280rpx;
	}

	.scrollView {
		display: inline-block;
		height: 100%;
		width: 200rpx;
		margin-right: 32rpx;
	}

	.scrollView:last-child {
		margin-right: 0;
	}
</style>
