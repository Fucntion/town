var routes_web = [
	{
		path: '/error',
		component: { template: '<h3>出错了</h3>' },
		name: '出错了'
	},
	{
		path: '/',
		name: '首页',
		component: function(resolve) { require(['./page/home.vue'], resolve) }
	},
	{
		path: '/hot/area',
		name: '热门目的地',
		component: function(resolve) { require(['./page/hot/area.vue'], resolve) }
	}, 
	{
		path: '/hot/hotel',
		name: '热门民宿',
		component: function(resolve) { require(['./page/hot/hotel.vue'], resolve) }
	}, 
	{
		path: '/hot/cate',
		name: '热门美食',
		component: function(resolve) { require(['./page/hot/cate.vue'], resolve) }
	}, 
	{
		path: '/login',
		name: '用户登录',
		component: function(resolve) { require(['./page/user/login.vue'], resolve) }
	},
	{
		path: '/register',
		name: '用户注册',
		component: function(resolve) { require(['./page/user/register.vue'], resolve) }
	},
	{
		path: '/user',
		name: '个人中心',
		component: function(resolve) { require(['./page/user/user.vue'], resolve) }
	},
	{
		path: '/town/category/:id',
		name: '小镇主页', 
		component: function(resolve) { require(['./page/town/category.vue'], resolve) }
	},
	{
		path: '/town/:id/info',
		name: '小镇简介',
		component: function(resolve) { require(['./page/town/info.vue'], resolve) }
	},
	{
		path: '/town/:id',
		name: '玩转小镇',
		component: function(resolve) { require(['./page/town/index.vue'], resolve) }
	},
	{
		path: '/town/:id/ware',
		name: '商品列表',
		component: function(resolve) { require(['./page/town/ware/list.vue'], resolve) }
	},
	{
		path: '/town/:id/scene',
		name: '风光列表',
		component: function(resolve) { require(['./page/town/scene/list.vue'], resolve) }
	},

	{
		path: '/town/:id/farm',
		name: '众筹列表',
		component: function(resolve) { require(['./page/town/farm/list.vue'], resolve) }
	},
	{
		path: '/town/:id/hotel',
		name: '民宿列表',
		component: function(resolve) { require(['./page/town/hotel/list.vue'], resolve) }
	},

	{
		path: '/town/:id/cate',
		name: '美食列表',
		component: function(resolve) { require(['./page/town/cate/list.vue'], resolve) }
	},
	
	{
		path: '/town/:id/way',
		name: '游玩路线列表',
		component: function(resolve) { require(['./page/town/way/list.vue'], resolve) }
	},
	{
		path: '/livelist',
		name: '直播间列表',
		component: function(resolve) { require(['./page/live/list.vue'], resolve) }
	},
	{
		path: '/room/:id',
		name: '直播间',
		component: function(resolve) { require(['./page/live/room.vue'], resolve) }
	},
	{
		path: '/scan',
		name: '扫一扫',
		component: function(resolve) { require(['./page/scan/scan.vue'], resolve) }
	},
	{
		path: '/nearby',
		name: '附近',
		component: function(resolve) { require(['./page/nearby.vue'], resolve) }
	},
	{
		path: '/find',
		name: '发现',
		component: function(resolve) { require(['./page/find/index.vue'], resolve) }
	},
	{
		path: '/activity',
		name: '活动首页',
		component: function(resolve) { require(['./page/activity/index.vue'], resolve) }
	},
	{
		path: '/activity/:id',
		name: '活动详情',
		component: function(resolve) { require(['./page/activity/activity.vue'], resolve) }
	},
	{
		path: '/way/:id',
		name: '游玩路线详情',
		component: function(resolve) { require(['./page/town/way/way.vue'], resolve) }
	},
	{
		path: '/cate/:id',
		name: '美食详情',
		component: function(resolve) { require(['./page/town/cate/cate.vue'], resolve) }
	},
	{
		path: '/hotel/:id',
		name: '民宿详情',
		component: function(resolve) { require(['./page/town/hotel/hotel.vue'], resolve) }
	},
	{
		path: '/farm/:id',
		name: '众筹产品详情',
		component: function(resolve) { require(['./page/town/farm/farm.vue'], resolve) }
	},
	{
		path: '/scene/:id',
		name: '小镇风光',
		component: function(resolve) { require(['./page/town/scene/scene.vue'], resolve) }
	},
	{
		path: '/ware/:id',
		name: '商品详细信息',
		component: function(resolve) { require(['./page/town/ware/ware.vue'], resolve) }
	},
	{
		path: '/order',
		name: '用户下单',
		component: function(resolve) { require(['./page/order/order.vue'], resolve) }
	},
	{
		path: '/orderlist',
		name: '用户所有下单列表',
		component: function(resolve) { require(['./page/order/list.vue'], resolve) }
	},
	{
		path: '/addressadd',
		name: '添加收货地址',
		component: function(resolve) { require(['./page/address/add.vue'], resolve) }
	},
	{
		path: '/addresslist',
		name: '所有收货地址',
		component: function(resolve) { require(['./page/address/list.vue'], resolve) }
	},
	{
		path: '/addresseditor/:id',
		name: '修改收货地址',
		component: function(resolve) { require(['./page/address/edit.vue'], resolve) }
	},
	{
		path: '/addressselect',
		name: '选择收货地址',
		component: function(resolve) { require(['./page/address/select.vue'], resolve) }
	},
	{
		path: '/pay',
		name: '支付',
		component: function(resolve) { require(['./page/pay.vue'], resolve) }
	},
	{
		path: '*',
		redirect: '/error',
		name: '其他',
		hidden: true
	}
	
	


]

var routes_app = [
	{
		path: '/error',
		component: { template: '<h3>出错了</h3>' },
		name: '出错了'
	},
	{
		path: '/',
		name: '首页',
		component: require('./page/home.vue')
	},
	{
		path: '/hot/area',
		name: '热门目的地',
		component: require('./page/hot/area.vue')
	}, 
	{
		path: '/hot/hotel',
		name: '热门民宿',
		component: require('./page/hot/hotel.vue')
	}, 
	{
		path: '/hot/cate',
		name: '热门美食',
		component: require('./page/hot/cate.vue')
	}, 
	{
		path: '/login',
		name: '用户登录',
		component: require('./page/user/login.vue')
	},
	{
		path: '/register',
		name: '用户注册',
		component: require('./page/user/register.vue')
	},
	{
		path: '/user',
		name: '个人中心',
		component: require('./page/user/user.vue')
	},
	{
		path: '/town/category/:id',
		name: '小镇主页', 
		component: require('./page/town/category.vue')
	},
	{
		path: '/town/:id/info',
		name: '小镇简介',
		component: require('./page/town/info.vue')
	},
	{
		path: '/town/:id',
		name: '玩转小镇',
		component: require('./page/town/index.vue')
	},
	{
		path: '/town/:id/ware',
		name: '商品列表',
		component: require('./page/town/ware/list.vue')
	},
	{
		path: '/town/:id/scene',
		name: '风光列表',
		component: require('./page/town/scene/list.vue')
	},

	{
		path: '/town/:id/farm',
		name: '众筹列表',
		component: require('./page/town/farm/list.vue')
	},
	{
		path: '/town/:id/hotel',
		name: '民宿列表',
		component: require('./page/town/hotel/list.vue')
	},

	{
		path: '/town/:id/cate',
		name: '美食列表',
		component: require('./page/town/cate/list.vue')
	},
	
	{
		path: '/town/:id/way',
		name: '游玩路线列表',
		component: require('./page/town/way/list.vue')
	},
	{
		path: '/livelist',
		name: '直播间列表',
		component: require('./page/live/list.vue')
	},
	{
		path: '/room/:id',
		name: '直播间',
		component: require('./page/live/room.vue')
	},
	{
		path: '/scan',
		name: '扫一扫',
		component: require('./page/scan/scan.vue')
	},
	{
		path: '/nearby',
		name: '附近',
		component: require('./page/nearby.vue')
	},
	{
		path: '/find',
		name: '发现',
		component: require('./page/find/index.vue')
	},
	{
		path: '/activity',
		name: '活动首页',
		component: require('./page/activity/index.vue')
	},
	{
		path: '/activity/:id',
		name: '活动详情',
		component: require('./page/activity/activity.vue')
	},
	{
		path: '/way/:id',
		name: '游玩路线详情',
		component: require('./page/town/way/way.vue')
	},
	{
		path: '/cate/:id',
		name: '美食详情',
		component: require('./page/town/cate/cate.vue')
	},
	{
		path: '/hotel/:id',
		name: '民宿详情',
		component: require('./page/town/hotel/hotel.vue')
	},
	{
		path: '/farm/:id',
		name: '众筹产品详情',
		component: require('./page/town/farm/farm.vue')
	},
	{
		path: '/scene/:id',
		name: '小镇风光',
		component: require('./page/town/scene/scene.vue')
	},
	{
		path: '/ware/:id',
		name: '商品详细信息',
		component: require('./page/town/ware/ware.vue')
	},
	{
		path: '/order',
		name: '用户下单',
		component: require('./page/order/order.vue')
	},
	{
		path: '/orderlist',
		name: '用户所有下单列表',
		component: require('./page/order/list.vue')
	},
	{
		path: '/addressadd',
		name: '添加收货地址',
		component: require('./page/address/add.vue')
	},
	{
		path: '/addresslist',
		name: '所有收货地址',
		component: require('./page/address/list.vue')
	},
	{
		path: '/addresseditor/:id',
		name: '修改收货地址',
		component: require('./page/address/edit.vue')
	},
	{
		path: '/addressselect',
		name: '选择收货地址',
		component: require('./page/address/select.vue')
	},
	{
		path: '/pay',
		name: '支付',
		component: require('./page/pay.vue')
	},
	// {
	// 	path: '*',
	// 	redirect: '/error',
	// 	name: '其他',
	// 	hidden: true
	// }
	
	


]





export default routes_app;


