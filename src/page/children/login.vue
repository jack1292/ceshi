<template>
  <div class="login-box">
    <img src="../../assets/img/loginbg.png" alt="" class="login-bg">
    <div class="login-all">
      <div class="login-tab">
        <span :class="loginTab === 1?'active':''" @click="loginTab = 1">登录</span>|
        <span :class="loginTab === 2?'active':''" @click="loginTab = 2">注册</span>
      </div>
      <!--      登录-->
      <div class="login" v-if="loginTab === 1">
        <div class="input-box">
          <img src="../../assets/img/icon_account.svg" alt="">
          <input type="number" v-model="login.phone" placeholder="请输入手机号">
        </div>
        <div class="input-box">
          <img src="../../assets/img/icon_pass.svg" alt="">
          <input type="password" v-model="login.pass" placeholder="请输入密码">
          <a href="">忘记密码</a>
        </div>
        <van-button class="login-btn" type="primary" size="large" round color="#0c9c35" @click="loginBtn">登录</van-button>
        <div class="other-login">
          <p>其它方式登录</p>
          <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39c91da324410c55&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect">
            <img src="../../assets/img/icon_wchat_login.png" alt="">
          </a>
        </div>
      </div>
      <!--      注册-->
      <div class="regiset" v-if="loginTab===2">
        <div class="input-box">
          <img src="../../assets/img/icon_account.svg" alt="">
          <input type="number" v-model="register.phone"  placeholder="请输入手机号">
        </div>
        <div class="input-box">
          <img src="../../assets/img/icon_pass.svg" alt="">
          <input type="text" v-model="register.code"  placeholder="请输入验证码">
          <a href="javascript:void 0" :class="show?'':'active'" @click="getCode">{{show?'获取验证码':count + 's'}}</a>
        </div>
        <div class="input-box">
          <img src="../../assets/img/icon_pass.svg" alt="">
          <input type="password" v-model="register.pass"  placeholder="请输入密码">
        </div>
        <div class="input-box">
          <img src="../../assets/img/icon_pass.svg" alt="">
          <input type="password" v-model="register.rpass" placeholder="请再次输入密码">
        </div>

        <van-button class="login-btn" type="primary" size="large" round color="#0c9c35" @click="regiserBtn">注册</van-button>
        <van-checkbox v-model="checked" checked-color="#0c9c35">我已阅读并同意 <a href="/contents/xieyi" style="color: #0c9c35">《韵之装使用协议》</a></van-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "login",
    data() {
      return {
        loginTab: 1,
        checked:true,
        login:{
          phone:'',
          pass:''
        },
        register:{
          phone:'',
          code:'',
          pass:'',
          rpass:''
        },
        requserState:true,
        show: true, // 60秒倒计时
        count: '',
        timer: null,
      }
    },
    created() {

    },
    methods:{
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
      getCode(){
        if(!this.show){
          return;
        }
        if(this.$tools.checkTel(this.register.phone)){
          Toast('手机号有误，请确认');
          return
        }
        this.$api.apiContent.getCode({
          phone: this.register.phone,
          type: 1
        }).then(() => {
          this.getCodeTime()
        }).catch(e => {
          Toast(e.msg);
        })
      },
      //  注册
      regiserBtn(){
        if(this.requserState) {
          this.requserState = false
        }else{
          return
        }
        if(!this.checked){
          Toast('请点击同意用户协议');
          return;
        }
        this.$api.apiContent.regiser({
          phone: this.register.phone,
          pass: this.register.pass,
          repass:this.register.rpass,
          code:this.register.code
        }).then(()=>{
          Toast('注册成功');
          this.requserState = true
          this.login.phone = this.register.phone
          this.login.pass = this.register.pass
          this.register = {
            phone:'',
              code:'',
              pass:'',
              rpass:''
          }
          this.loginTab = 1
        }).catch(e=>{
          this.requserState = true
          Toast(e.msg);
        })
      },
      //  登录
      loginBtn(){
        if(this.requserState){
          this.requserState = false
        }else{
          return
        }
        this.$api.apiContent.login({
          phone: this.login.phone,
          pass: this.login.pass
        }).then(res=>{
          this.requserState = true
          this.$store.state.user = res.data
          if(this.$route.query.path){
            this.$router.push({
              path:this.$ruote.query.path
            })
          }else{
            this.$router.push({
              path:'/home/user'
            })
          }
        }).catch(e=>{
          this.requserState = true
          Toast(e.msg);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    background: #f6f6f6;

    .login-bg {
      width: 100%;
    }

    .login-all {
      position: relative;
      top: -50px;
      margin: 20px;
      padding: 20px;
      background: #fff;
      z-index: 99;
      border-radius: 5px;

      .login-tab {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 20%;
        color: #666;

        span {
          display: block;
          width: 40%;
          height: 30px;
          font-size: 16px;
          text-align: center;
          line-height: 30px;
          color: #666;

          &.active {
            color: #0c9c35;
          }
        }
      }

      .login {
        margin-top: 20px;
      }
      .regiset{
        margin-top: 20px;
      }
      .input-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 41px;
        line-height: 40px;
        margin-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;

        img {
          display: block;
          width: 20px;
        }

        input {
          flex: 1;
          display: block;
          height: 40px;
          padding: 0 10px 0 5px;
          color: #0c9c35;
        }

        a {
          color: #0c9c35;
        }
      }

      .login-btn {
        margin-top: 30px;
        margin-bottom: 30px;
        height: 40px;
        line-height: 38px;
      }

      .other-login {

        p {
          color: #666;
          text-align: center;
          position: relative;

          &:before {
            position: absolute;
            top: 50%;
            left: 10px;
            content: '';
            width: 30%;
            height: 1px;
            background: #e9e9e9;
          }
          &:after {
            position: absolute;
            top: 50%;
            right: 10px;
            content: '';
            width: 30%;
            height: 1px;
            background: #e9e9e9;
          }
        }

        a {
          display: block;
          margin: 20px auto;
          width: 40px;

          img {
            display: block;
            width: 40px;
          }
        }
      }
    }
  }
</style>