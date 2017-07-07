const routes = [
	{
		path: '/error',
		component: { template: '<h3>出错了</h3>' },
		name: '出错了'
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
		path: '/warelist',
		name: '商品列表',
		component: require('./page/ware/list.vue')
	},
	{
		path: '/ware/:id',
		name: '商品详细信息',
		component: require('./page/ware/ware.vue')
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
		path: '/town/category/:id',
		name: '小镇主页', 
		component: require('./page/town/category.vue')
	},
	{
		path: '/town/info/:id',
		name: '小镇简介',
		component: require('./page/town/info.vue')
	},
	{
		path: '/town/:id',
		name: '玩转小镇',
		component: require('./page/town/index.vue')
	},
	{
		path: '/map',
		name: '地图',
		component: require('./page/map/map.vue')
	},
	{
		path: '/carousel',
		name: '轮播',
		component: require('./page/map/list.vue')
	},
	{
		path: '/scenelist',
		name: '风光列表',
		component: require('./page/scene/list.vue')
	},
	{
		path: '/scene/:id',
		name: '小镇风光',
		component: require('./page/scene/scene.vue')
	},
	{
		path: '/farmlist',
		name: '众筹列表',
		component: require('./page/farm/list.vue')
	},
	{
		path: '/farm/:id',
		name: '众筹产品详情',
		component: require('./page/farm/farm.vue')
	},
	{
		path: '/hotellist',
		name: '民宿列表',
		component: require('./page/hotel/list.vue')
	},
	{
		path: '/hotel/:id',
		name: '民宿详情',
		component: require('./page/hotel/hotel.vue')
	},
	{
		path: '/scan',
		name: '扫一扫',
		component: require('./page/scan/scan.vue')
	},
	{
		path: '/catelist',
		name: '美食列表',
		component: require('./page/cate/list.vue')
	},
	{
		path: '/cate/:id',
		name: '美食详情',
		component: require('./page/cate/cate.vue')
	},
	{
		path: '/waylist',
		name: '游玩路线列表',
		component: require('./page/way/list.vue')
	},
	{
		path: '/way/:id',
		name: '游玩路线详情',
		component: require('./page/way/way.vue')
	},
	{
		path: '/',
		name: '首页',
		component: require('./page/home.vue')
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
		path: '/play',
		name: '活动首页',
		component: require('./page/play/index.vue')
	},
	{
		path: '/play/:id',
		name: '活动详情',
		component: require('./page/play/index.vue')
	},

	


]

export default routes;
