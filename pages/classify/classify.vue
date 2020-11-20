<template>
	<view class="content">
		<view class="classify">
			<!-- left -->
			<view class="left">
				<scroll-view
					scroll-y
					class="scrollLeft"
				>
					<view
						:class="{'scrollYItem': true, 'scrollYItemActive': index === currentIndex }"
						v-for="(item, index) in goodsList"
						:key="item.title" 
						@click="toggle(index)">
						<text style="letter-spacing: 1px;font-weight: 500;">
							{{item.title}}
						</text>
						<!-- <view :class="['indexBlock', item===currentIndex?'indexBlockAcitve': '']"></view> -->
					</view>
				</scroll-view>
			</view>
			<!-- right -->
			<view class="right">
				<scroll-view
					scroll-y
					class="scrollRight"
					:scroll-into-view="subTitle"
					@scroll="rightScroll"
					scroll-with-animation
				>
					<view class="good" v-for="(item, index) in goodsList" :key="item.title">
						<view
							class="title"
							:id="`subTitle-${index}`"
						>{{item.title}}</view>
						<view
							class="good_body"
							v-for="item2 in item.children"
							:key="item2.title">
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
				subTitle: '',
				currentIndex: 0,
				goodsList: [],
				leftScrollTop: 0
			}
		},
		onLoad(data) {
			this.classifyIndex = data.index
			this.toggle(data.index)
		},
		methods: {
			toggle(index) {
				this.subTitle = 'subTitle-' + index
				this.currentIndex = index
			},
			createList () {
				let classifyList = uni.getStorageSync('iconList') || new Array(20).fill({ text: 1 })
				classifyList.forEach((value, i) => {
					let obj = {
						title: value.text + i,
						children: []
					}
					for (let j = 0; j < parseInt(Math.random() * 20 + 1); j++){
						obj.children.push({
							title: `${value.text}-${i}-${j}`,
							price: '￥' + 3.5 * (i + j + 1)
						})
					}
					this.goodsList.push(obj)
				})
			},
			rightScroll (e) {
				let rigthtScrollTop = e.detail.scrollTop
				console.log(rigthtScrollTop)
			}
		},
		created () {
			this.createList()
			this.toggle(this.classifyIndex)
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: calc(100vh - 88rpx);
		width: 100%;
		overflow: auto;
	}

	.classify {
		display: flex;
		height: 100%;
		position: relative;
	}
	.left{
		flex: 2;
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
		background-color: green;
		color: #fff;
	}
	
	.scrollRight {
		height: 100%;
		box-sizing: border-box;
		padding: 0 10rpx;
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
		background-color: $baseColor;
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
