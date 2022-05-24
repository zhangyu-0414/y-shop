<template>
	<view>
		<view class="home" v-if="isLogin">
			<!-- 轮播图 -->
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in lunboImage" :key="item.id">
					<image :src="item.img"></image>
				</swiper-item>
			</swiper>
			<!-- 导航栏 -->
			<view class="nav">
				<view class="nav_item" v-for="(item,index) in navList" :key="item.id" @click="toDetail(item.url)">
					<view :class="item.icon"></view>
					<text>{{item.title}}</text>
				</view>
			</view>
			<!-- 推荐商品 -->
			<view class="hot_goods">
				<view class="tit">推荐商品</view>
				<goodsList :goodsList="goodsList" @goodsItemClick="toGoodsDetail"></goodsList>
			</view>
		</view>
		<view v-if="!isLogin">请登录</view>
	</view>

</template>

<script>
	import goodsList from '../../components/goodsList.vue'
	export default {
		data() {
			return {
				isLogin:true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				lunboImage: [],
				goodsList: [],
				pageIndex: 1,
				navList: [{
						id: 1,
						icon: "iconfont icon-ziyuan",
						title: "超市",
						url: "/pages/shop/index"
					},
					{
						id: 2,
						icon: "iconfont icon-guanyuwomen",
						title: "联系我们",
						url: "/pages/contact/index"
					},
					{
						id: 3,
						icon: "iconfont icon-tupian",
						title: "社区图片",
						url: "/pages/comPhoto/index"
					},
					{
						id: 4,
						icon: "iconfont icon-shipin",
						title: "学习视频",
						url: "/pages/studyVideo/index"
					},
				]
			}
		},
		components: {
			goodsList
		},
		onLoad() {
			this.getlunbo();
			this.getGoodsList(this.pageIndex);
		},
		onReachBottom() {
			if (this.goodsList.length < this.pageIndex * 10) {
				return
			} else {
				this.pageIndex += 1;
				this.getGoodsList(this.pageIndex)
			}
		},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.goodsList = [];
			this.getGoodsList(this.pageIndex, () => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			async getlunbo() {
				const res = await this.$myRequest({
					method: "GET",
					url: "/api/getlunbo",
				});
				console.log(res);
				this.lunboImage = res.data.message;
				/* uni.request({
					method:"GET",
					url:"http://127.0.0.1:8082/api/getlunbo",
					success:(res)=>{
						console.log(res);
						if(res.data.status != 0){
							return uni.showToast({
								title:"请求失败，暂未获取数据";
							});
						}
						this.lunboImage = res.data.message;
					},
					err:(err)=>{
						console.log(err.message);
					}
				}); */
			},
			async getGoodsList(page, callback) {
				const res = await this.$myRequest({
					method: "GET",
					url: "/api/getgoods?pageindex=" + page
				});
				this.goodsList = [...this.goodsList, ...res.data.message];
				callback && callback();
			},
			toDetail(url) {
				uni.navigateTo({
					url: url
				});
			},
			toGoodsDetail(id){
				uni.navigateTo({
					url: '/pages/goodsDetail/index?id='+id
				});
			}
		}
	}
</script>

<style lang="less">
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.nav {
			display: flex;

			.nav_item {
				width: 25%;
				text-align: center;

				view {
					width: 120rpx;
					height: 120rpx;
					line-height: 120rpx;
					border-radius: 50%;
					background-color: #FF4040;
					color: #fff;
					margin: 10rpx auto;
					font-size: 50rpx;
				}

				text {
					font-size: 30rpx;
				}
			}
		}

		.hot_goods {
			background-color: #eee;
			overflow: hidden;
			margin-top: 5px;

			.tit {
				height: 50px;
				line-height: 50px;
				color: #FF4040;
				background-color: #fff;
				text-align: center;
				margin: 7rpx 0;
				border-top: 1px solid #eee;
				border-bottom: 1px solid #eee;
				letter-spacing: 20px;
			}

			/* .goodsList{
			padding:0 15rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.goodsItem{
				width:355rpx;				
				background-color: #fff;
				padding:15rpx;
				margin:10rpx 0;
				box-sizing: border-box;
				image{
					display: block;
					margin:0 auto;
					width:80%;
					height:150px;
				}
				.price{
					color:#FF4040;
					margin-top:10rpx;
					font-size:30rpx;
					text:nth-child(2){
						font-size:26rpx;
						margin-left:15rpx;
						color:#ccc;
						text-decoration: line-through;
					}
				}
				.goodsTit{
					font-size:28rpx;
					line-height:50rpx;
					padding-top:5rpx;
					padding-bottom:15rpx;
				}
			}
		} */
		}
	}
</style>
