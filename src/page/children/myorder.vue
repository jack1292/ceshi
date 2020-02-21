<template>
  <div class="set-box">
    <van-list
      v-if="!nodata"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="list-item" v-for="item in list" :key="item">
        <div style="margin-bottom: 10px;"><span>支付单号：</span><b class="ovDna" style="color: #333;">{{item.pay_sn}}</b><i>{{item.add_time}}</i></div>
        <div><span>支付方式：</span><b>{{item.pay_type === 1 ? '微信' : '支付宝'}}</b></div>
        <div><span>支付金额：</span><b><s>{{item.price}}</s>元</b></div>
        <div><span>支付用途：</span><b>{{item.remark}}</b></div>
        <div><span>预约单号：</span><b>{{item.order_sn}}</b></div>
      </div>
    </van-list>
    <div class="nodata" v-else>
      <div>
        <img src="../../assets/img/empty.svg" alt="">
        <p> 暂无数据</p>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        list: [],
        loading: false,
        finished: false,
        nodata:false
      }
    },
    created() {
    },
    methods:{
      // 异步更新数据
      onLoad() {
        this.$api.apiContent.money_log({
          limit:2000,
          page:1,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          res.data.list.map(item=>{
            item.add_time = this.$tools.ZHDate(new Date(item.add_time*1000),7)
          })
          this.list = res.data.list
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
        }).catch(() => {
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
          this.nodata = true
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .set-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
    overflow-y: scroll;
    padding: 15px;
    .list-item{
      padding: 10px;
      background: #fff;
      border-radius: 10px;
      margin-bottom: 15px;
      div{
        display: flex;
        align-content: center;
        justify-content: space-between;
        line-height: 150%;
        span{
          display: block;
          width: 78px;
        }
        b{
          flex: 1;
          display: block;
          color: #999;
          s{
            color: #ff9700;
          }
        }
        i{
          display: block;
          width: 120px;
          color: #999;
          text-align: right;
        }
      }
    }
    .nodata{
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 100%;
      div {
        img{
          display: block;
          margin: 0 auto 20px;
        }
        p{
          color: #666;
          font-size: 16px;
          text-align: center;
        }
      }
    }
  }
</style>