<template>
	<view class="content">
		<!-- left -->
		<view class="left">
			<scroll-view
				scroll-y
				class="scrollLeft"
				:scroll-top="leftScrollTop"
			>
				<view
					v-for="(item, index) in goodsList"
					:class="['scrollYItem', currentIndex === index ? 'scrollYItemActive': '' ]"
					:key="item.title" 
					@click="toggle(index)">
					<text style="letter-spacing: 1px;font-weight: 500;">
						{{item.title}}
					</text>
				</view>
			</scroll-view>
		</view>
		<!-- right -->
		<view class="right">
			<scroll-view
				scroll-y
				class="scrollRight"
				:scroll-into-view="right_title"	
				:lower-threshold="100"
				@scroll="rightScroll"
			>
				<view class="good" v-for="(item, index) in goodsList" :key="item.title">
					<view
						class="title"
						:id="`right_title_${index}`"
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
</template>

<script>
	export default {
		data() {
			return {
				classify: '',
				right_title: '',
				currentIndex: 0,
				goodsList: [],
				leftScrollTop: 0,
				oneLeftItemHeight: 0,
				AllLeftTopList: [],
				AllRightTopList: []
			}
		},
		onLoad(data) {
			data.index && this.toggle(parseInt(data.index))
		},
		onReady() {
			this.$nextTick(()=> {
				this.getNodeInfo()
			})
		},
		methods: {
			toggle(index) {
				this.currentIndex = index
				this.right_title = 'right_title_' + index
			},
			createList () {
				// let classifyList = uni.getStorageSync('iconList') 
				let classifyList = new Array(20).fill({ text: 1 })
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
			rightScroll(e) {
				let rigthtScrollTop = e.detail.scrollTop + 1
				let left_index = this.AllRightTopList.findIndex(value => rigthtScrollTop < value)
				this.currentIndex = left_index ? left_index - 1 : left_index
			},
			getNodeInfo () {
				let query = uni.createSelectorQuery().in(this)
				// 左边每一项距离顶部高度
				query.selectAll('.scrollYItem').boundingClientRect(data => {
					this.AllLeftTopList = data.map(value => value.top + (0 - data[0].top))
					this.oneLeftItemHeight = this.AllLeftTopList[1] - this.AllLeftTopList[0]
				}).exec()
				// 右边每一项距离顶部高度
				query.selectAll('.title').boundingClientRect(data => {
					this.AllRightTopList = data.map(value => value.top + (0 - data[0].top))
				}).exec()
			}
		},
		watch: {
			'currentIndex' (newV) {
				setTimeout(() => {
					let query = uni.createSelectorQuery()
					query.select('.scrollLeft').fields({
						size: true,
						scrollOffset: true
					}, res => {
						let currentTop = this.AllLeftTopList[newV]
						// 当前项距离顶部的距离 + 该项高 > 当前可用屏高 + 当前卷曲的距离, 那就向下滚动
						if (currentTop + this.oneLeftItemHeight > res.height + res.scrollTop) {
							if (this.currentIndex === this.goodsList.length) return
							this.leftScrollTop = currentTop +  this.oneLeftItemHeight - res.height
						}
						// 当前项距离顶部距离 < 当前卷曲的距离，直那就向上滚动
						if (currentTop < res.scrollTop) {
							this.leftScrollTop = currentTop
						}
					}).exec()
				}, 0)
			}
		},
		created () {
			this.createList()
		}
	}
</script>

<style scoped lang="scss">
	.content {
		// height: calc(100vh - 88rpx);
		height: 100%;
		width: 100%;
		display: flex;
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
		margin-bottom: 60rpx;
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
