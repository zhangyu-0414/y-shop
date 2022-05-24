<template>
	<view class="goodsList">
		<goodsList :goodsList="goodsList" @goodsItemClick="toGoodsDetail"></goodsList>
		<view class="tit" v-if="isReachBottom">---新商品还在加急上架中哟---</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList.vue';
	export default {
		name: "shop",
		data() {
			return {
				pageIndex: 1,
				goodsList: [],
				isReachBottom: false
			}
		},
		onLoad() {
			this.getGoodsList(this.pageIndex);
		},
		onReachBottom() {
			if (this.goodsList.length < this.pageIndex * 10) {
				return this.isReachBottom = true;
			} else {
				this.pageIndex += 1;
				this.getGoodsList(this.pageIndex)
			}
		},
		onPullDownRefresh(){
			this.pageIndex = 1;
			this.goodsList = [];
			this.isReachBottom = false;
			this.getGoodsList(this.pageIndex,()=>{
				uni.stopPullDownRefresh();
			});
		},
		components: {
			goodsList
		},
		methods: {
			//获取商品数据
			async getGoodsList(page,callback) {
				const res = await this.$myRequest({
					method: "GET",
					url: "/api/getgoods?pageindex=" + page
				});
				this.goodsList = [...this.goodsList, ...res.data.message];
				callback && callback();
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
	.goodsList {
		background-color: #eee;
		.tit{
			width:100%;
			text-align: center;
		}
	}
</style>
