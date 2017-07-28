<template>
    <div class="wrap" v-if="show">

        <div class="bar bar-clear" :style="{paddingTop:ishead+'px'}">
            <img src="~assets/img/left.png" class="icon_img icon_left gray" @click="$util.toBack()" />
            <img v-if="isplus=='plus'" src="~assets/img/share.png" class="icon_img icon_right gray" @click="updateSerivces()">
        </div>

        <slider :List="hotelInfo.pic" v-if="hotelInfo.pic"></slider>


        <div id="introduction">
            <div class="titles">{{hotelInfo.name}}
            </div>
            <div class="prices"><span>￥</span>{{hotelInfo.price | formatMoney }}<span class="rise">起</span>
            </div>
            <div class="hotel_address">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"><img src="~assets/img/address_hotel.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p @click="toTownCategory(hotelInfo.town_id)">{{hotelInfo.city_name}} {{hotelInfo.town_name}}</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </div>
            </div>
        </div>
        <div class="message padding_bottom_50">
            <div class="rqm_title"><img src="~assets/img/hotel.png">酒店介绍:</div>
            <div v-html="hotelInfo.content" class="m_content child_color">
            </div>
        </div>

        <nav id="foot">

            <button class="town-tab-item town-btn weui-btn weui-btn_primary" @click="change()">立即购买</button>

        </nav>

        <div id="choose" v-if="box_show&&hotelInfo.sku">
            <div class="goodsc" style="height: auto;">
                <div class="top">
                    <div class="title town-pull-left">请选择您想样的商品类型</div>
                    <i @click="change()" class="iconfont icon-close"></i>
                </div>
                <div class="goods_sku hotel_sku">

                    <div class="sku_group">
                        <div class="s_title">商品规格:</div>
                        <div class="s_content ">
                            <div v-for="item in hotelInfo.sku" v-if="item.name" @click="select(item)" class="gdiv" v-bind:class="{active: item.hotel_sku_id==active_sku_id }">{{item.name}}</div>
                        </div>
                    </div>

                    <div class="sku_group">
                        <div class="s_title">单价:</div>
                        <div class="s_content ">
                            <span v-if="select_sku" style="color:red">￥{{select_sku.price | formatMoney}}</span>
                        </div>
                    </div>

                    <div class="sku_group hotel_link">
                        <div class="weui-cell" @click="startTime()">
                            <div class="weui-cell__hd"><label class="weui-label">入住日期</label></div>
                            <div class="weui-cell__bd">
                                {{time_start}}
                                <!-- <input class="weui-input" type="date"  > -->
                            </div>
                            <img src="~assets/img/right.png" class="icon_img address_icon" />
                        </div>
                        <div class="weui-cell" @click="endTime()">
                            <div class="weui-cell__hd"><label class="weui-label">离店日期</label></div>
                            <div class="weui-cell__bd">
                                {{time_end}}
                                <!-- <input class="weui-input" type="date"  > -->
                            </div>
                            <img src="~assets/img/right.png" class="icon_img address_icon" />
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">联系人</label></div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="text" v-model="linkName" placeholder="入住房客姓名">
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="number" v-model="linkTel" pattern="[0-9]*" placeholder="请输入联系方式">
                            </div>
                            <!-- <div class="weui-cell__ft">
                                  <button class="weui-vcode-btn">获取验证码</button>
                              </div> -->
                        </div>


                    </div>

                </div>
                <button @click="toorder()" class="weui-btn weui-btn_primary goorder ">确认订单</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Slider from 'plugin/slider'
    import 'static/css/mui.picker.css'
    // require('static/js/mui.picker.js') 

    export default {
        name: 'hotel',
        data: function () {
            return {
                hotelInfo: {},
                box_show: false,
                show: false,
                number: 1,
                select_sku: null,
                active_sku_id: null,
                // 入住时间
                time_start: null,
                // 离店时间
                time_end: null,

                linkName: null,//联系人
                linkTel: null,//联系电话

                //入住时间
                dataTime: null,
                dataYear: null,
                dataMonth: null,
                dataDay: null,

                // 离店时间
                endYear: null,
                endMonth: null,
                endDay: null,

                // 时间比较
                // 入住比较时间
                comparestartTime: 0,
                // 离店比较时间
                comparesendTime: 0,
                ishead: this.$util.istop(),
                isplus: this.$util.isEnvironment(),
                pays: {},
                w: null,
                channels: null


            }
        },
        // 过滤器
        filters: {
            formatMoney: function (value) {
                // console.log(this.hotelInfo.price);
                if (value == undefined) {
                    return value
                } else {
                    return value.toFixed(2);
                }
            }
        },
        methods: {
            toTownCategory: function (town_id) {
                if (town_id) {
                    this.$router.push('/town/category/' + town_id)
                }

            },
            // 更新分享服务及发布分享
            updateSerivces: function () {

                this.$util.updateSerivces()
            },


            // 获取入住时间
            startTime: function (index) {

                var self = this

                var data = { "type": "date", "beginYear": self.dataYear, "endYear": self.dataYear + 5, "beginMonth": self.dataMonth, "beginDay": self.dataDay }
                var picker = new mui.DtPicker(data);
                picker.show(function (rs) {

                    self.time_start = rs.text;

                    // 获取离住时间
                    self.endYear = rs.y.text;
                    self.endMonth = rs.m.text;
                    self.endDay = rs.d.text;

                    // 获取入住比较时间
                    self.comparestartTime = parseInt(rs.y.text + rs.m.text + rs.d.text)

                    picker.dispose();

                    // 比较时间
                    self.compareTime()
                });
            },
            // 获取离店时间
            endTime: function () {

                var self = this

                if (self.endYear == null || self.endMonth == null || self.endDay == null) {

                    WeVue.Toast({
                        duration: 1000,
                        message: '请选择入住时间',
                        type: 'text'
                    })
                    return false

                } else {


                    var Day = parseInt(self.endDay) + 1;
                    var dataE = { "type": "date", "beginYear": parseInt(self.endYear), "endYear": parseInt(self.endYear) + 5, "beginMonth": parseInt(self.endMonth), "beginDay": Day }
                    var picker = new mui.DtPicker(dataE);
                    picker.show(function (re) {

                        self.time_end = re.text;

                        // 获取离住比较时间
                        self.comparesendTime = parseInt(re.y.text + re.m.text + re.d.text)
                        picker.dispose();

                        // 比较时间
                        self.compareTime()
                    });
                }
            },
            getTime2Time: function ($time1, $time2) {
                var time1 = arguments[0], time2 = arguments[1];
                time1 = Date.parse(time1) / 1000;
                time2 = Date.parse(time2) / 1000;
                var time_ = time1 - time2;
                return (parseInt(time_ / (3600 * 24)));
            },
            select: function (sku) {

                var self = this
                self.select_sku = sku
                self.active_sku_id = sku.hotel_sku_id
            },
            change: function () {

                var self = this
                if(!localStorage.getItem("token")){

                    WeVue.Dialog({
                        title: '需要登录',
                        message: '该操作需要登录，是否跳转到登录页？',
                        skin: 'ios'
                    },
                    function () {
                        location.hash = 'login'
                    })
                    return
                }
                self.box_show = !self.box_show

            },
            init: function () {

                var self = this,
                    hotelId = self.$route.params.id

                this.$http.get('/v1/hotel/' + hotelId).then(response => {


                    self.hotelInfo = response.body.data
                    self.select_sku = self.hotelInfo.sku[0]
                    self.active_sku_id = self.hotelInfo.sku[0].hotel_sku_id
                    self.show = true

                    this.$nextTick(function () {

                        var gallery = mui('.mui-slider')
                        gallery.slider({
                            interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
                        });
                    })


                }, response => {
                    // error callback
                });
            },
            toorder: function () {

               
                var self = this
                // 入住时间
                // time_start:null,
                // 离店时间
                // time_end:null,
                if (!self.select_sku || !self.time_start || !self.time_end || !self.linkName || !self.linkTel) {
                    // alert('请填写入住信息');
                    WeVue.Toast({
                        duration: 1000,
                        message: '请填写入住信息',
                        type: 'text'
                    })
                    return;
                }

                if (!self.$util.checkPhone(self.linkTel)) {
					
					WeVue.Toast({
						duration: 1000,
						message: '联系方式格式不符',
						type: 'text'
					})
					return
				}

                var post = {
                    start_time: self.time_start,
                    end_time: self.time_end,
                    // count: self.select_sku.price * self.getTime2Time(self.time_end, self.time_start),
                    count: 0.01,
                    hotel_sku_id: self.select_sku.hotel_sku_id,
                    link: self.linkTel,
                    name: self.linkName
                }
                console.log(post)
                // return;
                self.$http.post('/v1/hotel/order', post).then((response) => {

                    if (response.body.code == 100) {
                        self.pay(response.body.data)
                    } else {
                        WeVue.Toast({
                            duration: 1000,
                            message: '下单失败',
                            icon: 'warn'
                        })
                    }
                }, (response) => {
                    WeVue.Toast({
                        duration: 1000,
                        message: '下单失败',
                        icon: 'warn'
                    })

                })

            },
            pay: function (amount) {

                var self = this,
                    type = 'wxpay'

                console.log(amount.count)
                // 支付
                if (self.w) { return; }//检查是否请求订单中

                self.w = plus.nativeUI.showWaiting();

                // 请求支付订单
                this.$http.post('/order/pay/wx', { amount: amount.count }).then(response => {

                    self.w.close(); self.w = null;

                    var order = response.body.data

                    WeVue.Toast({
                        duration: 1000,
                        message: '前往微信支付',
                        type: 'text'
                    })
                    //写死微信了
                    plus.payment.request(self.pays[type], order, function (result) {

                        plus.nativeUI.alert('支付成功', function () {
                            back();
                        }, '支付');

                        WeVue.Dialog({
                            title: '支付成功',
                            message: '是否前往查看订单信息?',
                            skin: 'ios'
                        },function () {
                            self.$router.push('order/list')
                        })

                    }, function (e) {

                         WeVue.Toast({
                            duration: 1000,
                            message: '支付失败，请重新支付',
                            icon: 'warn'
                        })

                    });




                }, response => {
                    self.w.close(); self.w = null;
                    // console.log(response.body)
                });

            },
            initPay: function () {

                var self = this

                // 获取支付通道
                plus.payment.getChannels(function (channels) {

                    self.channels = channels
                    for (var i in channels) {
                        var channel = channels[i];
                        if (channel.id == 'qhpay' || channel.id == 'qihoo' || channel.id == 'alipay') {
                            continue;// 过滤掉不支持的支付通道：暂不支持360相关支付
                        }
                        self.pays[channel.id] = channel;
                        console.log(JSON.stringify(channel))
                    }
                }, function (e) {
                    WeVue.Toast({
                        duration: 1000,
                        message: '获取支付通道失败：' + e.message,
                        icon: 'warn'
                    })
                    console.log('获取支付通道失败：' + e.message);
                });


            },
            // 获取当前时间赋值给入住时间
            initTime: function () {

                var self = this
                self.dataTime = new Date()
                self.dataYear = self.dataTime.getFullYear()

                self.dataMonth = self.dataTime.getMonth() + 1
                console.log(self.dataMonth)
                self.dataDay = self.dataTime.getDate()
            },

            // 入住时间和离店时间的比较时间
            compareTime: function () {

                var self = this

                // 入住时间大于离店时间时，离店时间自动清空，重新选择
                if (self.comparestartTime >= self.comparesendTime) {
                    // alert("入住时间不能大于离住时间，请重新选离住时间")
                    self.time_end = null;
                }
            }

        },
        components: {
            slider: Slider
        },
        watch: {

        },
        mounted() {

            var self = this
            self.init()
            self.initTime()
            mui.plusReady(function () {
                self.initPay()
            })

        }
    }

</script>
<style lang="less">

</style>