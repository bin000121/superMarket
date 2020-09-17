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
		<view style="background-color: #0DAB2B; height: 80rpx;width: 100%;position: fixed;top: 0;left: 0;z-index: 999;">
			<view style="width: 80%;margin: 0 auto;height: 70rpx;position: relative;" @click="gotoSearch">
				<input style="border-radius: 5rpx;text-align: center;background-color: #fff;height: 60rpx;"
				 placeholder="寻找您中意的商品" />
				 <view style="position: absolute;right: 20rpx;bottom: 20rpx;">
					 <icon type="search" size="18"></icon>
				 </view>
			</view>
		</view>

		<view style="margin: 90rpx 0 15rpx;">
			<u-swiper
				:list="swiperList"
				mode="round"
				interval="3000"
				border-radius="15"
				height="300"
				:effect3d="true">
				
			</u-swiper>
		</view>

		<view style="padding: 20rpx;display: flex; flex-wrap: wrap;border-bottom: 18rpx solid #eee;">
			<view v-for="(item,i) in iconList" :key="i" style="width: 142rpx;color: #444;text-align: center;margin-bottom: 15rpx;"
			 @click="gotoClassify(item.text)">
				<view :class="item.icon" style="font-size: 60rpx;"></view>
				<text style="font-size: 25rpx;">{{item.text}}</text>
			</view>
		</view>

		<view style="padding: 20rpx;">
			<view style="color: #0dab2b;font-size: 32rpx;text-align: center;border-bottom: 1px solid #eee;padding-bottom: 15rpx;">本周热销
				&gt;</view>
		</view>

		<view style="padding: 20rpx; border-bottom: 18rpx solid #eee;">
			<scroll-view scroll-x class="scroll">
				<view class="scrollView" v-for="item in 10" :key="item" @click="gotoGoodDetail">
					<view style="width: 100%;height: 160rpx;background-color: #0DAB2B;">
						图片
					</view>
					<view style="font-size: 24rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;margin-top: 10rpx;">康师傅冰红茶1.5L</view>
					<view style="font-size: 22rpx;display: flex;align-items: center;justify-content: space-around;margin-top: 30rpx;">
						<view style="width: 100rpx;font-size: 36rpx;color: red;">￥4.2</view>
						<view style="text-decoration: line-through;color: #999;">￥5.6</view>
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
				<view 
					class="scrollView" 
					v-for="item in 10" 
					:key="item" 
					@click="gotoGoodDetail(item.id)">
					<view style="width: 100%;height: 140rpx;background-color: #0DAB2B;">
						图片
					</view>
					<view style="font-size: 26rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">进口澳洲牛排200g</view>
					<view style="font-size: 22rpx">
						<view style="text-align: center;font-size: 34rpx;color: #0DAB2B;margin: 5rpx 0">￥42.0</view>
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
				<card :data="item" v-for="item in goodCardData" :key=item.id @data="addData"></card>
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
				swiperList: [
					{
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
				iconList: [{
						icon: 'iconfont icon-shuiguo',
						text: '水果'
					},
					{
						icon: 'iconfont icon-lingshi',
						text: '休闲食品'
					},
					{
						icon: 'iconfont icon-yinliao',
						text: '甜品'
					},
					{
						icon: 'iconfont icon-pijiu',
						text: '酒水'
					},
					{
						icon: 'iconfont icon-haixian',
						text: '海鲜'
					},
					{
						icon: 'iconfont icon-jitui',
						text: '熟食'
					},
					{
						icon: 'iconfont icon-rou',
						text: '肉类'
					},
					{
						icon: 'iconfont icon-riyongpin',
						text: '日用品'
					},
					{
						icon: 'iconfont icon-huluobu',
						text: '蔬菜'
					},
					{
						icon: 'iconfont icon-gengduo',
						text: '更多分类'
					},

				],

				goodCardData: [{
						title: '榄菊蚊香',
						description: '清新怡人 强效驱蚊',
						type: '10片/盒',
						newPrice: '15.6',
						oldPrice: '19.4',
						id: 0
					},
					{
						title: '六神花露水',
						description: '清凉快感 值得拥有',
						type: '195ml/瓶',
						newPrice: '22.6',
						oldPrice: '27.3',
						id: 1
					},
					{
						title: '进口澳洲龙虾',
						description: '清新怡人 强效驱蚊',
						type: '50g-70g/只',
						newPrice: '55.6',
						oldPrice: '61.8',
						id: 2
					}
				]
			}
		},
		onLoad () {
		
		},
		methods: {
			gotoSearch () {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			gotoClassify(data) {
				uni.navigateTo({
					url: '../classify/classify?classify=' + data
				})
			},
			gotoGoodDetail() {
				uni.navigateTo({
					url: '../goodDetail/goodDetail'
				})
			},
			addData(a) {
				console.log(a);
			}
		},
		components: {
			card
		}

	}
</script>

<style>
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
