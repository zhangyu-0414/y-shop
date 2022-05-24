//封装uni.request
const baseUrl = "http://127.0.0.1:8082"
const myRequest = (options) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			method:options.method || "GET",
			url:baseUrl + options.url,
			data:options.data || {},
			success:(res)=>{
				if(res.data.status !== 0){
					return uni.showToast({
						title:"请求数据失败",
						icon:"error"
					});
				}
				resolve(res);
			},
			fail:(err)=>{
				uni.showToast({
					title:"请求接口失败",
					icon:"error"
				});
				reject(err);
			}
		});
	});
}

module.exports = {
	myRequest
}
