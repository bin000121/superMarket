<template>
	<view class="goodDetail">
		<view :class="['toTop', showToTop?'show_toTop': '']" @click="gotoTop">
			<u-icon name="arrow-up" color="#666"></u-icon>
		</view>
		<view class="swiper">
			<swiper :indicator-dots="true" :interval="3000" :duration="500" indicator-color="rgba(255, 255, 255, .25)"
			 indicator-active-color="rgba(255, 255, 255, 1)">
				<swiper-item>
					<image class="swiper-item" src="../../static/img/swipe1.png">
				</swiper-item>

				<swiper-item>
					<image class="swiper-item" src="../../static/img/swipe2.png">
				</swiper-item>

				<swiper-item>
					<image class="swiper-item" src="../../static/img/swipe3.png">
				</swiper-item>

				<swiper-item>
					<image class="swiper-item" src="../../static/img/swipe4.png">
				</swiper-item>
			</swiper>
		</view>
		<view class="price">
			<view>
				<text style="color: red;font-size: 66rpx;font-weight: 500;">
					<text style="font-size: 40rpx;">￥</text>
					{{goodOne.new_price}}
				</text>
				<text style="margin-left: 20rpx;text-decoration: line-through;color: #ccc;font-size: 30rpx;">￥{{goodOne.old_price}}</text>
			</view>
			<view class="goodTitle">
				<text style="font-size: 34rpx;">
					{{goodOne.title}}
				</text>
			</view>
		</view>
		<view class="similar">
			<view style="text-align: center;">相似商品</view>
			<swiper @change="swiperChange" class="swiper" :interval="3000" :duration="500">
				<swiper-item>
					<view class="swiper-item">
						<view class="similarGood">
							<!-- <image src="../../static/img/swipe2.png" style="height: 240rpx;display: block;" /> -->
							<view class="similarGood_img">图片</view>
							<view style="height: 100rpx;">231232</view>
							<view style="display: flex;justify-content: space-between;padding: 0 12rpx;height: 60rpx;align-items: center;">
								<view style="color: red;">
									<text style="font-size: 30rpx;">￥</text>
									<text>7.88</text>
								</view>
								<view style="width: 40rpx;height: 40rpx;color: #fff;background-color: #0DAB2B;border-radius: 50%;line-height: 40rpx;">+</view>
							</view>
						</view>
						<view class="similarGood">
							<!-- <image src="../../static/img/swipe2.png" style="height: 240rpx;" /> -->
							<view class="similarGood_img">图片</view>
							<view>231232</view>
						</view>
						<view class="similarGood">
							<!-- <image src="../../static/img/swipe2.png" style="height: 240rpx;" /> -->
							<view class="similarGood_img">图片</view>
							<view>231232</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="similarGood">
							<!-- <image src="../../static/img/swipe2.png" style="height: 240rpx;" /> -->
							<view class="similarGood_img">图片</view>
							<view>231232</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view style="display: flex;justify-content: center;">
				<view v-for="(item, index) in 2" :key="index" :class="[currentIndex === index ? 'active' : '', 'swiperIndex']"></view>
			</view>
		</view>
		<view class="detailImg">
			<view style="display: flex;justify-content: center;position: relative;margin-bottom: 30rpx;">
				<view style="width: 45%;height: 5rpx;background-color: #eee;"></view>
				<view style="width: 15%;font-size: 30rpx;background-color: #fff;text-align: center;position: absolute;top: -18rpx;left: 50%;transform: translateX(-50%);letter-spacing: 2rpx;font-weight: 700;">详情</view>
			</view>
			<scroll-view scroll-y @scroll="handleScrollY">
				<view style="height: 1000rpx;background-color: pink;"></view>
				<view style="height: 1000rpx;background-color: blue;"></view>
				<view style="height: 1000rpx;background-color: orange;"></view>
			</scroll-view>
		</view>
		<view style="position: fixed;bottom: 0;left: 0;width: 100%;height: 100rpx;">
			<uniGoodsNav :buttonGroup="buttonGroup" :options="options" @click="likeGoods" @buttonClick="openPopup"></uniGoodsNav>
		</view>
		<u-popup 
			v-model="showPopup"
			height="1000"
			border-radius="30"
			closeable
			:duration="200"
			:safe-area-inset-bottom="true"
			mode="bottom">
			<view class="popupBody">
				<view class="popupBody_header">
					<view class="popupBody_header_img"></view>
					<view class="popupBody_header_desc">
						<view class="popupBody_header_desc_price">￥ 33.8</view>
						<view class="popupBody_header_desc_text">库存 23424 件</view>
						<view class="popupBody_header_desc_text">请选择 口味</view>
					</view>
				</view>
				<view class="goodNum">
					<view class="goodNum_text">商品数量</view>
					<view>
						<u-number-box 
							:min="1"
							:max="20"
							v-model="goodNum"
							@change="numberBoxChange"
							>
						</u-number-box>
					</view>
				</view>
				<view>
					<button class="footer_btn">确定</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import tool from '../../api/api.js'
	import uniGoodsNav from '../../components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				currentIndex: 0,
				scrollTop: 0,
				goodNum: 1,
				showToTop: false,
				showPopup: false,
				goodId: '',
				goodOne: {},
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#0DAB2B',
					color: '#fff'
				}],
				options: [{
					icon: 'heart',
					text: '收藏',
					size: 44,
					infoColor: '#0DAB2B'
				}]
			}
		},
		onPageScroll (e) {
		},
		onLoad (data) {
			this.goodId = data.goodId
		},
		created() {
			this.onPageScroll = this.$tool.throttle(() => {
				this.showToTop = e.scrollTop > 450
			}, 200)
			this.getGood()
		},
		methods: {
			gotoTop () {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				})
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current
			},
			handleScrollY(res) {
				console.log(res);
			},
			// 加入购物车
			openPopup() {
				this.showPopup = true
			},
			addCar(e) {
				uni.showToast({
					title: '已添加至购物车',
					mask: true
				})
				this.$refs.popup.close()
			},
			likeGoods () {
				if (this.options[0].icon === 'heart-filled') {
					uni.showToast({
						mask: true,
						icon: 'none',
						title: '取消收藏'
					})
					this.options[0].icon = 'heart'
				} else {
					uni.showToast({
						mask: true,
						title: '收藏成功'
					})
					this.options[0].icon = 'heart-filled'
				}
			},
			async getGood () {
				let res = await this.$api.get('/good/info', {
					id: this.goodId
				})
				if (res.data.code ===  0) {
					this.goodOne = res.data.goodOne
				}
			},
			numberBoxChange (e) {
				this.goodNum = e.value
			}
		},
		components: {
			uniGoodsNav
		}
	}
</script>

<style scoped>
	.goodDetail {
		height: 100%;
		position: relative;
	}

	.toTop {
		display: none;
		position: fixed;
		right: 20rpx;
		bottom: 18%;
		z-index: 999;
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50%;
		font-size: 42rpx;
		color: #777;
		background-color: #fff;
	}

	.show_toTop {
		display: block;
	}

	.swiper {
		text-align: center;
		height: 300rpx;
		margin: 30rpx 0;
	}

	.swiper-item {
		height: 100%;
		margin: 0 auto;
		display: block;
	}

	.similar {
		padding: 30rpx 0;
		border-bottom: 20rpx solid #eee;
	}

	.similar .swiper {
		text-align: center;
		height: 400rpx;
		margin: 10rpx 0 30rpx;
	}

	.similar .swiper-item {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.similarGood {
		background-color: #fff;
		width: 30%;
		height: 100%;
		border-radius: 24rpx;
		border: 1px solid #ccc;
		overflow: hidden;
	}

	.similarGood_img {
		height: 240rpx;
		background-color: #0DAB2B;
	}

	.swiperIndex {
		width: 26rpx;
		height: 5rpx;
		background-color: #eee;
		margin: 0 5rpx;
	}

	.swiperIndex.active {
		background-color: #0DAB2B;
	}

	.price {
		padding: 0 30rpx 15rpx;
		border-bottom: 20rpx solid #eee;
	}

	.detailImg {
		/* margin: 40rpx 0 100rpx; */
		margin-top: 40rpx;
		margin-bottom: 100rpx;
	}

	.popup {
		background-color: #fff;
		height: 400rpx;
		position: relative;
		z-index: 999;
	}

	.popup .btn {
		position: absolute;
		bottom: 10rpx;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		background-color: #ff0000;
		width: 90%;
		height: 80rpx;
		letter-spacing: 1px;
		font-size: 32rpx;
		line-height: 80rpx;
		border-radius: 50rpx;
	}

	.popup .banner {
		height: 200rpx;
		border-bottom: 1px solid #ccc;
		position: relative;
	}

	.banner .closeIcon {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		width: 45rpx;
		height: 45rpx;
		line-height: 45rpx;
		text-align: center;
		font-size: 52rpx;
		color: #999;
	}

	.banner .goodImg {
		height: 160rpx;
		width: 160rpx;
		border-radius: 20rpx;
		background-color: #fff;
		box-shadow: 2rpx 2rpx 5rpx #999;
		position: absolute;
		left: 30rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.banner .goodDesc {
		height: 100%;
		width: 450rpx;
		margin-left: 240rpx;
	}

	.goodDesc .goodDesc_title {
		font-size: 32rpx;
		font-weight: 700;
		height: 60rpx;
		padding-top: 10rpx;

	}

	.goodDesc .goodDesc_price {
		font-size: 50rpx;
		color: red;
	}

	.popupBody{
		padding: 30rpx 20rpx 15rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	
	.popupBody_header{
		display: flex;
		justify-content: space-between;
		height: 160rpx;
		margin-top: 30rpx;
	}
	.popupBody_header_img{
		background-color: #0DAB2B;
		width: 160rpx;
		height: 160rpx;
	}
	.popupBody_header_desc{
		flex: 1;
		height: 100%;
		padding-left: 45rpx;
	}
	.popupBody_header_desc_price{
		color: red;
		font-size: 40rpx;
		height: 60rpx;
		line-height: 60rpx;
	}
	.popupBody_header_desc_text{
		color: #666;
		height: 50rpx;
		font-size: 32rpx;
	}
	.popupBody_header_desc_text:last-child{
		color: #333;
	}
	.selection {
		flex: 1;
	}
	.goodNum {
		display: flex;
		height: 60rpx;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}
	.goodNum_text{
		font-size: 34rpx;
	}
	.footer_btn{
		background-color: #ED6A0C;
		border-radius: 60rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
		letter-spacing: 1px;
	}
</style>
