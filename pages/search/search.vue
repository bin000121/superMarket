<template>
	<view class="searchBody">
		<view class="top">
			<view class="input">
				<u-search 
				style="width: 100%;"
				height="65"
				shape="square"
				:focus="true"
				placeholder="这家店应有尽有~~"
				v-model="iptValue"
				>
				</u-search>
			</view>
		</view>
		
		<view class="historySearch">
			<view>历史搜索</view>
			<view class="historyKeyList">
				<view v-for="item in historyKeyList" :key="item" class="historyKey">{{item}}</view>
			</view>
		</view>
		<view class="hotSearch">
			<view>热门搜索</view>
			<view class="hotKeyList">
				<view v-for="item in hotKeyList" :key="item" class="hotKey">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iptValue: '',
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
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.searchBody{
		width: 100%;
		height: 100vh;
		padding: 15rpx;
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
