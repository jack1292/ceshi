<template>
  <div class="set-box">
    <p>原手机号：<span>{{phone}}</span></p>
    <div class="input-box">
      <span>新手机号</span>
      <input type="number" v-model="news.phone" placeholder="请输入手机号">
    </div>
    <div class="input-box">
      <span>验证码</span>
      <input type="number" v-model="news.code" placeholder="请输入验证码">
      <a href="javascript:void 0" :class="show?'':'active'" @click="getCode">{{show?'获取验证码':count + 's'}}</a>
    </div>
    <van-button class="login-btn" type="primary" size="large" color="#0c9c35" @click="setPhone">立即修改</van-button>
  </div>
</template>

<script>
  import {Toast} from 'vant';

  export default {
    name: "setPhone",
    data() {
      return {
        phone: this.$route.query.phone,
        news: {
          phone: '',
          code: ''
        },
        show: true, // 60秒倒计时
        count: '',
        timer: null,
      }
    },
    created() {
    },
    methods: {
      // 设置手机号
      setPhone() {
        this.$api.apiContent.setPhone({
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token,
          phone: this.news.phone,
          code: this.news.code
        }).then(() => {
          Toast('修改成功');
          window.history.go(-1)
        }).catch(e => {
          Toast(e.msg);
        })
      },
      // 验证码倒计时
      getCodeTime() {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      //  获取验证码
      getCode() {
        if (!this.show) {
          return;
        }
        if (this.$tools.checkTel(this.news.phone)) {
          Toast('手机号有误，请确认');
          return
        }
        this.$api.apiContent.getCode({
          phone: this.news.phone,
          type: 3
        }).then(() => {
          this.getCodeTime()
        }).catch(e => {
          Toast(e.msg);
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .set-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
    overflow-y: scroll;

    p {
      line-height: 50px;
      text-align: center;

      span {
        color: #0c9c35;
      }
    }

    .input-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 51px;
      line-height: 50px;
      padding: 0 10px;
      background: #fff;
      border-bottom: 1px solid #f1f1f1;

      span {
        display: block;
        width: 80px;
      }

      input {
        flex: 1;
        display: block;
        height: 50px;
        padding: 0 10px 0 5px;
        color: #0c9c35;
      }

      a {
        color: #0c9c35;
      }
    }

    .login-btn {
      display: block;
      width: 80%;
      margin: 30px auto;
      height: 40px;
      line-height: 38px;
    }
  }
</style>