<template>
	<view class="content">
		<view class="classify">
			<!-- left -->
			<view class="left">
				<scroll-view scroll-y class="scrollLeft" :scroll-top="leftScrollTop">
					<view :class="['scrollYItem', index==currentIndex?'scrollYItemActive':'']" v-for="(item, index) in goodsList" :key="item.title" @click="toggle(index)">
						<text style="letter-spacing: 1px;font-weight: 500;">
							{{item.title}}
						</text>
						<!-- <view :class="['indexBlock', item===currentIndex?'indexBlockAcitve': '']"></view> -->
					</view>
				</scroll-view>
			</view>
			<!-- right -->
			<view class="right">
				<scroll-view scroll-y class="scrollRight" @scroll="rightScroll" :scroll-top="rigthtScrollTop" scroll-with-animation>
					<view class="good" v-for="item in goodsList" :key="item.title">
						<view class="title">{{item.title}}</view>
						<view class="good_body" v-for="item2 in item.children" :key="item2.title">
							<view class="title2">{{item2.title}}</view>
							<view>{{item2.price}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classify: '',
				currentIndex: 0,
				arr: 15,
				goodsList: [],
				rigthtScrollTop: 0,
				leftScrollTop: 0
			}
		},
		onLoad(data) {
			this.classifyIndex = data.index
			this.toggle(data.index)
		},
		methods: {
			toggle(index) {
				if (!this.goodsList[index]) return false
				this.currentIndex = index
				let titleDistant = 30
				let gapDistant = (this.goodsList[index].children.length - 1) * 7.5
				let childrenDistant = this.goodsList[index].children.length * 75
				this.rigthtScrollTop = index * (titleDistant + gapDistant + childrenDistant)
			},
			createList () {
				let classifyList = uni.getStorageSync('iconList')
				classifyList.forEach((value, i) => {
					let obj = {
						title: value.text,
						children: []
					}
					for (let j=0; j < 3; j++){
						obj.children.push({
							title: `${value.text}-${i}-${j}`,
							price: '￥' + 3.5
						})
					}
					this.goodsList.push(obj)
				})
			},
			rightScroll (e) {
				let rigthtScrollTop = e.detail.scrollTop
				this.currentIndex = Math.floor(rigthtScrollTop / 270)
			}
		},
		created () {
			this.createList()
			this.toggle(this.classifyIndex)
		}
	}
</script>

<style scoped>
	.content {
		height: 100vh;
		width: 100%;
	}

	.classify {
		display: flex;
		height: 100%;
		position: relative;
	}
	.left{
		flex: 2;
		height: 100%;
		background-color: #eee;
	}
	.scrollLeft {
		height: 100%;
		font-size: 28rpx;
		box-sizing: border-box;
	}
	.scrollLeft view:last-child{
		margin-bottom: 30rpx;
	}
	.right {
		flex: 8;
		background-color: #fff;
	}
	.title {
		height: 150rpx;
		line-height: 150rpx;
		text-align: center;
		background-color: #07C160;
		color: #fff;
	}
	.scrollRight {
		height: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		padding-top: 0;
	}

	.scrollYItem {
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		background-color: #eee;
	}

	.scrollYItemActive {
		background-color: #fff;
	}

	.indexBlock {
		height: 45%;
		display: none;
		width: 6rpx;
		position: absolute;
		left: 6rpx;
		top: 50%;
		transform: translateY(-50%);
		background-color: #0DAB2B;
	}
	.indexBlockAcitve{
		display: block;
	}
	
	.good > .title {
		text-align: left;
		height: 60rpx;
		line-height: 60rpx;
	}
	.static{
		position: static;
	}
	.good:last-child .good_body:last-child {
		margin-bottom: 100rpx;
	}
	.good_body{
		height: 150rpx;
		background-color: pink;
		margin-bottom: 15rpx;
	}
	.good_body:last-child{
		margin-bottom: 0;
	}
</style>
