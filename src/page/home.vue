<template>
  <div class="box">
    <router-view @tabBerSet="tabBerSet"/>
    <van-tabbar v-model="active"
                active-color="#0c9c35"
                inactive-color="#999"
    >
      <van-tabbar-item to="/home/daolan">
        <span style="position: relative;top: -2px;">网站导览</span>
        <i
          class="iconfont icondiannao"
          style="font-size: 24px;"
          slot="icon"
          slot-scope="props"
          :class="props.active ? 'active' : ''"
        ></i>
      </van-tabbar-item>

      <van-tabbar-item to="/home/fenge">
        <span style="position: relative;top: -2px;">风格体验吧</span>
        <i
          class="iconfont iconleibie"
          style="font-size: 24px;position: relative;top: -2px;"
          slot="icon"
          slot-scope="props"
          :class="props.active ? 'active' : ''"
        ></i>
      </van-tabbar-item>
      <van-tabbar-item to="/home/index">
        <span>首页</span>

        <i
          class="iconfont "
          slot="icon"
          slot-scope="props"
          :class="props.active ? 'active' : ''"
        >
          <img src="../assets/img/icon.png" alt="" style="widt:50px;" v-if="props.active">
          <img src="../assets/img/icon2.png" alt="" style="widt:50px;" v-else>

        </i>
      </van-tabbar-item>
      <van-tabbar-item @click="toSupermarket">
<!--        to="/home/supermarket"-->
        <span>装修公司超市</span>
        <i
          class="iconfont icongongsi"
          slot="icon"
          slot-scope="props"
          :class="props.active ? 'active' : ''"
        ></i>
      </van-tabbar-item>
      <van-tabbar-item @click="toUser">
        <span>个人中心</span>
        <i
          class="iconfont iconwode"
          style="font-size: 18px"
          slot="icon"
          slot-scope="props"
          :class="props.active ? 'active' : ''"
        ></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        active: 2
      }
    },
    created() {
    },
    methods:{
      toSupermarket(){
        if (!this.$store.state.user) {
          this.$router.push('/contents/login')
          return
        }
        this.$api.apiContent.isVisit({
          token: this.$store.state.user.token
        }).then(()=>{
          this.$router.push({
            path:'/home/supermarket'
          })
        }).catch(e=>{
          //  去支付
          console.log(e)
        })
      },
      toUser(){
        if (!this.$store.state.user) {
          this.$router.push('/contents/login')
          return
        }
        this.$router.push({
          path:'/home/user'
        })
      },


      toPage(path) {
        this.$router.push(path)
      },
      tabBerSet(num){
        this.active = num
      }
    }
  }
</script>

<style scoped lang="scss">
  .box{
    height: 100vh;
    padding-bottom: 50px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .van-tabbar{
    align-items: flex-end;
    padding-bottom: 10px;
    border-top: 1px solid #e2e2e2;
  }
  .van-tabbar-item__icon img{
    height: 50px;
    padding: 10px;
    border-radius: 50px;
    background-color:#fff;
    box-shadow: 0 0 10px 0 #e2e2e2;
  }
  .van-hairline--top-bottom::after{
    border: 0;
  }
  .van-tabbar-item__icon i{
    font-size: 24px!important;
  }
</style>