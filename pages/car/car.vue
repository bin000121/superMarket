<template>
	<view class="shopCar" v-if="token && !empty">
		<view class="status_bar"></view>
		<view class="goodListBox">
			<view class="allGood">
				共 {{arr.length}} 件商品
			</view>
			<scroll-view scroll-y class="goodList">
				<view class="card" v-for="(item, index) in arr" :key="item.id">
					<view class="card_checkBox">
						<radio value="checked" :checked="item.check" @click="checkedChange(item)" />
					</view>
					<view class="card_goodImg">
						<view style="height: 100%;background-color: #0DAB2B;">图片</view>
					</view>
					<view class="card_goodDetail">
						<view class="card_goodDetail_title">
							<text>煌上煌不辣鸭锁骨130g</text>
						</view>
						<view class="card_goodDetail_desc">
							<text>网友推荐</text>
						</view>
						<view class="card_goodDetail_price">
							<view>
								<text class="now_price">￥{{item.price}}</text>
							</view>
							<view class="numberBoxAndClose">
								<view class="goodCount" v-if="!(showNumberBox === index)" @click="showGoodCount(index)">x{{item.count}}</view>
								<u-number-box
									v-if="showNumberBox === index"
									class="numberBox"
									:min="1"
									:max="20"
									:size="24"
									:input-width="70"
									:input-height="45"
									v-model="currentNumBox"
									@change="numberBoxChange"
									>
								</u-number-box>
								<view v-if="showNumberBox === index" class="closeNumBox" @click="closeNumBox(item)">x</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- <view class="clearCar">
				<text @click="$refs.clearCarDialog.open()">清空购物车</text>
			</view> -->
		</view>
		<!-- <view class="result">
			<view class="choseAll">
				<label>
					<checkbox value="checked" :checked="checkedAll" @click="checkAll" />
					<text>全选 ({{arr.length}})</text>
				</label>
			</view>
			<view class="textAndBtn">
				<view class="textAndBtn_text">
					<text>￥{{allPrice}}</text>
				</view>
				<view class="textAndBtn_btn">
					<button type="default" hover-class="none" @click="pay">去结算</button>
				</view>
			</view>
		</view> -->
		<uni-popup ref="clearCarDialog" type="dialog">
			<uni-popup-dialog type="input" :duration="350" content="确定要清空购物车吗？" @close="$refs.clearCarDialog.close()" @confirm="clearCarConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
	<view v-else-if="!token" class="noLogin">
		<view>
			请先进行登录！
		</view>
	</view>
	<view v-else-if="empty && token" class="empty">
		<view style="text-align: center;">
			<view style="margin-bottom: 20rpx;">购物车空空如也鸭~~</view>
			<u-button type="success" plain size="medium" @click="gotoIndex">购物去~</u-button>
		</view>
	</view>
</template>

<script>
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniSwipeActionItem,
			uniSwipeAction,
			uniPopupDialog
		},
		data() {
			return {
				checkedAll: false,
				swipeActive: false,
				disabledSwipe: false,
				showNumberBox: -1,
				currentNumBox: 1,
				lastIndex: -1,
				arr: [],
				options: [{
					text: '置顶',
					style: {
						backgroundColor: '#0000FF'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: 'red'
					}
				}]
			}
		},
		created() {
			this.createData()
		},
		methods: {
			createData () {
				this.arr = new Array(30).fill(1).map((value, index) => {
					return {
						id: index+ 1,
						price: 49.9,
						check: false,
						count: 5,
						show: false
					}
				})
			},
			gotoIndex () {
				uni.switchTab({
					url: '../index/index'
				})
			},
			checkedChange(item) {
				item.check = !item.check
			},
			async pay() {
				let res = await this.$api.post('/index/new', {
					new_price: 24.5,
					specs: '500ml/瓶',
					remark: '宝宝用了之后身体香香的呢！',
					old_price: 28.8
				})
				if (res.status === 200) {
					console.log('新建完成！');
				}
			},
			swipeClick(e, index) {
				if (e.index === 0) {
					if (index === 0) {
						uni.showToast({
							title: '已经置顶',
							mask: true,
							icon: 'none'
						})
						return false
					}
					let temp = this.arr[index]
					this.arr.splice(index, 1)
					this.arr.unshift(temp)
					uni.showToast({
						title: '置顶完成',
						mask: true
					})
				} else {
					this.arr.splice(index, 1)
					uni.showToast({
						title: '删除完成',
						mask: true
					})
				}
			},
			swipeChange(e) {
				if (e === 'right') {
					this.swipeActive = true
				} else {
					setTimeout(() => {
						this.swipeActive = false
					}, 300)
				}
			},
			checkAll() {
				this.checkedAll = !this.checkedAll
				if (this.checkedAll) {
					this.arr.forEach(value => {
						value.check = true
					})
				} else {
					this.arr.forEach(value => {
						value.check = false
					})
				}
			},
			clearCarConfirm() {
				this.arr = []
				this.$refs.clearCarDialog.close()
			},
			showGoodCount(index) {
				if (this.swipeActive) return false
				this.showNumberBox = index
				this.currentNumBox = this.arr[index].count
				this.disabledSwipe = true
			},
			numberBoxChange(e) {
				lconsole.log(e)
				this.currentNumBox = e.value
			},
			closeNumBox(item) {
				item.count = this.currentNumBox
				this.showNumberBox = -1
				this.disabledSwipe = false
			},
		},
		computed: {
			allPrice () {
				return this.arr.filter(value => value.check).reduce((prev, curr) => {
					return Number(Number(curr.price) * curr.count + Number(prev)).toFixed(2)
				}, 0)
			},
			token () {
				return true
				// return Boolean(uni.getStorageSync('token'))
			},
			empty () {
				if (!this.arr.length) return true
				return false
			},
		}
	}
</script>

<style scoped>
	.shopCar{
		background-color: pink;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #1677b3;
		position: fixed;
		z-index: 999;
		top: 0;
	}
	.noLogin, .empty{
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 42rpx;
	}

	.goodListBox {
		margin-top: var(--status-bar-height);
		height: 100%;
	}

	.goodList {
		background-color: blue;
		height: calc(100% - var(--status-bar-height) - 60rpx - 80rpx);
	}	
		
	.allGood {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 36rpx;
		border-bottom: 2rpx solid #ccc;
	}

	.card {
		width: 100%;
		height: 200rpx;
		box-sizing: border-box;
		display: flex;
		border-bottom: 2rpx solid #ccc;
	}

	.card>>>.uni-swipe_button {
		width: 100rpx;
	}

	.card_checkBox {
		width: 80rpx;
		height: 100%;
		line-height: 200rpx;
		text-align: center;
	}

	.card_checkBox>>>.uni-checkbox-input {
		border-radius: 50%;
		margin: 0;
	}

	.card_checkBox radio {
		width: 100%;
	}

	.card_goodImg {
		padding: 10rpx 0;
		height: 200rpx;
		width: 200rpx;
		margin-right: 20rpx;
	}

	.card_goodDetail {
		flex: 1;
		padding: 10rpx 0;
	}

	.card_goodDetail_title {
		font-size: 30rpx;
		font-weight: 700;
	}

	.card_goodDetail_desc {
		display: inline-block;
		background-color: #eee;
		font-size: 28rpx;
		border-radius: 8rpx;
		margin-top: 25rpx;
		padding: 3rpx 12rpx;
		color: #999;
	}

	.card_goodDetail_price {
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 15rpx;
	}

	.now_price {
		color: red;
		font-size: 36rpx;
	}


	.clearCar {
		height: 150rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eee;
		margin-bottom: 76rpx;
	}

	.clearCar text {
		display: block;
		height: 60rpx;
		text-align: center;
		border: 1px solid #999;
		padding: 10rpx 25rpx;
		font-size: 26rpx;
		letter-spacing: 1px;
		color: #999;
	}

	.numberBoxAndClose {
		width: 260rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 36rpx;
	}

	.goodCount {
		box-sizing: border-box;
		padding: 0 12rpx;
		height: 50rpx;
		line-height: 46rpx;
		text-align: center;
		color: #0DAB2B;
		border: 2rpx solid #0DAB2B;
		border-radius: 15rpx;
		font-size: 32rpx;
		margin-left: calc(100% - 60rpx - 10rpx);
	}

	.closeNumBox {
		font-size: 30rpx;
		width: 45rpx;
		height: 45rpx;
		text-align: center;
		line-height: 42rpx;
		color: #fff;
		background-color: red;
		border-radius: 50%;
	}

	.result {
		height: 80rpx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 30rpx;
		background-color: #fff;
	}

	.textAndBtn {
		max-width: 500rpx;
		height: 100%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.textAndBtn_text {
		color: red;
		font-size: 40rpx;
		font-weight: 500;
	}

	.textAndBtn_btn {
		height: 100%;
	}

	.textAndBtn_btn button {
		width: 200rpx;
		line-height: 80rpx;
		background-color: #0DAB2B;
		color: #fff;
		border-radius: 0;
		height: 100%;
		margin: 0;
		font-size: 30rpx;
		margin-left: 30rpx;
	}
</style>
