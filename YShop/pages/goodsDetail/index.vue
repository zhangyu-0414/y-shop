<template>
	<scroll-view class="goodsDetail" scroll-y>
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item v-for="(item,index) in imgList" :key="item.index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="info">
			<view class="price">
				<text>${{goodsInfo.sell_price}}</text>
				<text>${{goodsInfo.market_price}}</text>
			</view>
			<view class="tit">
				<text>{{goodsInfo.title}}</text>
			</view>
		</view>
		<view class="goodsInfo">
			<view class="goodsCode">
				<text>货号：{{goodsInfo.goods_no}}</text>
			</view>
			<view class="repertory">
				<text>库存：{{goodsInfo.stock_quantity}}</text>
			</view>
		</view>
		<view class="content">
			<view class="contentTit">
				<text>详细介绍</text>
			</view>
			<rich-text :nodes="content.content">

			</rich-text>
		</view>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "goodsDetail",
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				imgList: [],
				goodsInfo: {},
				content: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(option) {
			this.getLunBoDetail(option.id);
			this.getInfoDetail(option.id);
			this.getContentDetail(option.id);
		},
		methods: {
			async getLunBoDetail(id) {
				const res = await this.$myRequest({
					method: "GET",
					url: "/api/getthumimages/" + id
				});
				this.imgList = res.data.message;
			},
			async getInfoDetail(id) {
				const res = await this.$myRequest({
					method: "GET",
					url: "/api/goods/getinfo/" + id
				});
				this.goodsInfo = res.data.message[0];
			},
			async getContentDetail(id) {
				const res = await this.$myRequest({
					method: "GET",
					url: "/api/goods/getdesc/" + id
				});
				this.content = res.data.message[0];
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="less">
	.goodsDetail {
		background-color: #eee;

		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			width: 100%;
			height: 100rpx;
			border: 1px soid #fff;
			background-color: #fff;
			padding: 20px 15px;

			.price {
				font-size: 40rpx;

				text:nth-child(2) {
					margin-left: 30rpx;
					font-size: 30rpx;
					color: #C0C0C0;
					text-decoration: line-through;
				}

				.tit {
					font-size: 35rpx;
				}
			}
		}

		.goodsInfo {
			width: 100%;
			height: 90rpx;
			margin-top: 10rpx;
			line-height: 50rpx;
			border: 1px soid #fff;
			background-color: #fff;
			padding: 5px 15px;
		}

		.content {
			width: 100%;
			margin-top: 10rpx;
			border: 1px soid #fff;
			background-color: #fff;
			box-sizing: border-box;
			padding-bottom:50rpx ;
			line-height: 70rpx;

			.contentTit {
				font-size: 40rpx;
			}
		}
		.gomeImgLoad {
			width: 750rpx;
			height: auto;
		}
		.goods-carts{
			position: fixed;
			bottom: 0;
			width:100%;
		}
	}
</style>
