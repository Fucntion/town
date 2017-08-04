<template>
    <div class="wrap">
        <header class="bar" :style="{paddingTop:ishead+'px'}">
            <div class="bar-icon"><img src="~assets/img/left.png" class="icon_img icon_left" @click="$util.toBack()" /></div>
            <div class="bar-title">管理收货地址</div>
        </header>
        <div class="bar_after"></div>
        <div class="town-content ad " :style="{marginTop:ishead+'px'}">
            <div class="addres" v-for="item in addressList">
                <div class="top">
                    <input class="link" type="text" :value="item.link" disabled="disabled">
                    <input class="tel" type="text" :value="item.tel" disabled="disabled">
                </div>
                <div class="addr">{{item.province}}{{item.city}}{{item.area}}{{item.detail}}</div>
                <input class="province" type="hidden" :value="item.province">
                <input class="city" type="hidden" :value="item.city">
                <input class="area" type="hidden" :value="item.area">
                <input class="detail" type="hidden" :value="item.detail">
                <div class="bottom">
                    <div class="set">
                        <!--{{item.ismain}}-->
                        <div v-if="item.ismain=='1'">
                            默认地址
                        </div>
                        <div v-if="item.ismain=='0'" @click="isSet(item.address_id)">
                            设为默认地址
                        </div>
                    </div>
                    <div class="operation">
                        <div class="editor" @click="editor(item.address_id)">
                            <i class="town-icon town-icon-compose"></i>编辑
                        </div>
                        <div class="delete" @click="del(item.address_id)">
                            <i class="town-icon town-icon-trash"></i>删除
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="add">
            <button class="weui-btn weui-btn_primary" @click="toaddresAdd()">添加收货地址</button>
        </div>

        <div id="toast" v-if="css_show">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-icon-warn weui-icon_msg warn_show" v-if="failure_show"></i>
                <i class="weui-icon-success-no-circle weui-icon_toast" v-if="win_show"></i>
                <p class="weui-toast__content">{{judge}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'addresslist',
        data: function () {

            return {
                addressList: [],
                ismain: [],
                css_show: false,
                failure_show: false,
                win_show: false,
                judge: null,
                ishead:this.$util.istop(),
                isplus:this.$util.isEnvironment()
            }
        },
        computed: {

        },
        methods: {
            toaddresAdd: function () {

                this.$router.push('/address/add')

            },
            editor: function (address_id) {

                this.$router.push('addresseditor/' + address_id)

            },
            //删除收货地址
            del: function (address_id) {

                var self = this
                self.$http.delete('/v1/delivery_address/' + address_id).then(response => {
                    var result = response.body;
                    if (result.code == 100) {

                        WeVue.Toast({
                            duration: 1000,
                            message: '删除成功',
                            icon: 'success'
                        })

                        window.location.reload();


                    } else {
                        WeVue.Toast({
                            duration: 1000,
                            message: '删除失败',
                            icon: 'warn'
                        })
                    }

                }, response => {
                    console.log(response.body)
                });
            },

            // 修改默认地址
            isSet: function (addressId) {

                var self = this
                this.$http.put('/v1/delivery_address/'  + addressId, { ismain: 1 }).then(response => {
                    var result = response.body;
                    console.log(result);
                    if (result.code == 100) {

                         WeVue.Toast({
                            duration: 1000,
                            message: '设置默认地址成功',
                            icon: 'success'
                        })

                            window.location.reload();


                    } else {

                        WeVue.Toast({
                            duration: 1000,
                            message: '设置默认地址失败',
                            icon: 'warn'
                        })
                    }
                }, response => {
                    console.log(response.body)
                });
            }
        },
        components: {

        },
        watch: {

        },
        mounted() {
            var self = this
            this.$http.get('/v1/delivery_address').then(response => {
                // get body data
                self.addressList = response.body.data
                self.ismain = response.body.data.ismain
                console.log(self.addressList);
            }, response => {
                // error callback
            });



        }
    }

</script>
<style lang="less">

</style>