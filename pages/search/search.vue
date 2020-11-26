<template>
	<view class="searchBody">
		<view class="top">
			<view class="input">
				<u-search 
				style="width: 100%;"
				height="75"
				shape="square"
				:focus="focus"
				placeholder="这家店应有尽有~~"
				:show-action="false"
				v-model="iptValue"
				@search="searchGood"
				/>
			</view>
		</view>
		
		<view class="historySearch">
			<view class="df jc-sb al-c">
				<view>历史搜索</view>
				<view @click="deleteHistorySearch"><u-icon name="trash" size="36" /></view>
			</view>
			<view class="historyKeyList">
				<view v-for="item in historyKeyList" :key="item" class="historyKey" @click="copyKeyWord(item)">{{item}}</view>
			</view>
		</view>
		<view class="hotSearch">
			<view>热门搜索</view>
			<view class="hotKeyList">
				<view v-for="item in hotKeyList" :key="item" class="hotKey" @click="copyKeyWord(item)">{{item}}</view>
			</view>
		</view>
		
		
		<u-modal
			v-model="isDeleteHistorySearch"
			:show-title="false"
			show-cancel-button
			cancel-color="#e80000"
			content="清空全部全部的历史记录？" 
			@confirm="confirmDel"
			@cancel="cancelDel"
			width="70%"
			:zoom="false"
			:negative-top="150"
			/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iptValue: '',
				focus: true,
				isDeleteHistorySearch: false,
				historyKeyList: [
					'乐事薯片',
					'德芙'
				],
				hotKeyList: [
					'牛奶',
					'鸡蛋',
					'薯片',
					'面包',
					'矿泉水',
					'卫生巾',
					'牛肉',
					'可乐',
					'方便面',
					'鱼',
					'大闸蟹',
					'水饺',
					'蒙牛',
					'花生',
					'冰淇淋',
					'巧克力',
					'汤圆',
					'五花肉',
					'月饼',
					'蔬菜',
					'口红',
					'奥利奥',
					'三只松鼠'
				]
			}
		},
		methods: {
			copyKeyWord (key) {
				this.iptValue = key
			},
			searchGood (e) {
				console.log(e)
			},
			deleteHistorySearch () {
				if (!this.historyKeyList.length) {
					uni.showToast({
						icon:'none',
						mask: true,
						title: '历史搜索已清空！',
						position: 'center'
					})
					return false
				}
				this.focus = false
				this.isDeleteHistorySearch = true
			},
			confirmDel () {
				this.focus = true
				this.historyKeyList = []
			},
			cancelDel () {
				this.focus = true
			}
		}
	}
</script>

<style scoped>
	.searchBody{
		width: 100%;
		height: 100vh;
		padding: 30rpx;
	}
.top{
	width: 100%;
	height: 85rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.input{
	width: 100%;
}
.hotSearch, .historySearch{
	margin-top: 15rpx;
	color: #999;
}
.hotKeyList, .historyKeyList{
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-top: 15rpx;
}
.hotKey, .historyKey{
	height: 50rpx;
	line-height: 48rpx;
	margin: 0 25rpx 25rpx 0;
	padding: 0 25rpx;
	border-radius: 25rpx;
	border: 1px solid #eee;
	color: #666;
}
.hotKey:nth-child(-n+3){
	color: red;
	border: 1px solid red;
}
</style>
