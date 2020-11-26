<template>
	<view class="content">
		<view class="carIcon">
			<view style="font-size: 24rpx;padding: 0 15rpx;">
				<text>图</text>
				<text>￥1581.7</text>
			</view>
		</view>
		
		<view class="status_bar" />
		<view class="top">
			<view class="location" />
		</view>
		<view class="topSearch">
			<view class="searchBox" @click="gotoSearch">
				<view>
					<text>快来搜索您中意的商品吧~~</text>
				</view>
				<view style="padding-bottom: 5px;">
					<icon type="search" size="16"></icon>
				</view>
			</view>
		</view>

		<view class="swiper">
			<u-swiper :duration="300" :list="swiperList" mode="round" interval="3000" border-radius="5" height="300" />
		</view>

		<view style="padding: 20rpx;display: flex; flex-wrap: wrap;border-bottom: 18rpx solid #eee;">
			<view v-for="(item, i) in iconList" :key="i" style="width: 142rpx;color: #444;text-align: center;margin-bottom: 15rpx;"
			 @click="gotoClassify(i)">
				<view :class="`iconfont ${item.icon}`" style="font-size: 60rpx;" />
				<text style="font-size: 25rpx;">{{item.text}}</text>
			</view>
		</view>

		<view style="padding: 20rpx;">
			<view style="color: #1677b3;font-size: 32rpx;text-align: center;border-bottom: 1px solid #eee;padding-bottom: 15rpx;">本周热销
				&gt;</view>
		</view>

		<view style="padding: 0 20rpx 5rpx; border-bottom: 18rpx solid #eee;">
			<scroll-view scroll-x class="scroll">
				<view class="scrollView" v-for="item in hotSale" :key="item.id" @click="gotoGoodDetail">
					<view class="goodImg">
						图片
					</view>
					<view class="goodTitle">{{item.title}}</view>
					<view style="font-size: 22rpx;display: flex;align-items: center;justify-content: space-around;margin: 15rpx 0;">
						<view style="width: 100rpx;font-size: 36rpx;color: red;">￥{{item.new_price}}</view>
						<view style="text-decoration: line-through;color: #999;">￥{{item.old_price}}</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view style="padding: 20rpx;">
			<view style="color: #1677b3;font-size: 32rpx;text-align: center;border-bottom: 1px solid #eee;padding-bottom: 15rpx;">店家推荐
				&gt;</view>
		</view>
		<view style="padding: 0 20rpx 10rpx; border-bottom: 18rpx solid #eee;">
			<scroll-view scroll-x class="scroll">
				<view class="scrollView" v-for="item in recommend" :key="item.id" @click="gotoGoodDetail(item.id)">
					<view class="goodImg">
						图片
					</view>
					<view class="goodTitle">{{item.title}}</view>
					<view style="font-size: 22rpx">
						<view style="text-align: center;font-size: 34rpx;color: #1677b3;margin: 5rpx 0">￥{{item.new_price}}</view>
						<view style="width: 140rpx;margin: 0 auto;background-color: #1677b3;text-align: center;border-radius: 15rpx;padding: 5rpx 0;">
							<text style="color: #fff;letter-spacing: 1px;font-size: 26rpx;">＋购物车</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view style="padding: 20rpx;border-bottom: 18rpx solid #eee;">
			<view>
				<text style="color: #1677b3;font-weight: bold;font-size: 36rpx;letter-spacing: 1px;">好货优选</text>
			</view>
			<view>
				<card :data="item" v-for="item in cardList" :key=item.id></card>
				<view style="text-align: center;font-size: 30rpx;color: #666;margin-top: 15rpx;">更多 &gt;</view>
			</view>
		</view>
		<view style="height: 300rpx; padding: 20rpx;">
			<text style="color: $baseColor;font-weight: bold;font-size: 36rpx;letter-spacing: 1px;">人气商品</text>
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
				iconList: [{
						icon: 'icon-shuiguo',
						text: '水果'
					},
					{
						icon: 'icon-haixian',
						text: '海鲜'
					},
					{
						icon: 'icon-jitui',
						text: '熟食'
					},
					{
						icon: 'icon-rou',
						text: '肉类'
					},
					{
						icon: 'icon-huluobu',
						text: '蔬菜'
					},
					{
						icon: 'icon-pijiu',
						text: '酒水'
					},
					{
						icon: 'icon-lingshi',
						text: '休闲食品'
					},
					{
						icon: 'icon-riyongpin',
						text: '日用品'
					},
					{
						icon: 'icon-yinliao',
						text: '奶茶甜品'
					},
					{
						icon: 'icon-gengduo',
						text: '更多'
					}
				],
				recommend: new Array(20).fill({
					title: '康师傅红烧牛肉面20桶装康师傅红烧牛肉面20桶装',
					new_price: 66,
					old_price: 99
				}),
				hotSale: new Array(20).fill({
					title: '康师傅红烧牛肉面20桶装康师傅红烧牛肉面20桶装',
					new_price: 66,
					old_price: 99
				})
			}
		},
		onLoad() {},
		methods: {
			gotoSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			gotoClassify(index) {
				uni.navigateTo({
					url: '../classify/classify?index=' + index
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
		},
		computed: {
			cardList() {
				return this.hotSale.map((value, index) => ({ ...value,
					id: index,
					remark: ['巨他妈好吃'],
					specs: '96g/桶'
				}))
			}
		}

	}
</script>

<style lang="scss">
	.content{
		height: 100%;
		position: relative;
	}
	.status_bar{
		height: var(--status-bar-height);
		width: 100%;
		background-color: #1677b3;
		position: fixed;
		z-index: 999;
		top:0;
	}
	.topSearch {
		background-color: $baseColor;
		height: 90rpx;
		width: 100%;
		position: fixed;
		top: var(--status-bar-height);
		left: 0;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.searchBox {
		width: 85%;
		margin: 0 auto;
		height: 70rpx;
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
		background-color: $baseColor;
		color: #fff;
		z-index: 999;
		border-top-right-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		line-height: 60rpx;
	}
	.swiper{
		margin: calc(var(--status-bar-height) + 90rpx + 6rpx) 0 6rpx;
	}
	.goodImg {
		width: 100%;
		height: 160rpx;
		background-color: $baseColor;
	}

	.goodTitle {
		font-size: 24rpx;
		white-space: normal;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		margin-top: 10rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.top {
		background-color: $baseColor;
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
	}

	.scrollView {
		display: inline-block;
		height: 100%;
		width: 200rpx;
		margin-right: 16rpx;
	}

	.scrollView:last-child {
		margin-right: 0;
	}
</style>
