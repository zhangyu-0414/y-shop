<template>
	<view class="goodsList">
		<view class="goodsItem" v-for="(item,index) in goodsList" :key="item.id" @click="goDetail(item.id)">
			<image src="../static/logo.png"></image>
			<view class="price">
				<text>{{item.sell_price}}</text>
				<text>{{item.market_price}}</text>
			</view>
			<view class="goodsTit">
				<text>{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goodsList",
		data() {
			return {
				
			};
		},
		methods:{
			goDetail(id){
				this.$emit('goodsItemClick',id);
			}
		},
		props:["goodsList"]
	}
</script>

<style lang="less">
	.goodsList {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goodsItem {
			width: 355rpx;
			background-color: #fff;
			padding: 15rpx;
			margin: 10rpx 0;
			box-sizing: border-box;

			image {
				display: block;
				margin: 0 auto;
				width: 80%;
				height: 150px;
			}

			.price {
				color: #FF4040;
				margin-top: 10rpx;
				font-size: 30rpx;

				text:nth-child(2) {
					font-size: 26rpx;
					margin-left: 15rpx;
					color: #ccc;
					text-decoration: line-through;
				}
			}

			.goodsTit {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-top: 5rpx;
				padding-bottom: 15rpx;
			}
		}
	}
</style>
