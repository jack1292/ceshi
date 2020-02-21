<template>
  <div class="user-box">
    <div class="user-info">
      <div class="user-img">
        <img :src="user.pic" alt="" v-if="user.pic">
        <img src="../../assets/img/touxiang.png" alt="" v-else>
        <van-uploader class="up-box" :after-read="afterRead"/>
      </div>
      <div class="user-text">
        <h3><span>{{user.phone}}</span> <a :href="'/contents/setPhone?phone=' + user.phone">更换</a></h3>
        <p><span>{{user.nick_name?user.nick_name:'未设置'}}</span> <a :href="'/contents/setName?name=' + user.nick_name">更换</a></p>
        <p><span><img src="../../assets/img/icon_wchat_login.png"
                      alt="">{{user.is_bind === 1?user.wx_name:'未绑定'}}</span>
          <a href="javascript:void 0" @click="bindWx(user.is_bind)">{{user.is_bind === 1?'解绑':'绑定'}}</a></p>
      </div>
    </div>
    <div class="user-item">
      <a href="/contents/mycard">
        <span><img src="../../assets/img/icon_cart.svg" alt="">预约单</span>
        <i class="iconfont iconarrowright"></i>
      </a>
      <a href="/contents/myyuyue">
        <span><img src="../../assets/img/icon_order.svg" alt="">我的预约</span>
        <i class="iconfont iconarrowright"></i>
      </a>
      <a href="/contents/myorder">
        <span><img src="../../assets/img/icon_bill.svg" alt="">我的账单</span>
        <i class="iconfont iconarrowright"></i>
      </a>
      <a href="/contents/lianxiwomen">
        <span><img src="../../assets/img/icon_call.svg" alt="">联系我们</span>
        <i class="iconfont iconarrowright"></i>
      </a>
    </div>

    <div class="to-login" @click="sginOut">退出登录</div>
    <img src="../../assets/img/float_call_phone.png" alt="" class="toPhone" @click="toPhone">
  </div>
</template>

<script>
  import config from '../../config/index'
  import {Dialog} from 'vant';
  import {Toast} from 'vant';

  export default {
    name: "user",
    data() {
      return {
        imgUrl: config.urlStr + '/',
        user: {
          phone: "",
          nick_name: "",
          pic: "",
          wx_name: "",
          is_bind: 0  //  0未绑定
        }
      }
    },
    created() {
      if (!this.$store.state.user) {
        this.$router.push('/contents/login')
        return
      }
      this.$emit('tabBerSet', 4)
      this.getUserInfo()
    },
    methods: {
      //  绑定/解除绑定
      bindWx(state){
        if(state === 1){
          //  解绑
          Dialog.confirm({
            title: '温馨提示：',
            message: '您确定要解绑微信吗？',
            confirmButtonColor: '#0c9c35'
          }).then(() => {
            this.$api.apiContent.unbindWx({
              sign: this.$store.state.user.sgin,
              timestamp: parseInt(new Date().getTime() / 1000),
              token: this.$store.state.user.token,
              nick_name:this.name
            }).then(() => {
              Toast('修改成功');
              this.getUserInfo()
            }).catch(e => {
              console.log(e)
            })
          }).catch(() => {
            // on cancel
          });
        }else{
          //  去绑定
        }
      },
      //  上传头像
      afterRead(file) {
        Toast('上传中,请稍后');
        let fd = new window.FormData();
        fd.append('file', file.file)
        fd.append('token', this.$store.state.user.token)
        fd.append('uptype', 1)
        fd.append('path', 1)
        this.$api.apiContent.upload(fd).then(res => {
          console.log(res)
        }).catch(e => {
          if (e.path) {
            this.setImg(e.path)
          } else {
            Toast(e.msg);
          }

        })
      },
      // 设置头像
      setImg(path) {
        this.$api.apiContent.setInfo({
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token,
          pic:path
        }).then(() => {
          Toast('修改成功');
          this.getUserInfo()
        }).catch(e => {
            console.log(e)
          })
      },
      //  退出
      sginOut() {
        Dialog.confirm({
          title: '温馨提示：',
          message: '您确定要退出吗？',
          confirmButtonColor: '#0c9c35'
        }).then(() => {
          this.$store.state.user = null
          this.$router.push('/contents/login')
        }).catch(() => {
          // on cancel
        });

      },
      //  拨打电话
      toPhone() {
        Dialog.confirm({
          title: '咨询电话：',
          message: '15383227502',
          confirmButtonText: '立即拨打',
          confirmButtonColor: '#0c9c35'
        }).then(() => {
          window.location.href = 'tel://15383227502'
        }).catch(() => {
          // on cancel
        });
      },
      //  获取个人信息
      getUserInfo() {
        this.$api.apiContent.getUserInfo({
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          console.log(res)
          this.user = {
            phone: res.data.phone,
            nick_name: res.data.nick_name,
            pic: res.data.pic,
            wx_name: res.data.wx_name,
            is_bind: res.data.is_bind,  //  0未绑定
          }
        })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-box {
    height: 100%;
    overflow-y: scroll;
    background: #f6f6f6;

    .user-info {
      display: flex;
      align-items: center;
      padding: 20px;
      background: #fff;

      .user-img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
        position: relative;

        img {
          display: block;
          width: 80px;
          height: 80px;
          margin: 10px;
          border-radius: 100%;
        }

        .up-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;
          opacity: 0;
        }
      }

      .user-text {
        flex: 1;
        overflow: hidden;

        h3 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          line-height: 30px;
          color: #333;
          font-weight: bold;

          a {
            font-weight: normal;
            font-size: 14px;
            color: #0c9c35;
          }
        }

        p {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          line-height: 30px;
          color: #666;

          a {
            font-size: 14px;
            color: #0c9c35;
          }

          img {
            width: 15px;
            margin-right: 3px;
          }
        }
      }
    }

    .user-item {
      margin-top: 10px;
      background: #fff;
      margin-bottom: 30px;

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #e2e2e2;

        span {
          display: flex;
          align-items: center;
          color: #333;
          font-size: 16px;

          img {
            display: block;
            height: 30px;
            margin-right: 10px;
          }
        }

        i {
          color: #666;
        }
      }
    }

    .to-login {
      width: 150px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      margin: 0 auto;
      background: #fff;
      border-radius: 5px;
    }

    .toPhone {
      position: fixed;
      right: 15px;
      bottom: 65px;
      width: 70px;
      height: 70px;
    }
  }
</style>