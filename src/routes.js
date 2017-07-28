
	// {
	// 	path: '/',
	// 	name: '首页',
	// 	component: function(resolve) { require(['./page/home.vue'], resolve) }
	// },


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
		path: '/hot/ware',
		name: '热门手礼',
		component: require('./page/hot/ware.vue')
	}, 
	{
		path: '/town/:id/category',
		name: '小镇主页', 
		component: require('./page/town/category.vue')
	},
	{
		path: '/town/:id/info',
		name: '小镇简介',
		component: require('./page/town/info.vue')
	},
	{
		path: 'farm/list',
		name: '众筹列表',
		component: require('./page/town/farm/list.vue')
	},
	{
		path: '/farm/:id',
		name: '众筹详情',
		component: require('./page/town/farm/farm.vue')
	},
	// {
	// 	path: '/livelist',
	// 	name: '直播间列表',
	// 	component: require('./page/live/list.vue')
	// },
	// {
	// 	path: '/room/:id',
	// 	name: '直播间',
	// 	component: require('./page/live/room.vue')
	// },
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
		path: '/way/list',
		name: '路线列表',
		component: require('./page/town/way/list.vue')
	},
	{
		path: '/way/:id',
		name: '路线详情',
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
		path: '/scene/:id',
		name: '景色详情',
		component: require('./page/town/scene/scene.vue')
	},
	{
		path: '/ware/:id',
		name: '商品详细',
		component: require('./page/town/ware/ware.vue')
	},
	{
		path: '/ware/order',
		name: '商品下单',
		component: require('./page/town/ware/order.vue')
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
		path: '/address/add',
		name: '添加收货地址',
		component: require('./page/user/address/add.vue')
	},
	{
		path: '/address/list',
		name: '所有收货地址',
		component: require('./page/user/address/list.vue')
	},
	{
		path: '/address/:id/editor',
		name: '修改收货地址',
		component: require('./page/user/address/edit.vue')
	},
	{
		path: '/addres/sselect',
		name: '选择收货地址',
		component: require('./page/user/address/select.vue')
	},
	{
		path: '/user/order',
		name: '订单列表',
		component: require('./page/user/orderlist.vue')
	},
	
	// {
	// 	path: '/pay',
	// 	name: '支付',
	// 	component: require('./page/pay.vue')
	// },
	{
		path: '/iframe',
		name: '外站',
		component: require('./page/iframe.vue')
	},
	// {
	// 	path: '*',
	// 	redirect: '/error',
	// 	name: '其他',
	// 	hidden: true
	// }
	
	


]





export default routes_app;


