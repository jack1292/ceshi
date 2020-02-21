<template>
  <div class="set-box">
    <van-list
      v-if="!nodata"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"

    >
      <div class="list-item" v-for="item in list" :key="item.id">
        <div class="danhao" style="margin-bottom: 10px;"><span>支付单号：</span><b class="ovDna" style="color: #333;">{{item.order_sn}}</b><i>{{item.add_time}}</i></div>
        <div class="item-name">预约公司：{{item.name}}</div>
        <div class="item-desc " :class="item.state?'ovDuo2':''">装修需求：{{item.message}}</div>
        <div style="font-size: 12px;color: #ff9700" v-if="item.message.length>40" @click="item.state = !item.state">{{item.state?'查看更多':'收起更多'}}</div>
        <div class="pingjia-box" v-if="item.is_pinglun === 1">
          <div><span>设计：</span><van-rate v-model="item.sheji"  size="10" color="#FF6B64"/></div>
          <div><span>服务：</span><van-rate v-model="item.server"  size="10" color="#FF6B64"/></div>
          <div><span>施工：</span><van-rate v-model="item.shigong"  size="10" color="#FF6B64"/></div>
        </div>
        <div class="item-btn">
          <span @click="toFangan(item.plan,item.id)">查看方案</span>
          <span @click="toPingjia(item.id,item.sheji,item.server,item.shigong,item.name)" :class="item.is_pinglun === 1?'':'active'">{{item.is_pinglun === 1?'重新评价':'评价'}}</span>
        </div>
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
  import { Toast } from 'vant';
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
      toPingjia(id,sheji,server,shigong,name){
        console.log(id)
        this.$router.push({
          path:'pingjia',
          query:{
            id:id,
            sheji:sheji,
            server:server,
            shigong:shigong,
            name:name
          }
        })
      },
      toFangan(str,id){
        if(str){
          this.$router.push({
            path:'fangan',
            query:{
              id:id
            }
          })
        }else{
          Toast('方案还未上传');
        }
      },
      // 异步更新数据
      onLoad() {
        this.$api.apiContent.myOrder({
          limit:2000,
          page:1,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          res.data.list.map(item=>{
            item.goods.map(items=>{
              items.add_time = item.add_time
              items.fid = item.id
              items.order_sn = item.order_sn
              items.message = item.message
              items.state = item.message.length>40?true:false
              this.list.push(items)
            })
          })
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
      padding: 10px 10px 0;
      background: #fff;
      border-radius: 10px;
      margin-bottom: 15px;
      .danhao{
        display: flex;
        align-content: center;
        justify-content: space-between;
        line-height: 150%;
        padding-bottom: 10px;
        border-bottom: 1px solid #f7f7f7;
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
          font-size: 12px;
          text-align: right;
        }
      }
      .item-name{
        line-height: 150%;
        padding-bottom: 10px;
      }
      .item-desc{
        font-size: 12px;
        color: #999;
        line-height: 150%;
        margin-bottom: 10px;
      }
      .item-btn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #f6f6f6;
        margin-top: 10px;

        span{
          display: block;
          width: 50%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-right: 1px solid #f6f6f6;
          &:first-child{
            color: #ff9700;
          }
          &:last-child{
            border: 0;
            &.active{
              color: #0c9c35;
            }
          }
        }
      }
      .pingjia-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        div{
          display: flex;
          align-items: center;
          span{
            font-size: 12px;
          }
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